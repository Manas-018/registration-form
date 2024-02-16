import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: LoginFormComponent
  }
];

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginFormModule { }
