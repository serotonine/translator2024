import { Component, inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// Models.
import { type Term } from '../../models/list.model';
// Services.
import { HttpRequestService } from '../../services/http-request.service';
import { ListService } from '../../services/list.service';

// Custom validator.
function isTextOnly(control: AbstractControl) {
  const isText = /[a-z]+/.test(control.value);
  return isText ? null : { valid: true };
}

@Component({
  selector: 'app-manage-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.css',
  host: {
    class: 't_flex-items',
  },
})
export class ManageItemComponent implements OnInit {
  // Services.
  private _httpRequest = inject(HttpRequestService);
  private _listService = inject(ListService);
  // Variables.
  @Input({ required: true }) term!: Term;
  isEdit: boolean = false;

  form = new FormGroup({
    fr: new FormControl('', {
      validators: [Validators.pattern(/[a-z]+/i)],
    }),
    nl: new FormControl('', {
      validators: [isTextOnly],
    }),
    perfectum: new FormControl('', {
      validators: [isTextOnly],
    }),
    imperfectum: new FormControl('', {
      validators: [isTextOnly],
    }),
  });

  ngOnInit(): void {
    this.initForm();
  }
  // Init Form.
  initForm() {
    this.form.disable();
    this.form.controls.fr.setValue(this.term.fr);
    this.form.controls.nl.setValue(this.term.nl);
    if (this.term.perfectum)
      this.form.controls.perfectum.setValue(this.term.perfectum);
    if (this.term.imperfectum)
      this.form.controls.imperfectum.setValue(this.term.imperfectum);
  }
  // Handle events.

  onEdit() {
    const type = this._listService.currentType;
    const id = this.term.id;
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.form.enable();
    } else {
      Object.values(this.form.controls).map((value) => {
        if (value.dirty && value.touched && value.invalid) {
          alert(`${value.value}: `);
          value.setValue('Only letters are allowed!');
          return;
        }
      });
      const type = this._listService.currentType;
      const id = this.term.id;
      this._httpRequest.updateList(type, id, this.form.value).subscribe({
        next: (response) => {
          if (response) {
            const prevList = this._listService.termsList().get(type);
            if (prevList) {
              const newList = prevList.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    ...this.form.value,
                  };
                }
                return item;
              });
              // Update signals.
              this._listService.termsList.update((list) =>
                list.set(type, newList as Term[])
              );
              this._listService.currentTerms.set(newList as Term[]);
            }
          }
        },
      });
      this.form.disable();
    }
  }
  onDelete() {
    const type = this._listService.currentType;
    const id = this.term.id;
    // TODO update list in ListService.
    this._httpRequest.delete(type, id).subscribe({
      next: (response) => {
        if (response) {
          const prevList = this._listService.termsList().get(type);
          if (prevList) {
            const newList = prevList.filter((item) => {
              return item.id != id;
            });
            // Update signals.
            this._listService.termsList.update((list) =>
              list.set(type, newList)
            );
            this._listService.currentTerms.set(newList);
          }
        }
      },
      error: (error: Error) => console.log(error),
      complete: () => {},
    });
  }
}
