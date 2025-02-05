import {
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
// Form.
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// Services.
import { ListService } from '../../services/list.service';
import { HttpRequestService } from '../../services/http-request.service';
// Models
import { Term } from '../../models/list.model';

@Component({
  selector: 'dialog[app-manage-modal]',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-modal.component.html',
  styleUrl: './manage-modal.component.css',
  host: {
    role: 'dialog',
  },
})
export class ManageModalComponent {
 
  // Services.
  listService = inject(ListService);
  httpRequestService = inject(HttpRequestService);

  // Used in template @if(verb, zin) display this or that.
  whatType = signal('name');
  get type(){
    return this.listService.currentType();
  }
  
  constructor(private hostElement: ElementRef){
    
    effect(() => {
      /* 
       Subscribe to boolean signal isOpenModal().
      */
      if(this.listService.isOpenModal()){
        hostElement.nativeElement.showModal();
      }
      else{
        hostElement.nativeElement.close();
      }
    });
  }

  // Forms.
  formType = new FormGroup({
    type: new FormControl('name'),
  });
  formAdd = new FormGroup({
    fr: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/[a-z]+/i),
        Validators.maxLength(100),
      ],
    }),
    nl: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/[a-z]+/i),
        Validators.maxLength(100),
      ],
    }),
    perfectum: new FormControl('', {
      validators: [Validators.pattern(/[a-z]+/i), Validators.maxLength(50)],
    }),
    imperfectum: new FormControl('', {
      validators: [Validators.pattern(/[a-z]+/i), Validators.maxLength(50)],
    }),
  });
  
  // Handler Events.
  onclose() {
    this.listService.isOpenModal.set(false);
    this.formAdd.reset();
  }
  // Add term.
  onSubmit() {
    // TODO BETTER VALIDATION + CHECK IF DUPPLICATE.
    Object.values(this.formAdd.controls).map((value) => {
      if (value.dirty && value.touched && value.invalid) {
        alert(`${value.value}: `);
        value.setValue('Only letters are allowed!');
        return;
      }
    });
    let newList!:Term[];
    const addSubscription = this.httpRequestService.addTerm(this.type, this.formAdd.value).subscribe({
      next: (response:any) => {
        // TODO BETTER CATCH ERROR AND QUERY RESPONSE.
        // (SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry '1-test-test' for key 'nam_user').
          if (Array.isArray(response)){
            const newTerm:Term = response.at(0);
            if(newTerm){
              const prevList = this.listService.termsList().get(this.type);
              if(prevList){
                // Up
                prevList.push(newTerm);
                this.listService.termsList().set(this.type,prevList);
                
              }
             console.log(this.listService.currentTerms());
            }
          }
          else{
            console.log('response', response);
          }
        
        this.onclose();
      },
      error: (error) => {
        console.log('ERROR');
        console.log(error)
      },
    });
  }
}
