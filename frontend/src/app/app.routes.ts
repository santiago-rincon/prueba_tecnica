import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',

    redirectTo: 'users',

    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => import('@pages/home/home.page').then(c => c.HomePage),
  },
  {
    path: 'create',
    loadComponent: () => import('@pages/user/user.page').then(c => c.UserPage),
  },
  {
    path: 'users/:id',
    loadComponent: () => import('@pages/user/user.page').then(c => c.UserPage),
  },
];
