import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Validate } from 'src/app/Utils/Validators.utils';
import { errorMessages } from 'src/app/constants/common';
import { pairwise, startWith, takeUntil, throttleTime } from "rxjs/operators";


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {

  firstFormGroup: FormGroup;
  validate = new Validate();
  languages: string[] = ['English', 'Hindi', 'Telgu', 'Tamil', 'Bengali'];
  selectedLanguages: string[] = [];
  @Output() valueChangedFirstForm = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  unbinder: EventEmitter<any> = new EventEmitter<any>();
  nextDisabled: boolean = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.firstFormGroup = this.fb.group({
      nameFormControl: ['', Validators.required],
      emailFormControl: ['', [Validators.required, Validators.email]],
      phoneFormControl: ['', [Validators.pattern('[0-9]\\d{9}')]],
      languageFormControl: [[]]
    });
    this.firstFormGroup.valueChanges.pipe(
      takeUntil(this.unbinder),
      startWith(this.firstFormGroup.value),
      pairwise()).subscribe(([oldFormValue, newFormValue]) => {
        this.nextDisabled = !this.firstFormGroup.valid;
        this.valueChangedFirstForm.emit(this.firstFormGroup);
      });
  }

  getErrorMessage(controlName) {
    let errorMessage = '';
    switch (controlName) {
      case 'nameFormControl':
        errorMessage = this.firstFormGroup.controls['emailFormControl'].hasError('required') ? errorMessages.requiredName : '';
        break;
      case 'emailFormControl':
        errorMessage = this.firstFormGroup.controls['emailFormControl'].hasError('required') ? errorMessages.requiredEmail :
          this.firstFormGroup.controls['emailFormControl'].hasError('email') ? errorMessages.invalidEmail : '';
        break;
      case 'phoneFormControl':
        errorMessage = this.firstFormGroup.controls['phoneFormControl'].hasError('required') ? errorMessages.requiredPhoneNo :
          this.firstFormGroup.controls['phoneFormControl'].hasError('pattern') ? errorMessages.invalidPhoneNo : '';
        break;
    }
    return errorMessage;
  }

  onLanguageChange(event) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.selectedLanguages.push(event.source.value);
      } else if (!event.source.selected && this.selectedLanguages.indexOf(event.source.value) !== -1) {
        this.selectedLanguages.splice(this.selectedLanguages.indexOf(event.source.value), 1);
      }
    }
  }

  onFormSubmit() {
    this.firstFormGroup.get('languageFormControl').patchValue(this.selectedLanguages);
    this.onSubmit.emit(this.firstFormGroup.value);
  }

  ngOnDestroy() {
    this.unbinder.next('DESTROYED');
  }
}
