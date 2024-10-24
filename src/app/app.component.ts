import { Component, Inject, OnInit, inject } from '@angular/core';
import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { TelegramService } from '@app/shared/services/telegram.service';
import { CookiesAgreementService } from '@app/shared/services/cookiesAgreement.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private tgService = inject(TelegramService);
  public cookiesAgreementService = inject(CookiesAgreementService);

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
}
