import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// Models.
import { type Choose, type Term } from '../../models/list.model';
// Services.
import { HttpRequestService } from '../../services/http-request.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list-choose',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list-choose.component.html',
  styleUrl: './list-choose.component.css',
})
export class ListChooseComponent implements OnInit {
  // Form.
  formChoose = new FormGroup({
    type: new FormControl('name'),
    language: new FormControl('fr-to-nl'),
    date: new FormControl(''),
    number: new FormControl('10'),
  });
  // Services
  private _httpRequest = inject(HttpRequestService);
  private _destroyRef = inject(DestroyRef);
  public listService = inject(ListService);
  //
  @Output() list = new EventEmitter<{
    terms: Term[];
    nb: string | null | undefined;
    lg: string | null | undefined;
  }>();

  getList(value: Partial<Choose>) {
    return this._httpRequest
      .getList(value.type, value.date ? value.date : '')
      .subscribe({
        next: (response) => {
          this.listService.currentList = response;
          this.list.emit({
            terms: response,
            nb: value.number,
            lg: value.language,
          });
        },
      });
  }

  ngOnInit() {
    const firstRequest = this.getList(this.formChoose.value);
    const subscription = this.formChoose.valueChanges.subscribe({
      next: (value) => {
        this.getList(value);
      },
    });
    this._destroyRef.onDestroy(() => {
      firstRequest.unsubscribe();
      subscription.unsubscribe();
    });
  }
}
