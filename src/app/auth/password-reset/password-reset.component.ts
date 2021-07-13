import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  token: string = '';
  token_valid: boolean = true;

  resetForm: FormGroup;
  submitted: boolean = false;
  hasError = false;

  loading = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("token");

    this.authService.verifyResetToken(this.token)
      .pipe()
      .subscribe(
        (res: any) => {
          console.log('res', res);
          this.token_valid = true;
        },
        (err) => {
          console.log('err', err);
          
          this.token_valid = false;
        });

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    }, { validator: this.checkPasswords });
  }

  get f() { return this.resetForm.controls; }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordConfirm.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    this.submitted = true;
    this.hasError = false;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return false;
    }

    this.loading = true;
    
    this.authService.resetConfirmPassword(this.f.password.value, this.token)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.success = true;
          
          this.loading = false;
        },
        (err) => {
          this.loading = false;
          this.hasError = true;
        });

    return false;
  }
}
