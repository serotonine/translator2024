import { EventEmitter, Injectable, signal } from '@angular/core';
import { Term } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }
  // Use to reset the ListInputComponent on ListComponent repeat event.
  isRepeat  = new EventEmitter();
  // The current Term list (name, verb, sentence) 
  currentList!:Term[];
}
