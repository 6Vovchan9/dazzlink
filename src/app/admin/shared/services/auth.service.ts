import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IAdminData, IFbAuthResponse } from "src/app/shared/interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {

    public error$ = new Subject<string>();

    constructor(private http: HttpClient) { }

    get token(): string | null {
        const expDate = new Date(localStorage.getItem('fb-token-exp') || 0);
        if (new Date() > expDate) {
            this.logout();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    login(user: IAdminData): Observable<IFbAuthResponse> {
        user.returnSecureToken = true;
        return this.http.post<IFbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                // delay(2000),
                tap(this.#setToken),
                catchError(this.handleError.bind(this))
            )
    }

    logout() {
        this.#setToken(null)
    }

    handleError(error: HttpErrorResponse) {

        const { message } = error.error.error;

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Неверный email');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Такого email нет');
                break;
        }

        return throwError(error);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    #setToken(response: IFbAuthResponse | null): void {
        if (response){
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }


}