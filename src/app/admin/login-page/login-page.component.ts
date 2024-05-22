import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IAdminData } from '@app/shared/interfaces';
import { AuthService } from '@app/admin/shared/services/auth.service';
import { loginAction } from '@app/admin/shared/store/login/actions';
import { isSubmittingSelector } from '@app/admin/shared/store/login/selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm!: UntypedFormGroup;
  public submitted = false;
  public messageFromQueryParams!: string;
  public isSubmitting$: Observable<boolean>; // это тоже самое что и submitted только через ngrx

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.loginFailed) {
          this.messageFromQueryParams = 'Пожалуйста, введите данные';
        } else if (params.authFailed) {
          this.messageFromQueryParams = 'Сессия истекла. Введите данные заново';
        }
      }
    )

    this.initializeForm();
    this.initializeValues();
  }

  private initializeForm(): void {
    this.loginForm  = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.email, Validators.required]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  submit() {
    if (this.loginForm?.valid) {
      this.submitted = true;

      const admin: IAdminData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        returnSecureToken: true
      };

      this.auth.login(admin)
        // .pipe(
        //   delay(3000)
        // )
        .subscribe(
          () => {
            this.submitted = false;
            this.loginForm.reset();
            this.router.navigate(
              ['/admin', 'dashboard'],
              // {skipLocationChange: true}
            );
          },
          () => this.submitted = false
        );

      // this.store.dispatch(loginAction(admin)); // это тоже самое что и auth.login() только через ngrx
    }
  }

}
