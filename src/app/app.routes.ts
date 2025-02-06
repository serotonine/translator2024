import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { LogginComponent } from './loggin/loggin.component';
import { RegisterComponent } from './loggin/register/register.component';

export const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
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
  {
    path: 'registration',
    title: 'Translator/Register',
    component:RegisterComponent,
  },
];
