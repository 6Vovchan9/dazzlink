import { Component, inject } from '@angular/core';
import { CookiesAgreementService } from '@app/shared/services/cookiesAgreement.service';
import { provideTranslocoScope, TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-cookies-toast',
  standalone: true,
  imports: [
    TranslocoDirective
  ],
  providers: [
    provideTranslocoScope('toast'),
  ],
  templateUrl: './cookies-toast.component.html',
  styleUrl: './cookies-toast.component.scss'
})
export class CookiesToastComponent {
  public cookiesAgreementService = inject(CookiesAgreementService);

  public onAcceptAllCookies(): void {
    this.cookiesAgreementService.setCookiesAgreement(true);
  }
}
