import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { routePaths } from 'src/app/constants/common';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  isLinear: boolean = true;
  isValidfirstForm: boolean = true;
  isValidSecondForm: boolean = true;
  isValidThirdForm: boolean = true
  isValidFourthForm: boolean = true
  // secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  formData: any;

  constructor(private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  onNextClick(event) {
    this.formData = { ...this.formData, ...event };
  }

  valueChangedFirstForm(formInstance) {
    this.isValidfirstForm = formInstance.valid;
  }

  valueChangedSecondForm(formInstance) {
    this.isValidFourthForm = formInstance.valid;
  }

  valueChangedThirdForm(formInstance) {
    this.isValidThirdForm = formInstance.valid;
  }

  valueChangedFourthForm(formInstance) {
    this.isValidFourthForm = formInstance.valid;
  }

  onFormSubmit(event) {
    this.formData = { ...this.formData, ...event };
    console.log('form data', this.formData);
    this.router.navigate([`${routePaths.LOGIN}`]);
    this._snackBar.open('Registration Successfull', '', {
      duration: 2000,
    });
  }

}
