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
import { Router } from '@angular/router';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';

import { langArr } from '@app/shared/constants/languages.constants';
import { PagesService } from '@app/shared/services/pages.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { GoogleTranslationService } from '@app/shared/services/google-translation.service';
import { AccoTriggerComponent } from '@app/shared/components/acco-trigger/acco-trigger.component';
import { ThumbHash } from '@app/shared/helpers/classes/thumbHash.class';
import { CitiesService } from '@app/shared/services/cities.service';
import { ICity } from '@app/shared/types/cities.interface';
import { CityCarouselImageComponent } from './components/city-carousel-image/city-carousel-image.component';

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
    NgStyle,
    NgTemplateOutlet,
    CityCarouselImageComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent extends ThumbHash implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('advertisingVideo') advertisingVideo: ElementRef;
  // @ViewChild('thumbHashDemo') thumbHashDemoImg: ElementRef<HTMLImageElement>;

  public base64ForImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAXCAYAAABqBU3hAAAMEElEQVR4AQCBAH7/ALGlnf+wo5z/r6Ga/62fl/+rnJT/qpqS/6qZkP+qmI//q5iP/6yYjv+tmI7/rpiO/6+Yjv+wmY7/spqQ/7Sckv+3oJb/u6Sb/7+ooP/CrKX/w6+o/8Owqv/Br6r/vayo/7iopf+xo6H/q56e/6aamv+ilpf/n5SW/52Slf+ckpT/AIEAfv8Ar6Ob/6+imv+toJj/rJ2W/6qbk/+pmpH/qZmQ/6qYj/+rmI7/rJiO/62Yjv+umI7/r5iO/7CZjv+ympD/tZ2T/7ihl/+8pZz/wKqh/8Supv/Gsar/xrKs/8Sxrf/Ar6v/u6uo/7Wmpf+woqH/q56e/6aam/+jmJr/opeZ/6GWmP8AgQB+/wCsn5j/q56X/6qdlf+pm5P/qJqR/6iYkP+pmI//qpiO/6uYjv+smI7/rZiN/66Yjf+vmI3/sZmO/7ObkP+2npP/uqKY/7+nnf/DrKP/x7Gp/8q1rf/Lt7D/yrax/8a0sP/Csa7/vK2q/7eop/+ypaT/rqKi/6ygoP+qnp//qZ6f/wCBAH7/AKiblP+om5P/p5qS/6eZkf+nmI//p5eO/6iXjv+pl47/q5iO/6yYjf+umI3/r5iN/7CYjf+xmY7/s5uQ/7eek/+8o5j/wame/8evpf/Ltav/z7mx/9G7tP/QvLb/zbq1/8m3s//EtLD/v7Ct/7utq/+3qqn/taio/7Onp/+zp6f/AIEAfv8ApJiQ/6SXkP+kl4//pJaP/6WWjv+mlo7/qJeO/6qYjv+rmI7/rZmO/66Yjf+vmI3/sJiN/7GZjf+0m4//uJ+T/72kmP/Dqp//ybGm/8+3rf/TvLP/1b+3/9XAuf/Tv7n/z723/8u6tf/GtrL/wrOw/7+xrv+9r63/vK+t/7uurf8AgQB+/wChlY7/oZWO/6KVjv+jlY7/pJaO/6aXjv+omI//q5mP/62Zj/+umo//r5mO/6+Zjf+wmIz/sZmN/7Sbjv+4n5L/vaSY/8Srn//Lsqb/0bmu/9a+tP/Ywbj/2MO6/9bCuv/TwLn/z723/8u5tP/Ht7L/xLWx/8KzsP/Bs7D/wbOw/wCBAH7/AJ+Tjf+fk43/oJSN/6KVjv+kl4//p5iQ/6qakf+sm5L/rpuR/6+bkf+wmo//sJmN/7CYjP+xmIz/s5qO/7eekf+9o5f/xKqe/8uxpf/RuK3/1r6z/9jBt//Zwrn/18G5/9O/t//PvLX/y7my/8i2sP/Fta//xLSv/8Ozr//Cs6//AIEAfv8AnZKN/56Tjv+glI//opaQ/6WYkv+pmpP/rJyU/66elf+wnpX/sZ2T/7Gckf+wmo//sJiN/7CYjP+zmo3/tp2Q/7yilf/DqZz/yrCk/9C3q//UvLD/17+0/9e/tf/UvrT/0buy/8y4sP/Ita3/xbKr/8Oxqv/BsKr/wbCq/8Cwqv8AgQB+/wCcko//nZOQ/5+Vkf+il5P/ppqV/6qdl/+tn5j/sKCZ/7KgmP+yn5b/sp2U/7GbkP+wmY7/sJiN/7KZjf+2nJD/u6KV/8Kom//Ir6L/zrWp/9K5rf/Uu7D/07uw/9C5r//Mtqz/x7Kp/8Ovp//AraX/vquk/72rpP+8q6T/vKuk/wCBAH7/AJqSkf+bk5L/npWT/6KYlv+mm5j/qp+b/66hnP+xop3/sqKc/7Ohmv+yn5b/sZyT/7CakP+wmY7/spqP/7adkf+7opb/wqic/8iuov/NtKj/0Les/9G4rf/Pt6z/y7Sq/8awpv/BrKP/vamg/7qnnv+5pp7/uKae/7imn/+4pp//AIEAfv8AlpCR/5iSk/+blJX/n5eY/6Sbm/+pn53/raGf/7CjoP+xo5//sqKc/7Gfmf+wnZX/r5uT/7Cakf+ym5L/t5+U/7ykmf/Dqp//ybCk/820qf/Qt6z/z7es/8y1qv/Isaf/wqyj/72on/+5pJz/tqKa/7Wimv+1opv/tqOc/7aknf8AgQB+/wCQjJH/kY6S/5WRlP+ZlJf/n5ib/6Scnv+on6D/rKGh/66hoP+voZ7/r5+b/66dmP+vm5X/sJyV/7Oelv+4opn/vqee/8WtpP/Ls6n/z7et/9G5r//PuK7/zLWr/8awpv/AqqH/u6ad/7ejmv+1oZn/taGa/7Wjm/+3pJ3/t6We/wCBAH7/AIaFjv+Ih4//jIqR/5COlf+Wkpj/nJec/6Ganv+lnJ//p52f/6mdnf+qnJv/q5uZ/6ybmP+vnZj/tKCb/7qln//Bq6X/yLKr/864sP/Su7P/07y0/9G6sv/Mtq7/xrCp/8Cro/+7pp//t6Oc/7ajnP+3pJ3/uaag/7upov+8qqT/AIEAfv8AeXyI/3t9if9/gIz/hIWQ/4qJk/+Qjpf/lZGZ/5qUm/+dlpv/oJaa/6KXmf+kl5n/qJmZ/62cm/+zoZ//u6il/8Ovq//Lt7L/0ry3/9XAuv/VwLr/0723/824sv/Hsqz/wKym/7uoov+4paD/uKah/7qoo/+9rKf/wK+q/8KxrP8AgQB+/wBqcID/bHGC/3B0hP91eIj/e32L/4GBj/+GhZL/i4mU/5CLlf+TjZX/l4+V/5uRlv+hlJj/qJqc/7Chov+6qan/xLKx/826uP/TwL3/18PA/9bCv//Tv7v/zbm1/8ayrv+/rKj/uqik/7mno/+6qKX/vayp/8Gxrv/FtbL/yLi1/wCBAH7/AFlieP9bZHn/XmZ7/2Nqfv9pb4L/b3OF/3V3iP96eor/f32L/4SAjP+Jg47/j4eQ/5eNlf+glJr/qp2i/7anq//BsbT/y7q8/9LAwf/Vw8P/1MLB/8+9vP/ItrX/wa+u/7qpqP+2paT/taWk/7iop/+8raz/wrOy/8e4t//Ku7r/AIEAfv8ASFRu/0lVb/9NWHH/UVt0/1Zfd/9cY3n/YWd8/2dqfv9sboD/cnGC/3l2hP+Ae4j/ioOO/5WMlv+hl5//rqKp/7uts//Ftrv/zLzA/86+wv/MvL//x7e5/7+vsf+3p6n/sKGi/62dnv+tnp//sKKj/7aoqv++sLH/xLa3/8e6u/8AgQB+/wA3RmX/OEdm/ztKZ/8/TGn/RE9s/0lTbv9OVnD/U1lx/1ldc/9fYXX/ZmZ5/29tfv96doX/h4CO/5WNmf+jmaT/sKWu/7qutv/BtLv/w7W7/8Cyt/+5q7D/saKn/6iZnv+hk5f/nY+T/56QlP+jlZn/qp2h/7Kmqv+6rbH/vrG1/wCBAH7/ACg6Xf8pO17/Kz1f/y8/YP8yQWH/NkNi/ztGY/9ASWX/RUxm/0xQaP9UVmz/XV5y/2lnev93c4T/hoCP/5WNm/+imab/raOu/7Onsv+0qLH/r6Or/6ibo/+ekZj/lIeO/4yAhv+JfIP/in6E/5CEiv+YjZP/oped/6qfpf+uo6r/AIEAfv8AHDBX/xwxV/8eMlf/IDNY/yM0WP8nNlj/KjhY/y46Wf8zPVr/OkFc/0JGYP9MTmb/WVlv/2dlef93c4X/hoCR/5OMm/+dlaP/o5mm/6KYpP+dkp3/lIiT/4h9h/99cnv/dWpz/3JncP9zaXH/em94/4N5gf+NhIz/loyV/5uRmv8AgQB+/wASKVL/EylS/xQqUv8WKlH/GCtR/xorUP8dLFD/IC5P/yUwUP8rNFL/MzlV/z1BXP9KTGT/WVlv/2lme/94dIf/hYCR/4+ImP+Ti5r/komW/4uCjv+Ad4P/dGp1/2heaf9gVmD/XFJc/15UXv9kW2X/bmVv/3lwev+CeoT/iH+J/wCBAH7/AAwkT/8MJE//DSRO/w4kTf8PJEz/ESRL/xMkSf8WJUj/GidI/yAqSv8oME3/MzhU/z9CXP9OT2f/Xl1z/21qf/96doj/g32P/4eAkP+FfYz/fXSD/3Fodv9kW2j/WE5b/09FUf9LQk3/TERP/1NLVv9eVWH/aWFs/3Nrdv94cHv/AYEAfv8ACSFN/wkhTf8JIUz/CiFL/wsgSv8NIEj/DiBG/xEgRf8VIkT/GyVG/yIqSf8tMk//Oj1Y/0lKY/9YWG//aGV6/3RwhP99d4r/gHmK/312hv91bXz/aWFv/1tTYP9ORlP/RTxJ/0E4Rf9DOkf/SkJO/1VNWP9gWGT/amJu/29oc//vPeTSY57vlAAAAABJRU5ErkJggg==';

  public citiesForCarousel = signal<ICity[]>([]);
  private name: string;
  private curLang: string;
  private lSub: Subscription;
  private pageWrapScrollSub: Subscription;
  private cSub: Subscription;
  public appOpportunityMenu: Record<string, IOpportunityMenu> = {};

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
    private citiesService: CitiesService
    // private translateService: GoogleTranslationService
    // private cd: ChangeDetectorRef
  ) { super() }

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

    this.getCitiesForCarousel();

    // this.aboutThumbHash();
    // this.aboutProgressiveImage();
  }

  ngAfterViewInit(): void {
    this.ensureVideoPlays();
  }
  
  private getCitiesForCarousel(): void {
    this.cSub = this.citiesService.getCities().subscribe({
      next: value => {
        let cityList: any = value.map(el => el.cityList).flat();

        cityList.map(el => {
          if (el.imageList[0]?.metadata?.imageReference) {
            const hash = this.base64ToThumbHash(el.imageList[0]?.metadata?.imageReference);
            el.imageList[0].metadata.imageBase64 = this.thumbHashToDataURL(hash); // если пришел набор байтов
          }
        })

        this.citiesForCarousel.update(prevCities => [...prevCities, ...cityList, ...cityList]);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  // private async aboutThumbHash() {
  //   const originalURL = 'assets/images/restaurant(1.8mb).jpg';
  //   const binaryThumbHash = await this.getBinaryThumbHash(originalURL);
  //   console.log(binaryThumbHash); // [35, 73, 6, 22, 130, 9, 150, 72, 90, 116, 120, 176, 168, 73, 197, 54, 138, 86, 71, 113, 127, 4 , 247]

  //   // ThumbHash to data URL
  //   const placeholderURL = this.thumbHashToDataURL(binaryThumbHash);
  //   console.log(placeholderURL);
  //   console.log(this.thumbHashDemoImg);
  //   this.thumbHashDemoImg.nativeElement.style.background = `center / cover url(${placeholderURL})`;
  //   setTimeout(() => this.thumbHashDemoImg.nativeElement.src = originalURL, 500);
  // }

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
    this.cSub?.unsubscribe();
    this.removeAllListeners();
  }

}
