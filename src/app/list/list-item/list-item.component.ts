import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Term } from '../../models/list.model';
import { ListInputComponent } from '../list-input/list-input.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [FormsModule, ListInputComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  host:{
    class:'t_flex-items',
  }
})
export class ListItemComponent {
  isSolutionVisible = false;
  @Input({required:true}) term!: Term;
  @Input({required:true}) lg!: string | null | undefined;
 
  onChange(event:Event){
    // console.log(event);
  }
  
   showSolution(){
    this.isSolutionVisible = true;
    }
    hideSolution(){
      this.isSolutionVisible = false;

    }

}
