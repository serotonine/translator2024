import { Component, effect, inject, OnInit } from '@angular/core';
// Models.
import { Term } from '../models/list.model';
// Services.
import { ListService } from '../services/list.service';
// Components.

import { ManageChooseComponent } from './manage-choose/manage-choose.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { ItemContainerComponent } from '../shared/item-container/item-container.component';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [ManageChooseComponent, ManageItemComponent, ItemContainerComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})

export class ManageComponent{
 listService = inject(ListService);
 // Handlers.
  getManageTerms(terms:Term[]) {
    this.listService.currentTerms.set(terms);
  }
}
