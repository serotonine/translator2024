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
import {type Term, type Choose } from '../../models/list.model';
// Services.
import { HttpRequestService } from '../../services/http-request.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-manage-choose',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-choose.component.html',
  styleUrl: './manage-choose.component.css'
})
export class ManageChooseComponent {
  // Form.
  formManage = new FormGroup({
    type: new FormControl('name'),
    language: new FormControl('nl-to-fr'),
  });
  // Services
  private _httpRequest = inject(HttpRequestService);
  private _destroyRef = inject(DestroyRef);
  public listService = inject(ListService);
  // lg: string | null | undefined;
  @Output() list = new EventEmitter<Term[]>();

  getList(value: Partial<Choose>) {
    if(value.type && this.listService.termsList().has(value.type)){
      this.list.emit(this.listService.termsList().get(value.type));
      return;
    }
    return this._httpRequest
      .getList(value.type, value.date ? value.date : '')
      .subscribe({
        next: (response) => {
        this.listService.currentType = value.type || 'name';
         this.listService.termsList().set(this.listService.currentType, response );
          this.list.emit(this.listService.termsList().get(this.listService.currentType));
        },
      });
  }

  ngOnInit() {
    const firstRequest = this.getList(this.formManage.value);
    const subscription = this.formManage.valueChanges.subscribe({
      next: (value) => {
        this.getList(value);
      },
    });
    this._destroyRef.onDestroy(() => {
      //firstRequest.unsubscribe();
      subscription.unsubscribe();
    });
  }

}
