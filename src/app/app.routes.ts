import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

export const routes: Routes = [
  {
    path: '',
    component:ListComponent,
  },
  {
    path: 'manage',
    component:ManageComponent,
  }
];
