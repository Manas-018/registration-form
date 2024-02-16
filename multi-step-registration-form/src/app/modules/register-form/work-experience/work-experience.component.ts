import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Validate } from 'src/app/Utils/Validators.utils';
import { errorMessages } from 'src/app/constants/common';
import { pairwise, startWith, takeUntil, throttleTime } from "rxjs/operators";

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit, OnDestroy {

  SecondFormGroup: FormGroup;
  arr: FormArray;
  validate = new Validate();
  companies: string[] = ['Gainsight', 'IVY Comptech', 'Inmar', 'Cognizant', 'TCS', 'Others'];
  @Output() valueChangedSecondForm = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  unbinder: EventEmitter<any> = new EventEmitter<any>();
  nextDisabled: boolean = true;
  isExperienced: boolean = false;
  isShowExperiencedForm: boolean = false;
  isFirstComapny: boolean = false;
  isDisabledEndDate: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  handleToggle() {
    if (!this.isExperienced) {
      // this.resetForm();
      this.initForm();
    } else {
      this.isShowExperiencedForm = false;
    }
  }
  initForm() {
    this.SecondFormGroup = this.fb.group({
      arr: this.fb.array([this.createItem()])
    })
    this.SecondFormGroup.valueChanges.pipe(throttleTime(200),
      takeUntil(this.unbinder),
      startWith(this.SecondFormGroup.value),
      pairwise()).subscribe(([oldFormValue, newFormValue]) => {
        this.nextDisabled = !this.SecondFormGroup.valid;
        this.valueChangedSecondForm.emit(this.SecondFormGroup);
      });
      this.isShowExperiencedForm = true;
  }

  get f() {
    return this.SecondFormGroup.controls;
  }

  createItem() {
    return this.fb.group({
      isFirstCompany: [false],
      companyFormControl: ['', Validators.required],
      designationControl: ['', [Validators.required]],
      startDateControl: ['',[Validators.required]],
      endDateControl: [new Date()]
    });
  }

  addItem() {
    this.arr = this.f['arr'] as FormArray;
    this.arr.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['arr'] as FormArray).removeAt(idx);
  }

  getErrorMessage(controlName, index) {
    let errorMessage = '';
    const arrayControl = this.SecondFormGroup.get('arr') as FormArray;
    const currControl = arrayControl.at(index) as FormGroup;
    switch (controlName) {
      case 'companyFormControl':
        errorMessage = currControl.controls['companyFormControl'].hasError('required') ? errorMessages.requiredCompany : '';
        break;
      case 'designationControl': 
      errorMessage = currControl.controls['designationControl'].hasError('required') ? errorMessages.requiredCompanyOption : '';
      break;
    }
    return errorMessage;
  }

  resetForm() {
    this.arr.reset();
    this.arr.reset();
  }

  onFirstCompanyClick(index) {
    const arrayControl = this.SecondFormGroup.get('arr') as FormArray;
    const currControl = arrayControl.at(index) as FormGroup;
    this.isDisabledEndDate = !currControl.controls['isFirstCompany'].value;
  }

  onFormSubmit() {
    this.onSubmit.emit(this.SecondFormGroup.value);
  }

  ngOnDestroy(): void {
    this.unbinder.next('DESTROYED');
  }

}
