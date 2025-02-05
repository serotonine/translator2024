import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { LogginComponent } from './loggin/loggin.component';

export const routes: Routes = [
  {
    path: '',
    component:ListComponent,
  },
  {
    path: 'manage',
    component:ManageComponent,
  },
  {
    path: 'loggin',
    component:LogginComponent,
  }
];
