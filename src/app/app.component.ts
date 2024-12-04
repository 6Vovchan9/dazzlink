import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, DOCUMENT, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, pairwise, tap } from 'rxjs/operators';

import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { TelegramService } from '@app/shared/services/telegram.service';
import { CookiesAgreementService } from '@app/shared/services/cookiesAgreement.service';
import { PagesService } from '@app/shared/services/pages.service';
import { ToastComponent } from '@app/shared/components/toast/toast.component';
import { CookiesToastComponent } from '@app/shared/components/cookies-toast/cookies-toast.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    NgIf,

    ToastComponent,
    ModalComponent,
    CookiesToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private tgService = inject(TelegramService);
  public cookiesAgreementService = inject(CookiesAgreementService);
  private routerSub: Subscription;
  private router = inject(Router);
  private pagesService = inject(PagesService);

  constructor(
    public modalService: GlobalModalService,
    @Inject(DOCUMENT) private readonly documentRef: Document
  ) { }

  ngOnInit(): void {
    // console.log(navigator.userAgent);
    this.tgService.ready(); // Это для телеги
    // const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // console.log(isDarkMode ? 'Тёмный режим включен.' : 'Тёмный режим выключен.');

    // const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // schemeQuery.addEventListener('change', this.updateScheme);

    setTimeout(() => {
      this.cookiesAgreementService.getCookiesAgreement();
    }, 2000);
    // this.cookiesAgreementService.removeCookiesAgreement();

    this.checkRouterEvents();
  }

  // private updateScheme(event): void {
  //   const newScheme = event.matches ? "тёмная" : "светлая";
  //   console.log(`Цветовая схема системы обновлена на ${newScheme}.`);
  //   // Время адаптировать интерфейс 🌓
  // } // воспроизвести можно в хроме в dev tools во вкладке "Rendering"

  public get appWebview(): boolean {
    const myNavigator = this.documentRef.defaultView.navigator; // почему нежелательно просто обратиться к navigator.userAgent читай в notes.md
    const result = myNavigator.userAgent.includes('Dazzlink');
    // return true;
    return result;
  }

  private checkRouterEvents(): void {
    this.routerSub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        pairwise()
      ).subscribe(
        // previous => {
        //   console.log(previous);
        // }
        ([previous, current]: [NavigationEnd, NavigationEnd]) => {
          // console.log('appComponent:', previous.url);
          this.pagesService.prevPage.set(previous.url);
          // console.log('appComponent:', current.url);
        }
      )
  }

  buttonInModalClick(modalDesc) {
    if (!this[modalDesc.methodName]) {
      console.log(`В компоненте "${modalDesc.componentName}" нет метода "${modalDesc.methodName}"`);
      return;
    }
    this[modalDesc.methodName]();
  }

  public clickByCloseModal(): void {
    this.modalService.close();
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
