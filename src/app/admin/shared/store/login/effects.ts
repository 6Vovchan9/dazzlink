import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "../../services/auth.service";
import { loginAction, loginFailureAction, loginSuccessAction } from "./actions";
import { IAdminData, IFbAuthError, IFbAuthResponse } from "@app/shared/interfaces";

@Injectable()
export class LoginEffect {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginAction),
            // tap(resp => console.log(resp)),
            switchMap((data: IAdminData) => {
                return this.authService.login(data).pipe(
                    map((resp: IFbAuthResponse) => {
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

    constructor(private actions$: Actions, private authService: AuthService) { }
}