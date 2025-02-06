import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ControlContainer,
  FormsModule,
  NgForm,
} from '@angular/forms';

@Component({
  selector: 'app-pwd',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './pwd.component.html',
  styleUrl: './pwd.component.css',
})

export class PwdComponent implements OnInit {
  // @Input({ required: true }) parent!: FormGroup;
  // @Input({ required: true }) id!: String;
  // @Input({ required: true }) label!: String;
 @Input({ required: true }) props!: { parent: FormGroup, id: String, label: String, validation: Boolean } 
  // @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
  isShowing: boolean = false;
  eyeIcon: string = this.isShowing ? 'bi-eye' : 'bi-eye-slash';
  controlContainer: ControlContainer;

  constructor(controlContainer: ControlContainer) {
    this.controlContainer = controlContainer;
  }

  // Build FormControl.
  pwdCtrl = new FormControl('', {
    validators: [
    ],
  });

  ngOnInit() {
    if(this.props.validation){
      this.pwdCtrl.addValidators([Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=[a-zA-Z-0-9]+$).{8,150}$/g),Validators.minLength(8) ]);
      this.pwdCtrl.updateValueAndValidity();
    }
    // You can access the parent form via ControlContainer,
    // which holds the context for the form controls
    const form = this.controlContainer.control as FormGroup;
    if (form) {
      form.addControl(this.props.id as string, this.pwdCtrl);
    }
  }

  // Event Handler.
  showPwd(evt: Event) {
    const eye = evt.target as HTMLElement;
    if (eye && eye.tagName !== 'I') {
      return;
    }
    this.isShowing = !this.isShowing;
    this.eyeIcon = this.isShowing ? 'bi-eye' : 'bi-eye-slash';
  }
}
