import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin, ISingIn } from '../../models/Auth';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isAllReadyHasAccount: boolean = false
  LoginForm !: FormGroup
  SignUpForm !: FormGroup
  constructor(private authservice: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm()
    this.createSignUpForm()
  }

  createLoginForm() {
    this.LoginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  createSignUpForm() {
    this.SignUpForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required)
    })
  }

  get l() {
    return this.LoginForm.controls
  }

  get s() {
    return this.SignUpForm.controls
  }

  onLogin() {
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched()
    } else {
      let userDetails: ILogin = {
        ...this.LoginForm.value
      }
      console.log(userDetails)
      this.authservice.Login(userDetails).subscribe({
        next: res => {
          console.log(res)
          this.snackbar.opensnackbar(res.message)
          this.authservice.SaveToken(res.token)
          this.authservice.SaveUserRole(res.userRole)
          this.authservice.islading$.next(res.userRole)
          this.router.navigate(['/home'])

        },
        error: err => {
          this.snackbar.opensnackbar(err.error.message)
        }
      })
    }

  }
  onSignUp() {
    if (this.SignUpForm.invalid) {
      this.SignUpForm.markAllAsTouched()
    } else {
      let userDetails: ISingIn = {
        ...this.SignUpForm.value
      }
      this.authservice.SignUp(userDetails).subscribe({
        next: res => {

          this.snackbar.opensnackbar(res.message)
          this.isAllReadyHasAccount = true
        },
        error: err => {
          this.snackbar.opensnackbar(err.error.message)
          this.isAllReadyHasAccount = true
        }
      })
    }

  }

}
