import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { loginAction, loginFailureAction, loginSuccessAction } from "./actions";
import { IAdminData, IFbAuthError, IFbAuthResponse } from "@app/shared/interfaces";
import { PersistanceService } from "../../services/persistance.service";

@Injectable()
export class LoginEffect {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginAction),
            // tap(resp => console.log(resp)),
            switchMap((data: IAdminData) => {
                return this.authService.loginForNgrx(data).pipe(
                    map((resp: IFbAuthResponse) => {

                        const expDate = new Date(new Date().getTime() + +resp.expiresIn * 1000);
                        this.persistanceService.set('fb-token', resp.idToken);
                        this.persistanceService.set('fb-token-exp', expDate.toString());

                        return loginSuccessAction(resp);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        // console.log(error);
                        const propsForFailureAction: IFbAuthError = error.error.error || { code: 0, message: 'Unknown Error', errors: [] };
                        return of(loginFailureAction(propsForFailureAction));
                    })
                )
            })
        )
    })

    redirectAfterSubmit$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginSuccessAction),
                tap(() => {
                    this.router.navigate(['/admin', 'dashboard']);
                })
            )
        },
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private persistanceService: PersistanceService,
        private router: Router
    ) { }
}