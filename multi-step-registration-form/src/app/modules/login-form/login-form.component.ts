import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessages } from 'src/app/constants/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {


  hide = true;
  loginForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router,private _snackBar: MatSnackBar) {
     
    }
  
  ngOnInit() {
    this.initializeForm();
    
  }
  initializeForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  getErrorMessage() {
    return this.loginForm.get('email').hasError('required') ? errorMessages.requiredEmail:
    this.loginForm.get('email').hasError('email') ? errorMessages.invalidEmail : '';
  }

  login(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  goToRegistrationForm(){
    this.router.navigate(['/registration']);
  }
  

}
