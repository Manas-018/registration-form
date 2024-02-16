import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Validate } from 'src/app/Utils/Validators.utils';
import { errorMessages } from 'src/app/constants/common';
import { pairwise, startWith, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {

  FourthFormGroup: FormGroup;
  fourthFormGroupArr: FormArray;
  validate = new Validate();
  nextDisabled: boolean = true;
  Levels: string[] = ['Advanced', 'Intermediate', 'Beginner'];
  unbinder: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChangedFourthForm = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unbinder.next('DESTROYED');
  }

  initForm() {
    this.FourthFormGroup = this.fb.group({
      fourthFormGroupArr: this.fb.array([this.createItem()])
    })
    this.FourthFormGroup.valueChanges.pipe(
      takeUntil(this.unbinder),
      startWith(this.FourthFormGroup.value),
      pairwise()).subscribe(([oldFormValue, newFormValue]) => {
        this.nextDisabled = !this.FourthFormGroup.valid;
        this.valueChangedFourthForm.emit(this.FourthFormGroup);
      });
  }

  get f() {
    return this.FourthFormGroup.controls;
  }

  addItem() {
    this.fourthFormGroupArr = this.f['fourthFormGroupArr'] as FormArray;
    this.fourthFormGroupArr.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['fourthFormGroupArr'] as FormArray).removeAt(idx);
  }

  createItem() {
    return this.fb.group({
      skillsFormControl: ['', Validators.required],
      levelFormControl: ['', [Validators.required]]
    });
  }

  onLevelChange(event, index) {
    const arrayControl = this.FourthFormGroup.get('fourthFormGroupArr') as FormArray;
    const currControl = arrayControl.at(index) as FormGroup;
    currControl.controls['levelFormControl'].patchValue(event.value);
  }

  getErrorMessage(controlName, index) {
    let errorMessage = '';
    const arrayControl = this.FourthFormGroup.get('fourthFormGroupArr') as FormArray;
    const currControl = arrayControl.at(index) as FormGroup;
    switch (controlName) {
      case 'skillsFormControl':
        errorMessage = currControl.controls['skillsFormControl'].hasError('required') ? errorMessages.requiredCollegeName : '';
        break;
      case 'levelFormControl':
        errorMessage = currControl.controls['levelFormControl'].hasError('required') ? errorMessages.requiredUniversityName : '';
        break;
    }
    return errorMessage;
  }

  onFormSubmit() {
    this.onSubmit.emit(this.FourthFormGroup.value);
  }

}
