import { Component } from '@angular/core';
// Form.
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// Component.
import { PwdComponent } from '../pwd/pwd.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, PwdComponent],
  templateUrl: './register.component.html',
  styleUrl: '../loggin.component.css'
})
export class RegisterComponent {
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
    // Event Handlers
    registration(values:any) : void {
      console.dir(values);
    }
  
}

  
