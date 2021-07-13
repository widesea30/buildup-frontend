import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  error = '';
  hasError = false;
  loading = false;

  sent = false;

  constructor(private formBuilder: FormBuilder, private _location: Location, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() { return this.resetForm.controls; }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.submitted = true;
    this.sent = false;
    this.hasError = false;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return false;
    }

    this.loading = true;
    
    this.authService.resetPassword(this.f.email.value)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.sent = true;

          this.loading = false;
        },
        (err) => {
          this.hasError = true;
          this.loading = false;

          if (err.error) {
            this.error = err.error.status;
          } else {
            this.error = 'Invalid credentials.';
          }
        });

    return false;
  }
}
