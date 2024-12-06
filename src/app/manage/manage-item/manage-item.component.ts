import { Component, Input } from '@angular/core';
import { type Term } from '../../models/list.model';

@Component({
  selector: 'app-manage-item',
  standalone: true,
  imports: [],
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.css'
})
export class ManageItemComponent {
  @Input({required: true}) @Input({required:true}) term!: Term;
}
