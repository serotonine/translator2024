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
    title: 'Translator/Loggin',
    component:ManageComponent,
  },
  {
    path: 'loggin',
    title: 'Translator/Loggin',
    component:LogginComponent,
  },
];
