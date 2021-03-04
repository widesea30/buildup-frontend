import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordVisible = false;
  password?: string;

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;
  token = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    if(this.authService.getUser()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // reset login status
    // this.authenticationService.logout();

    let previousError = localStorage.getItem('authErr');
    if (previousError) this.error = previousError;

    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    
    console.log(this.loginForm.invalid)
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    localStorage.setItem('authErr', '');
    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res.token) {
            this.token = res.token;
            // this.router.navigate(['/']);
            this.router.navigate([this.returnUrl]);
          } else {
            this.error = res.status;
          }
        },
        (err) => {
          if (err.error) {
            this.error = err.error.status;
          } else {
            this.error = 'Invalid credentials.';
          }

        });
  }
}
