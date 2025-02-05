import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PwdComponent } from '../login/pwd/pwd.component';

@Component({
  selector: 'app-loggin',
  standalone: true,
  imports: [FormsModule, PwdComponent],
  templateUrl: './loggin.component.html',
  styleUrl: './loggin.component.css'
})
export class LogginComponent {
  currentForm: string = "loggin";
  // Handler events.
  loggin(values:any) : void{
    console.dir(values);

  }
  registration(values:any) : void {
    console.dir(values);
  }
  onChildValueChange(value:string){
    console.log(value);
  }

  toggleForms(evt:MouseEvent): void {
    evt.preventDefault();
    const link =  evt.target as HTMLElement;
    this.currentForm = link.dataset['target'] || "null";
  }

}
