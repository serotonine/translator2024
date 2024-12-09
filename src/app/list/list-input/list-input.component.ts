import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list-input.component.html',
  styleUrl: './list-input.component.css',
  host: {
    class: 't_flex-items p-2 flex-grow-1',
  },
})
export class ListInputComponent implements OnInit {
  listService = inject(ListService);
  @Input({ required: true }) props!: {
    word: string;
    id: string;
    placeholder: string;
  };
  wordLg!: number;
  status = 'bg-danger';
  private subscription!: Subscription;
  private _destroyRef = inject(DestroyRef);
  control = new FormControl();

  isEqual(value: string, wordLg: number) {
    if (value.length && value.length < wordLg) {
      this.status = this.props.word.startsWith(value)
        ? 'bg-warning'
        : 'bg-danger';
      return;
    }
    if (value === this.props.word) {
      this.status = 'bg-success';
      this.subscription.unsubscribe();
      this.control.disable({ onlySelf: true, emitEvent: true });
      return;
    }
    this.status = 'bg-danger';
    return;
  }

  ngOnInit() {
    this.listService.isRepeat.subscribe({
      next: (value:boolean) => {
        if(this.control.disabled){
          this.control.enable();
          this.status = 'bg-danger';
          this.control.reset();
          this.subscription = this.control.valueChanges.subscribe({
            next: (value) => {
              this.isEqual(value, this.wordLg);
            },
          });
        }

        },
    });
    this.control.registerOnDisabledChange((event) => {
      // TODO => add to statistic if the solution has not been clicked.
    });
    this.wordLg = this.props.word.length;
    this.subscription = this.control.valueChanges.subscribe({
      next: (value) => {
        this.isEqual(value, this.wordLg);
      },
    });
    this._destroyRef.onDestroy(() => {
      this.subscription.unsubscribe();
    });
  }
  
}
