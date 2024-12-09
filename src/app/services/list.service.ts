import { EventEmitter, Injectable, signal } from '@angular/core';
import { Term } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  // Stock verb, name and zin list to avoid REST request.
  termsList = signal(new Map<string, Term[]>());
  // ?
  currentTerms = signal<Term[] | null>(null);
  // The current Term list displayed in Home.
  currentList!: Term[];
  /* 
    Current type (name, verb, zin).
    Used for Manage page update/delete/add requests.
    */
  currentType = "name";
  updateTermList(type: string, data: Term[]) {
    if (!this.termsList().has(type)) {
      this.termsList().set(type, data);
    }
  }
  // Use to reset the ListInputComponent on ListComponent repeat event.
  isRepeat = new EventEmitter();

  constructor() {}
}
