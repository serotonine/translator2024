import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
// Services.
import { GlobalsService } from '../services/globals.service';
// Directives.
import { ActiveDirective } from '../directives/active.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[ActiveDirective],
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  globals = inject(GlobalsService);
  pathName: String = 'home';

  ngOnInit(): void {
    const location = window.location.pathname.substring(1);
    if(!location){return}
    this.pathName = location;
  }
}
