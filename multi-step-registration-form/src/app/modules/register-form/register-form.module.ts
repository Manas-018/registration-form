import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { EducationDetailComponent } from './education-detail/education-detail.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: RegisterFormComponent
  }
];

@NgModule({
  declarations: [RegisterFormComponent, PersonalInfoComponent, WorkExperienceComponent, EducationDetailComponent, SkillsComponent],
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
