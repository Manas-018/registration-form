import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Validate } from 'src/app/Utils/Validators.utils';
import { MY_FORMATS, errorMessages } from 'src/app/constants/common';
import { pairwise, startWith, takeUntil, throttleTime } from "rxjs/operators";
import * as _moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment} from 'moment';


const moment = _moment;

@Component({
  selector: 'app-education-detail',
  templateUrl: './education-detail.component.html',
  styleUrls: ['./education-detail.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class EducationDetailComponent implements OnInit, OnDestroy {

  ThirdFormGroup: FormGroup;
  thirdFormGroupArr: FormArray;
  validate = new Validate();
  nextDisabled: boolean = true;
  degrees: string[] = ['SSC', 'Diploma', 'B.Tech', 'M.Tech', 'BCA', 'MCA'];
  unbinder: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChangedThirdForm = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  ngOnDestroy(): void {
    this.unbinder.next('DESTROYED');
  }

  initForm() {
    this.ThirdFormGroup = this.fb.group({
      thirdFormGroupArr: this.fb.array([this.createItem()])
    })
    this.ThirdFormGroup.valueChanges.pipe(
      takeUntil(this.unbinder),
      startWith(this.ThirdFormGroup.value),
      pairwise()).subscribe(([oldFormValue, newFormValue]) => {
        this.nextDisabled = !this.ThirdFormGroup.valid;
        this.valueChangedThirdForm.emit(this.ThirdFormGroup);
      });
  }

  get f() {
    return this.ThirdFormGroup.controls;
  }

  addItem() {
    this.thirdFormGroupArr = this.f['thirdFormGroupArr'] as FormArray;
    this.thirdFormGroupArr.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['thirdFormGroupArr'] as FormArray).removeAt(idx);
  }

  createItem() {
    return this.fb.group({
      collegeNameFormControl: ['', Validators.required],
      universityFormControl: ['', [Validators.required]],
      degreeFormControl: ['', [Validators.required]],
      passedOutDate: [moment()]
    });
  }

  onDegreeChange(event, index) {
    const arrayControl = this.ThirdFormGroup.get('thirdFormGroupArr') as FormArray;
    const currControl = arrayControl.at(index) as FormGroup;
    currControl.controls['degreeFormControl'].patchValue(event.value);
  }

  chosenYearHandler(normalizedYear: Moment, index) {
    const arrayControl = this.ThirdFormGroup.get('thirdFormGroupArr') as FormArray;
    const currControl = arrayControl.at(index) as FormGroup;
    const ctrlValue = currControl.controls['passedOutDate'].value;
    ctrlValue.year(normalizedYear.year());
    currControl.controls['passedOutDate'].patchValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index) {
    const arrayControl = this.ThirdFormGroup.get('thirdFormGroupArr') as FormArray;
    const currControl = arrayControl.at(index) as FormGroup;
    const ctrlValue = currControl.controls['passedOutDate'].value;
    ctrlValue.month(normalizedMonth.month());
    currControl.controls['passedOutDate'].patchValue(ctrlValue);
    datepicker.close();
  }

  getErrorMessage(controlName, index) {
    let errorMessage = '';
    const arrayControl = this.ThirdFormGroup.get('thirdFormGroupArr') as FormArray;
    const currControl = arrayControl.at(index) as FormGroup;
    switch (controlName) {
      case 'collegeNameFormControl':
        errorMessage = currControl.controls['collegeNameFormControl'].hasError('required') ? errorMessages.requiredCollegeName : '';
        break;
      case 'universityFormControl':
        errorMessage = currControl.controls['universityFormControl'].hasError('required') ? errorMessages.requiredUniversityName : '';
        break;
      case 'degreeFormControl':
        errorMessage = currControl.controls['degreeFormControl'].hasError('required') ? errorMessages.requiredDegree : '';
        break;
    }
    return errorMessage;
  }
  

  onFormSubmit() {
    this.onSubmit.emit(this.ThirdFormGroup.value);
  }

}
