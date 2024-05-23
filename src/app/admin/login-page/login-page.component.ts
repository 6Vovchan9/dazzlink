import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IAdminData } from '@app/shared/interfaces';
import { AuthService } from '@app/admin/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm!: UntypedFormGroup;
  public submitted = false;
  public messageFromQueryParams!: string;

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
    this.loginForm  = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.email, Validators.required]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
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
