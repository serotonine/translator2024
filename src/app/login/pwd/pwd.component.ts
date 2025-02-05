import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {  ControlContainer,FormControl,FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-pwd',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pwd.component.html',
  styleUrl: './pwd.component.css'
})
export class PwdComponent implements OnInit {
  @Input({required:true}) id!: String;
  @Input({required:true}) label!: String;
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
  isShowing: boolean = false;
  eyeIcon: string = this.isShowing ? 'eye-slash' : 'bi-eye';
  controlContainer:ControlContainer;
  constructor(controlContainer:ControlContainer){
this.controlContainer = controlContainer;
  }
  ngOnInit() {
    // You can access the parent form via ControlContainer, which holds the context for the form controls
    const form = this.controlContainer as NgForm;
    if(form){
      form.addControl(new NgModel(this.id));
      console.dir(form);
    }
  }
  // Passwords
  logginPwd: string = '';
  // Event Handler.
  showPwd(evt:Event){
    const eye =  evt.target as HTMLElement;
    if(eye && eye.tagName !== 'I'){
      return;
    }
    this.isShowing = !this.isShowing;
    this.eyeIcon = this.isShowing ? 'bi-eye-slash' : 'bi-eye';
  }
  // Output input value.
  onChange(newValue: string) {
    this.ngModelChange.emit(newValue);
  }
}
