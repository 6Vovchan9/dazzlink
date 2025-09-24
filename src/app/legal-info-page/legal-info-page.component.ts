import { Component, OnInit, signal } from '@angular/core';
import { FooterComponent } from '@app/shared/components/footer/footer.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';

@Component({
  selector: 'app-legal-info-page',
  templateUrl: './legal-info-page.component.html',
  styleUrls: ['./legal-info-page.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LegalInfoPageComponent implements OnInit {
  showWinlineBtns = signal(false);
  isTg = signal(false);

  checkIsTg(): void {
    const tgPlatform = !!(window.document.defaultView as any).Telegram?.WebApp;
    this.isTg.set(tgPlatform);
  }

  ngOnInit() {
    this.checkIsTg();
  }

  toWinlineOpenBlank(): void {
    this.checkIsTg();
    window.open('https://m.winline.ru/', '_blank');
  }

  toWinlineOpenSelf(): void {
    this.checkIsTg();
    window.open('https://m.winline.ru/', '_self');
  }

  toWinlineOpenParent(): void {
    this.checkIsTg();
    window.open('https://m.winline.ru/', '_parent');
  }

  toWinlineOpenTop(): void {
    this.checkIsTg();
    window.open('https://m.winline.ru/', '_top');
  }

  toWinlineHref(): void {
    this.checkIsTg();
    window.location.href = 'https://m.winline.ru/';
  }

  toTunaOpenBlank(): void {
    this.checkIsTg();
    window.open('https://tuna', '_blank');
  }

  toTunaOpenSelf(): void {
    this.checkIsTg();
    window.open('https://tuna', '_self');
  }

  toTunaOpenParent(): void {
    this.checkIsTg();
    window.open('https://tuna', '_parent');
  }

  toTunaOpenTop(): void {
    this.checkIsTg();
    window.open('https://tuna', '_top');
  }

  toTunaHref(): void {
    this.checkIsTg();
    window.location.href = 'https://tuna';
  }
}