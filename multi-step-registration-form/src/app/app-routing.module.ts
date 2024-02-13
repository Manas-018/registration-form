import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routePaths } from './constants/common';


const routes: Routes = [
  {
    path: routePaths.LOGIN,
    loadChildren: () => import('./modules/login-form/login-form.module').then(m => m.LoginFormModule)
  },
  {
    path: routePaths.REGISTRATION,
    loadChildren: () => import('./modules/register-form/register-form.module').then(m => m.RegisterFormModule)
  },
  { path: '', redirectTo: routePaths.REGISTRATION, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled', useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
