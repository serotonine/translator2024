import { Component, inject } from '@angular/core';
import { ManageChooseComponent } from './manage-choose/manage-choose.component';
import { Term } from '../models/list.model';
// Services
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [ManageChooseComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})

export class ManageComponent {
  listService = inject(ListService);
  currentTerms!:Term[];
  getManageTerms(terms:Term[]) {
    
    this.currentTerms = terms;
    console.log(this.currentTerms)
  }
}
