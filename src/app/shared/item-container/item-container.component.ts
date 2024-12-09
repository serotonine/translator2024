import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-item-container',
  standalone: true,
  imports: [],
  templateUrl: './item-container.component.html',
  styleUrl: './item-container.component.css',
  host: {
    class: 'd-flex align-items-center gap-2 mb-2 p-2',
  },
})
export class ItemContainerComponent {
  @Input({ required: true }) stripe!: number;
  @HostBinding('class') get bg() {
    return this.stripe % 2 === 0 ? 'bg-light-400' : 'bg-light-300';
  }
}
