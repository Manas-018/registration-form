import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
  // secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  formData:any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  valueChangedFirstForm(formInstance) {
    this.isValidfirstForm = formInstance.valid;
  }

  valueChangedSecondForm(formInstance) {
    this.isValidSecondForm = formInstance.valid;
  }

  onNextClick(event) {
    this.formData = {...this.formData,...event};
    console.log(this.formData);
  }

}
