import { Component, inject, Input, OnInit,  } from '@angular/core';
import {
  FormsModule,
  NgForm,
  NgModel,
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

@Component({
  selector: 'app-manage-item',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './manage-item.component.html',
  host: {
    class: 't_flex-items',
  },
})
export class ManageItemComponent implements OnInit {
  // Services.
  private _httpRequest = inject(HttpRequestService);
  public listService = inject(ListService);
  // Variables.
  @Input({ required: true }) term!: Term;
  isEdit: boolean = false;
  form = {};
 
 /*  form = new FormGroup({
    fr: new FormControl('', {
      validators: [Validators.pattern(/[a-z]+/i)],
    }),
    nl: new FormControl('', {
      validators: [Validators.pattern(/[a-z]+/i)],
    }),
    perfectum: new FormControl('', {
      validators: [Validators.pattern(/[a-z]+/i)],
    }),
    imperfectum: new FormControl('', {
      validators: [Validators.pattern(/[a-z]+/i)],
    }),
  }); */

  ngOnInit(): void {
    //this.initForm();
  }
  // Init Form.
  initForm() {
    /* this.form.controls.fr.setValue(this.term.fr);
    this.form.controls.nl.setValue(this.term.nl);
    if (this.term.perfectum)
      this.form.controls.perfectum.setValue(this.term.perfectum);
    if (this.term.imperfectum)
      this.form.controls.imperfectum.setValue(this.term.imperfectum); */
  }
  // Handle events.
  onEdit() {
    const type = this.listService.currentType();
    this.isEdit=!this.isEdit;
    if(this.isEdit){
      }
    else{
    
    const {fr, nl, perfectum, imperfectum} = this.term;
    
    /*  Object.values(this.form.controls).map((value) => {
        if (value.dirty && value.touched && value.invalid) {
          alert(`${value.value}: `);
          value.setValue('Only letters are allowed!');
          return;
    */
    this._httpRequest.updateList(type, this.term.id, {fr, nl, perfectum, imperfectum}).subscribe({
        next: (response) => {
          if (response) {
            const prevList = this.listService.termsList().get(type);
            if (prevList) {
              const newList = prevList.map((item) => {
                if (item.id === this.term.id) {
                  return {
                    ...item,
                    ...{fr, nl, perfectum, imperfectum},
                  };
                }
                return item;
              });
              // Update signals.
              this.listService.termsList.update((list) =>
                list.set(type, newList as Term[])
              );
              this.listService.currentTerms.set(newList as Term[]);
            }
          }
        },
        complete: () => this.isEdit = false,
      }); }
      
    
  }
  onDelete() {
    const type = this.listService.currentType();
    const id = this.term.id;
    // Rest request.
    this._httpRequest.delete(type, id).subscribe({
      next: (response) => {
        if (response) {
          const prevList = this.listService.termsList().get(type);
          if (prevList) {
            const newList = prevList.filter((item) => {
              return item.id != id;
            });
            // Update signals.
            this.listService.termsList.update((list) =>
              list.set(type, newList)
            );
            this.listService.currentTerms.set(newList);
          }
        }
      },
      error: (error: Error) => console.log(error),
      complete: () => {},
    });
  }
}
