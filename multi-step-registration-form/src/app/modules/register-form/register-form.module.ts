import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: RegisterFormComponent
  }
];

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [RegisterFormComponent]
})
export class RegisterFormModule { }
