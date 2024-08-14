import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  effect,
  signal
} from '@angular/core';
import { Observable, Subscription, fromEvent, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

import { langArr } from '@app/shared/constants/languages.constants';
import { PagesService } from '@app/shared/services/pages.service';
import { Router } from '@angular/router';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { GoogleTranslationService } from '@app/shared/services/google-translation.service';
import { AccoTriggerComponent } from '@app/shared/components/acco-trigger/acco-trigger.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';

type IOpportunityMenu = {
  active?: boolean,
  type: 'link' | 'button',
  caption: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    AccoTriggerComponent,
    FormsModule,
    NgClass,
    NgTemplateOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('advertisingVideo') advertisingVideo: ElementRef;

  private name: string;
  private curLang: string;
  private lSub: Subscription;
  private pageWrapScrollSub: Subscription;
  public appOpportunityMenu: Record<string, IOpportunityMenu> = {
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

  public posterImgLoad = signal<boolean>(false);
  public videoLoad = signal<boolean>(false);
  public showVideoPoster = signal<boolean>(true); // если бы не сигнал то при OnPush стратегии пришлось бы запускать detectChanges при изм значения этого свойства
  private posterChangeEffect = effect(() => {
    if (this.showVideoPoster()) {
      console.log("Показываем постер");
    } else {
      console.log("Скрываем постер");
    }
  });

  constructor(
    private pagesService: PagesService,
    @Optional() public mobileDetectService: MobileDetectService,
    private router: Router,
    // private translateService: GoogleTranslationService
    // private cd: ChangeDetectorRef
  ) { }

  // @HostListener('window:load', [])
  // onWindowLoad() {
  //   console.log('onWindowLoad');
  // }

  public ngOnInit(): void {

    this.lSub = this.pagesService.currentLanguage.pipe(
      tap(lang => this.curLang = lang),
      // switchMap(lang => this.translateService.translate(lang, ['Семья начинается с нас']))
    ).subscribe(
      resp => {
        // console.log(resp);
        // this.cd.detectChanges();
      }
    )

    // this.aboutProgressiveImage();
  }

  ngAfterViewInit(): void {
    this.ensureVideoPlays();
  }

  private onVideoEndedCallback = (): void => {
    // console.log('video ended!');
    this.showVideoPoster.set(true);
  };

  private onVideoLoadCallback = (): void => {
    // console.log('loadedmetadata');
    this.videoLoad.set(true);
  };

  private ensureVideoPlays(): void {
    const video = this.advertisingVideo?.nativeElement;
    if (video) {
      video.addEventListener("ended", this.onVideoEndedCallback);
      video.addEventListener("loadedmetadata", this.onVideoLoadCallback);
    }
  }

  public onVideoPlay(): void {
    const video = this.advertisingVideo?.nativeElement;

    if (video) {
      // video.muted = true;
      const videoPromise = video.play();
      if (videoPromise) {
        videoPromise
          .then(() => {
            console.log("Видео запущено :)");
            this.showVideoPoster.set(false);
          })
          .catch(() => {
            console.log("Ошибка при воспроизв. видео :(");
          });
      }
    }
  }

  public onloadCustomPoster(): void {
    this.posterImgLoad.set(true);
  }

  private aboutProgressiveImage(): void {
    if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) {
      if (document.readyState === 'complete') {
        this.onWindowLoaded();
      } else {
        window.addEventListener('load', this.onWindowLoaded.bind(this), false);
      }
    }
  }

  private onWindowLoaded(): void {
    let pItem = document.getElementsByClassName('progressive replace'), timer;
    const pageWrapEl = document.getElementById('pageWrap');

    // pageWrapEl.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', scroller, false);

    this.pageWrapScrollSub = fromEvent(pageWrapEl, 'scroll').subscribe(
      (el) => {
        scroller(el);
      }
    );

    // setTimeout(() => {
    inView();
    // }, 500);

    function scroller(e) {
      timer = timer || setTimeout(function() {
        timer = null;
        requestAnimationFrame(inView);
      }, 300);
    }

    function inView() {

      let wT = pageWrapEl.scrollTop, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;
      while (p < pItem.length) {
  
        cRect = pItem[p].getBoundingClientRect();
        pT = wT + cRect.top; // расстояние с верха окна до картинки
        pB = pT + cRect.height; // pT + высота картинки
  
        // console.log(wT, pB, wB, pT);
        if (wT < pB && wB > pT) {
          // console.log('Загружаем осн картинку');
          loadFullImage(pItem[p]);
          pItem[p].classList.remove('replace');
        }
        else p++;
  
      }
    }

    // replace with full image
    function loadFullImage(item) {

      if (!item || !item.href) return;

      // load image
      let img = new Image();
      if (item.dataset) {
        img.srcset = item.dataset.srcset || '';
        img.sizes = item.dataset.sizes || '';
      }
      img.src = item.href;
      img.className = 'reveal';
      if (img.complete) addImg();
      else img.onload = addImg;

      // replace image
      function addImg() {

        // disable click
        item.addEventListener('click', function (e) { e.preventDefault(); }, false);

        // add full image
        item.appendChild(img).addEventListener('animationend', function (e) {

          // remove preview image
          let pImg = item.querySelector && item.querySelector('img.preview');
          if (pImg) {
            e.target.alt = pImg.alt || '';
            item.removeChild(pImg);
            e.target.classList.remove('reveal');
          }

        });

      }

    }

  }

  public onAccoTriggerClick(path: Array<string>): void {
    this.router.navigate(
      path,
      // { queryParams: { category: 'food' } }
      // {skipLocationChange: true}
    );
  }

  public getContent(key: string): string {
    return langArr[key][this.curLang];
  }

  // public get titleForDownloadBtn(): string {
  //   // console.log('Обновляем контент на home-page');
  //   return 'приложение';
  // }

  // public get titleForDownloadBtn(): string {
  //   // console.log('Обновляем контент на home-page');
  //   return 'приложение';
  // }

  private removeAllListeners(): void {
    const video = this.advertisingVideo?.nativeElement;
    if (video) {
      // console.log('Удаляем слушатель окончания видео');
      video.removeEventListener("ended", this.onVideoEndedCallback);
      video.removeEventListener("loadedmetadata", this.onVideoLoadCallback);
    }
  }

  public ngOnDestroy(): void {
    this.pageWrapScrollSub?.unsubscribe();
    this.lSub?.unsubscribe();
    this.removeAllListeners();
  }

}
