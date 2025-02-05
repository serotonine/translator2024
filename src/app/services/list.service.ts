import { EventEmitter, Injectable, signal } from '@angular/core';
import { Term } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  /*
   Stock verb name and zin lists to avoid another REST request.
   */  
  termsList = signal(new Map<string, Term[]>());
 /*
  The current Terms list displayed (Home - manage).
  */  
  currentTerms = signal<Term[] | null>(null);
  /* 
    Current type (name, verb, zin).
    Used for Manage page update/delete/add requests.
    */
  currentType = signal<string>("name");
  
  // The current Term list displayed in Home.
  // TODO: replace with currentTerms.
  currentList!: Term[];
  
   /* 
    Use for Modal (manage)
    true => open Dialog,
    false => close dialog.
    */
  isOpenModal = signal<boolean>(false);
  
  // TODO: delete.
  updateTermList(type: string, data: Term[]) {
    if (!this.termsList().has(type)) {
      this.termsList().set(type, data);
    }
  }
  /*
   Use to reset the ListInputComponent 
   on ListComponent repeat Event.
   */
  isRepeat = new EventEmitter();

  constructor() {}
}
