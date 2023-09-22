import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { langArr } from '@app/shared/constants/languages.constants';
import { PagesService } from '@app/shared/services/pages.service';
import { Router } from '@angular/router';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';

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
    },
    tariff: {
      type: 'link',
      caption: 'Тарифы'
    },
    linkToQuestions: {
      type: 'link',
      caption: 'Помощь и частые вопросы'
    },
    legalInf: {
      type: 'link',
      caption: 'Правовая информация'
    },
    linkToCompany: {
      type: 'link',
      caption: 'О компании'
    },
  };

  constructor(
    private pagesService: PagesService,
    public mobileDetectService: MobileDetectService,
    private router: Router
    // private cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    // console.log('---HomePageComponent init---');
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

  public get webview(): boolean {
    const result = navigator.userAgent.includes('Dazzlink');
    return result;
  }

  public mobileStoreSrc(): string {
    const osDevice = this.mobileDetectService.osDevice;

    if (osDevice?.toLowerCase() === 'ios') {
      return 'assets/images/linkIOSShort.svg';
    } else if (osDevice?.toLowerCase() === 'androidos') {
      return 'assets/images/linkAndroidShort.svg';
    } else {
      return 'assets/images/linkAppGallery.svg';
    }
  }

  public goToStore(): void {
    const osDevice = this.mobileDetectService.osDevice;
    console.log('Идем в store');
    if (osDevice?.toLowerCase() === 'ios') {
      // window.location.href = 'https://www.apple.com/app-store';
      window.location.href = 'https://apps.apple.com/ru';
    } else if (osDevice?.toLowerCase() === 'androidos') {
      // window.open('https://play.google.com', '_blank');
      // window.location.href = 'https://play.google.com';
      window.open('https://play.google.com');
    } else {
      // window.location.href = 'https://appgallery.huawei.com';
      window.open('https://appgallery.huawei.com');
    }
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }

}
