import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
// import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
// import { CookiesAgreementService } from "@app/shared/services/cookiesAgreement.service";

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    // const cookiesAgreementService = inject(CookiesAgreementService);
    const reqWithHeader = req.clone({
        headers: req.headers.set('X-New-Header', 'new header value'),
    });
    return next(reqWithHeader)
        .pipe(
            tap(event => {
                if (event.type === HttpEventType.Response) {
                    console.log(req.url, 'returned a response with status', event.status);
                }
            })
        );
}