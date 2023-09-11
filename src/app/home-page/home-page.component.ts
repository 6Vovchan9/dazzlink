import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { langArr } from '@app/shared/constants/languages.constants';
import { PagesService } from '@app/shared/services/pages.service';
import { Router } from '@angular/router';

type IOpportunityMenu = {
  active?: boolean,
  type: 'link' | 'button',
  caption: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {

  private curLang: string;
  private lSub: Subscription;
  public appOpportunityMenu: {[key: string]: IOpportunityMenu} = {
    media: {
      type: 'link',
      caption: 'Медиа про психологию отношений'
    },
    locations: {
      active: false,
      type: 'button',
      caption: 'Подборка локаций для свиданий'
    },
    company: {
      type: 'link',
      caption: 'Блог о компании и правовая информация'
    },
    conditions: {
      active: false,
      type: 'button',
      caption: 'Тарифы и условия'
    },
    questions: {
      active: false,
      type: 'button',
      caption: 'Помощь и частые вопросы'
    }
  };

  constructor(
    private pagesService: PagesService,
    private router: Router
    // private cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.lSub = this.pagesService.currentLanguage.subscribe(
      lang => {
        this.curLang = lang;
        // this.cd.detectChanges();
      }
    )
  }

  public onAccoTriggerClick(path: Array<string>): void {
    this.router.navigate(
      path,
      // {skipLocationChange: true}
    );
  }

  public getContent(key: string): string {
    return langArr[key][this.curLang];
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }

  public mobileStoreSrc(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('ios') || userAgent.includes('iphone')) {
      return 'assets/images/linkIOSShort.svg';
    } else if (userAgent.includes('android')) {
      return 'assets/images/linkAndroidShort.svg';
    } else return 'assets/images/linkAppGallery.svg'
  }

  public goToStore(): void {
    const userAgent = navigator.userAgent.toLowerCase();
    console.log('Идем в store');
    if (userAgent.includes('ios') || userAgent.includes('iphone')) {
      window.location.href = 'https://apps.apple.com/ru';
    } else if (userAgent.includes('android')) {
      window.location.href = 'https://apps.apple.com/ru';
    } else window.location.href = 'https://apps.apple.com/ru';
  }

}
