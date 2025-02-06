import { Component, inject, OnInit, signal } from '@angular/core';
// Interface.
import { type Term } from '../models/list.model';
// Services.
//import { HttpRequestService } from '../services/http-request.service';
import { ListService } from '../services/list.service';
// Components.
import { ListChooseComponent } from './list-choose/list-choose.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ItemContainerComponent } from '../shared/item-container/item-container.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListChooseComponent, ListItemComponent, ItemContainerComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  //private _httpRequestService = inject(HttpRequestService);
  listService = inject(ListService);
  currentTerms = signal<Term[] | null>(null);
  lg = signal<string | null | undefined>('fr-to-nl');
  numberTerms = 10;
  ngOnInit() {}

  getChosenTerms(receive: {
    terms: Term[];
    nb: string | null | undefined;
    lg: string | null | undefined;
  }) {
    this.numberTerms = receive.nb ? +receive.nb : 10;
    this.listService.currentTerms.set(this.getList(receive.terms, this.numberTerms));
    this.lg.set(receive.lg);
  }
  // To do directive or service.
  getList(tab: Term[], nb: number): Term[] {
    const lg = tab.length;
    let output = new Array();
    let newItem!: Term;
    while (nb > 0) {
      const rand = Math.round(Math.random() * lg);
      newItem = tab[rand];
      const dupplicate = output.find((item) => item.id === newItem.id);
      if (dupplicate) {
        continue;
      }
      output.push(newItem);
      nb--;
    }
    return output;
  }
  // Event Handlers.
  onRepeat() {
    // TODO: Utils Services.
    if (Array.isArray(this.currentTerms())) {
      const temp = this.currentTerms() ?? [];
      const shuffleTerms = temp
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      this.listService.isRepeat.emit(true);
      this.currentTerms.set(shuffleTerms);
    }
  }
  onAnotherList() {
      this.currentTerms.set(this.getList(this.listService.currentList, this.numberTerms));
  }
}
