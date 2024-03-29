import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "../admin/shared/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const articlesEvaluationFromLS = localStorage.getItem('articlesEvaluation'); // Тут это нужно было изза того что в методе "isAuthenticated" происходит localStorage.clear() когда "fb-token-exp" протух

        if (this.authService.isAuthenticated()) {
            req = req.clone({
                setParams: {
                    auth: this.authService.token || ''
                }
            })
        }
        return next.handle(req)
            .pipe(
                // tap(resp => {
                //     if (resp.type) {
                //         if (!localStorage.getItem('articlesEvaluation') && articlesEvaluationFromLS) {
                //             localStorage.setItem('articlesEvaluation', articlesEvaluationFromLS);
                //         }
                //     }
                // }),
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 401) {
                        this.authService.logout();
                        this.router.navigate(
                            ['/admin', 'login'],
                            {
                                queryParams: {
                                    'authFailed': true
                                }
                            }
                        )
                    }
                    return throwError(err)
                })
            )
    }

}