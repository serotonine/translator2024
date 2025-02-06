import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appActive]',
  standalone: true
})
export class ActiveDirective {

  constructor(private _host: ElementRef) { 
    let isActive: Boolean = false;
    const el = this._host.nativeElement;
    const wPath = window.location.pathname;
    const cPath = el.pathname;
    // Check if location match href value.
    if ((!wPath.substring(1) && cPath == '/home') || (wPath == cPath) ){
      isActive = true;
    }
    // Toggle active class.
    isActive? el.classList.add('active') : el.classList.remove('active');
  }
}
