import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

// @Injectable()
// export class AuthGuard {

//     constructor(
//         public auth: AuthService,
//         private router: Router
//     ) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
//         if (this.auth.isAuthenticated()) {
//             return true;
//         } else {
//             this.auth.logout();
//             this.router.navigate(
//                 ['/admin', 'login'],
//                 {
//                     queryParams: {
//                         loginFailed: true
//                     }
//                 }
//             );
//             return false;
//         }
//     }
// }

export const authGuard = (): boolean => {
    const authServise = inject(AuthService);
    const router = inject(Router);

    if (authServise.isAuthenticated()) {
        return true;
    } else {
        authServise.logout();
        router.navigate(
            ['/admin', 'login'],
            {
                queryParams: {
                    loginFailed: true
                }
            }
        );
        return false;
    }
}