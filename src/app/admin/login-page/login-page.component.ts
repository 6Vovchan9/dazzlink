import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminData } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm!: FormGroup;
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

    this.loginForm  = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.loginForm?.valid) {
      this.submitted = true;
      const admin: AdminData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.auth.login(admin).subscribe(
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
