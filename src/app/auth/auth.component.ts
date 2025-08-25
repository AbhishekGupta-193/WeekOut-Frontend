import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoaderService } from '../loader/loader.service';
import { ToasterService } from '../toaster/toaster.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;

  interestsList = [
    'Trekking',
    'Movies',
    'Cycling',
    'Photography',
    'Cooking',
    'Music',
    'Travel',
    'Gaming',
    'Reading',
    'Yoga',
  ];

  loginForm: FormGroup;
  signupForm: FormGroup;

  loginPasswordVisible = false;
  signupPasswordVisible = false;
  signupConfirmPasswordVisible = false;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToasterService,
    private loader: LoaderService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      interests: this.fb.array(
        this.interestsList.map(() => this.fb.control(false)),
        this.minSelectedCheckboxes(1)
      ),
    });
  }

  goBackHome() {
    this.router.navigate(['/']);
  }

  toggleLoginPasswordVisibility() {
    this.loginPasswordVisible = !this.loginPasswordVisible;
  }

  toggleSignupPasswordVisibility() {
    this.signupPasswordVisible = !this.signupPasswordVisible;
  }

  toggleSignupConfirmPasswordVisibility() {
    this.signupConfirmPasswordVisible = !this.signupConfirmPasswordVisible;
  }

  continueWithGoogle() {
    alert('Google Auth coming soon!');
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log('Login Data:', this.loginForm.value);
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const request = {
      email: email,
      password: password
    }
    this.loader.display(true);
    this.authService.signIn(request).subscribe({
      next:(res:any)=>{
        this.loader.display(false);
        this.router.navigate(['dashboard']);
        this.toaster.success("Login Successful!");
      },
      error:(err:any)=>{
        this.loader.display(false);
        this.toaster.error("Login Failed. Please try again!");
        console.log(err);
      }
    })
  }

  onSignupSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const password = this.signupForm.value.password;
    const confirmPassword = this.signupForm.value.confirmPassword;
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const selectedInterests = this.signupForm.value.interests
      .map((checked: boolean, i: number) =>
        checked ? this.interestsList[i] : null
      )
      .filter((v: string | null) => v !== null);

    const signupData = {
      fullName: this.signupForm.value.fullName,
      email: this.signupForm.value.email,
      password,
      interests: selectedInterests,
    };

    console.log('Signup Data:', signupData);
    this.loader.display(true);
    this.authService.signUp(signupData).subscribe({
      next:(res:any)=>{
        this.loader.display(false);
        this.router.navigate(['dashboard']);
        this.toaster.success("Singup Successful!");
      },
      error:(err:any)=>{
        this.loader.display(false);
        this.toaster.error("Singup Failed. Please try again!");
        console.log(err);
      }
    })
  }

  // Custom validator: at least min required checkboxes selected
  minSelectedCheckboxes(min = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) {
        // If control is not a FormArray, we can't validate, so return null
        return null;
      }
      const totalSelected = control.controls
        .map(ctrl => ctrl.value)
        .reduce((prev, next) => (next ? prev + 1 : prev), 0);

      return totalSelected >= min ? null : { required: true };
    };
  }

  get signupInterestsControls() {
    return (this.signupForm.get('interests') as FormArray).controls;
  }
}
