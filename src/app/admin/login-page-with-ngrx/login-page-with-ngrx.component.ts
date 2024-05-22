import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAdminData, IFbAuthError } from '@app/shared/interfaces';
import { AuthService } from '@app/admin/shared/services/auth.service';
import { loginAction } from '@app/admin/shared/store/login/actions';
import { isSubmittingSelector, validationErrorsSelector } from '@app/admin/shared/store/login/selectors';

@Component({
  selector: 'app-login-page-with-ngrx',
  templateUrl: './login-page-with-ngrx.component.html',
  styleUrls: ['./login-page-with-ngrx.component.scss']
})
export class LoginPageWithNgrxComponent implements OnInit {

  public loginForm!: UntypedFormGroup;
  public messageFromQueryParams!: string;
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<IFbAuthError | null>;

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
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  submit() {
    if (this.loginForm?.valid) {

      const admin: IAdminData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        returnSecureToken: true
      };

      this.store.dispatch(loginAction(admin));
    }
  }

}
