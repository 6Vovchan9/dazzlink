import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IAdminData } from '@app/shared/interfaces';
import { AuthService } from '@app/admin/shared/services/auth.service';
import { advanceForbiddenEmailValidator, asyncEmailValidator, forbiddenEmailValidator } from '@app/admin/shared/validators/login.validator';

// enum ReceiverType {
//   PERSON = 'PERSON',
//   LEGAL = 'LEGAL'
// }

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm!: UntypedFormGroup; // "!:" таким образом я уверяю typescript что это свойство точно будет передано
  public submitted = false;
  public messageFromQueryParams!: string;

  // #fb = inject(FormBuilder);
  // form = this.#fb.group({
  //   type: this.#fb.nonNullable.control<ReceiverType>(ReceiverType.LEGAL),
  //   name: this.#fb.nonNullable.control<string>('Lucas'), // у nonNullable есть интересная особенность при this.form.reset() - значение этого контрола после сброса будет "Lucas" а не null
  //   inn: this.#fb.control<number | null>(null)
  // });

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
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
  }

  private initializeForm(): void {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, {
        validators: [Validators.email, Validators.required, forbiddenEmailValidator, advanceForbiddenEmailValidator(['ivan@mail.ru'])],
        asyncValidators: [asyncEmailValidator],
        updateOn: 'change'
      }),
      password: new UntypedFormControl(null, { validators: [Validators.required, Validators.minLength(6)] })
    });
  }

  submit() {
    // console.log(this.loginForm.value);
    // console.log(this.loginForm.getRawValue());

    if (this.loginForm?.valid) {
      this.submitted = true;

      const admin: IAdminData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
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
    }
  }

}
