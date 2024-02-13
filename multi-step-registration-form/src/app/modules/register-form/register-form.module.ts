import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: RegisterFormComponent
  }
];

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterFormModule { }
