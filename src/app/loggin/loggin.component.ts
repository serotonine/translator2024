import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PwdComponent } from './pwd/pwd.component';
// Form.
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-loggin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PwdComponent],
  templateUrl: './loggin.component.html',
  styleUrl: './loggin.component.css'
})
export class LogginComponent {
  currentForm: string = "loggin";
  // Loggin Form.
  logginForm = new FormGroup({
  log_email: new FormControl('',{
    validators: [
      Validators.email,
    ],
  }),
  });
  // Register Form.
  registerForm = new FormGroup({
    name: new FormControl('',{
      validators: [
        Validators.pattern(/[a-zA-Z0-9]+/ig),
      ],
    }),
    email: new FormControl('',{
      validators: [
        Validators.email,
      ],
    }),
    });

  // Handler events.
  loggin(form: FormGroup) : void{
    // Check validation.
    const controls = Object.values(form.controls);
    const errors = controls.map((value) => {
      if (value && value.errors && typeof value.errors === 'object'){
          return value.errors;
      }
      return false;
    }).filter((error) => error);
    console.log(errors);
  }
  registration(values:any) : void {
    console.dir(values);
  }

  toggleForms(evt:MouseEvent): void {
    evt.preventDefault();
    const link =  evt.target as HTMLElement;
    this.currentForm = link.dataset['target'] || "null";
  }
}
