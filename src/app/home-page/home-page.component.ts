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
import { auditTime, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, NgStyle, NgTemplateOutlet, ViewportScroller } from '@angular/common';

import { langArr } from '@app/shared/constants/languages.constants';
import { PagesService } from '@app/shared/services/pages.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { GoogleTranslationService } from '@app/shared/services/google-translation.service';
import { AccoTriggerComponent } from '@app/shared/components/acco-trigger/acco-trigger.component';
import { ThumbHash } from '@app/shared/helpers/classes/thumbHash.class';
import { CitiesService } from '@app/shared/services/cities.service';
import { ICity } from '@app/shared/types/cities.interface';
import { ThumbHashImageComponent } from '@app/shared/components/thumb-hash-image/thumb-hash-image.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { FooterComponent } from '@app/shared/components/footer/footer.component';

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
    ThumbHashImageComponent,
    HeaderComponent,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent extends ThumbHash implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('advertisingVideo') advertisingVideo: ElementRef;
  // @ViewChild('thumbHashDemo') thumbHashDemoImg: ElementRef<HTMLImageElement>;

  public base64ForImg =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAXCAYAAABqBU3hAAAMEElEQVR4AQCBAH7/AKydnf+rnZz/qpub/6mamf+omZj/qJiX/6mYl/+qmJf/rJmY/62amP+umpj/r5qY/6+ZmP+vmZf/sJmY/7Gbmf+znZv/tqCe/7mjov+7p6X/vamo/72qqf+7qan/uKen/7SkpP+woaH/q52e/6iam/+lmJn/o5eY/6KWl/+ilpf/AIEAfv8Aqpyb/6mbmv+ompn/qJiY/6eYl/+ol5b/qZeW/6qYl/+smZf/rZmY/66amP+vmpj/r5mY/6+Zl/+wmpj/spuZ/7SenP+3oZ//uqWj/72op/+/q6r/wKyr/76sq/+8qqr/uKin/7SkpP+woaH/rJ6f/6mcnf+om5z/p5ub/6aam/8AgQB+/wCmmJj/ppiX/6aXlv+llpb/ppaV/6aWlf+olpX/qpeW/6yYl/+tmZj/rpqY/6+amP+vmZj/sJmX/7GamP+znJr/tp+d/7mjof+9p6X/wauq/8Ovrf/Esa//xLGw/8Kwr/++ra3/uqqq/7eoqP+zpaX/saSk/7Cjo/+voqP/rqKj/wCBAH7/AKKUlP+ilJT/opST/6OUk/+klJP/pZWU/6eWlf+pl5b/rJiX/62ZmP+vmpj/r5qY/7CZl/+wmZf/sZqY/7Sdmv+3oJ7/u6Wj/8CqqP/Fr63/yLOx/8q1tP/KtrX/yLW1/8W0s//CsbH/v6+u/7ytrf+6q6v/uaur/7irq/+4qqv/AIEAfv8AnpGQ/5+RkP+fkZD/oJGR/6KSkv+klJP/p5aV/6qXlv+smZf/rpqY/6+amP+vmpj/sJmX/7CZl/+ympj/tJ2a/7ihnv+9pqT/w6yp/8ixr//MtrT/zrm3/8+6uf/Ourn/y7m4/8i3tv/GtbT/w7Oy/8Gysv/BsrH/wLKx/8Cysf8AgQB+/wCbjo3/nI6O/52Pjv+fkJD/oZKR/6SUk/+ol5X/q5mX/62amf+vm5n/sJuZ/7CamP+wmZf/sJmW/7Gal/+0nJr/uaGe/76mpP/ErKr/yrKw/863tf/Ru7n/0r27/9G9u//Pu7r/zLm4/8m4tv/HtrX/xra1/8W1tf/FtrX/xba1/wCBAH7/AJmMjP+ajY3/nI6O/56QkP+ik5L/pZaV/6mZmP+sm5r/r5yb/7Ccm/+wnJr/sJqY/7CZl/+wmJb/sZmX/7Scmf+4oJ3/vqWj/8Ssqf/Ksq//zre0/9G6uP/SvLr/0by6/8+6uP/Mubf/yre1/8i2tP/HtbT/xrW0/8a2tP/HtrX/AIEAfv8AmIyM/5mNjf+bj4//n5KR/6OVlP+nmJj/q5ub/6+enf+xn53/sp+d/7KdnP+xm5n/sJmX/6+Ylv+wmJb/s5uY/7efnP+9pKH/w6qo/8iwrf/NtbL/z7i1/8+5tv/OuLb/zLa0/8m0sv/Gs7H/xbKw/8SxsP/EsrD/xLKx/8Szsf8AgQB+/wCXjI3/mY6O/5uQkP+fk5T/pJeX/6mbm/+tnp7/saGg/7Oiof+zoaD/s5+e/7Gdm/+wmpj/r5iW/7CYlv+ympj/tp6b/7yjoP/Bqab/x66r/8qyr//MtLL/zLWy/8qzsf/Hsa//xK6s/8Gsqv+/q6n/v6up/7+sqv/Arav/wK2s/wCBAH7/AJaMjv+Xjo//m5GS/5+Vlf+kmZr/qZ2e/66hof+yo6P/tKSj/7Sjov+zoaD/sp6d/7Cbmv+vmZf/sJmX/7Kbmf+2n5z/vKOh/8Gppv/Frav/yLCu/8mxr//Isa7/xa6s/8Grqf++qKb/u6ak/7qlo/+6pqT/uqel/7uopv+8qKf/AIEAfv8AkouN/5SNj/+YkJL/nZSW/6OZm/+onp//raKj/7Gkpf+zpaX/tKSk/7Oiov+yn57/sJ2b/7Cbmv+xm5n/s52b/7ihn/+9paP/wqqo/8aurP/IsK7/yLCu/8WurP/Cq6n/vael/7qkov+3oqD/tqGf/7aioP+3o6H/uaWj/7qmpP8AgQB+/wCNiIv/j4qN/5ONkP+YkpT/npeZ/6Scnv+qoKL/rqOl/7Ckpf+xpKT/saKi/7CgoP+wnp3/sJ2c/7Kenf+2oJ//uqSj/8CpqP/Frqz/yLGv/8mysP/Isa//xa6s/8CqqP+7paP/t6Kg/7Wgnv+0oJ7/tqGg/7ikov+6pqT/u6em/wCBAH7/AISChv+GhIj/ioiM/5CMkP+WkpX/nZea/6Ocn/+nn6L/q6Gj/6yho/+toKH/rZ+g/66en/+wnp//s6Gg/7ikpP++qan/xK6t/8izsv/LtrT/zLa1/8q0sv/GsK7/wKup/7umpf+3o6H/tqGg/7aioP+4pKP/u6em/76qqf+/rKv/AIEAfv8AeHl//3p7gf9/f4T/hISJ/4uJjv+Sj5T/mJSY/52Ym/+hmp3/pJue/6abnv+onJ7/qp2e/66foP+zo6P/uqio/8Curv/HtLT/zLi4/8+7uv/Purr/zLe3/8eysv/Braz/vKin/7iko/+3pKP/uKWk/7ypqP/Araz/xLGw/8azs/8AgQB+/wBqbnX/bHB3/3B0e/92eX//fX6F/4SEiv+KiY//kI2S/5WQlf+Zkpf/nJSY/6CWmf+kmZz/qp2f/7Gjpf+5qqv/wrGy/8m4uP/OvL3/0b6//9C9vv/Nubr/x7S0/8Gurf+7qKj/uKWl/7ilpf+6qKj/v62t/8Szs//JuLj/zLu6/wCBAH7/AFpiav9cY2z/YGdv/2ZsdP9scXn/c3Z+/3p8g/+AgIf/hYSK/4qHjP+Pio//lI2S/5uSlv+jmZz/rKCj/7aprP/AsbT/yLi7/829v//Qv8D/zr2+/8q4uf/DsrP/vaus/7empv+0o6T/taSk/7moqP+/rq//xrW2/8y7vP/Pv7//AIEAfv8ASlVf/0xWYP9PWWP/VF5n/1pibP9haHD/Z2x1/21xef9zdXz/eXmA/399g/+Ggoj/j4mO/5mRlv+kmp//r6So/7qusf/Dtbn/yLq9/8q7vv/IuLv/wrO1/7urrf+zo6X/rp6f/6ubnf+tnZ//sqKk/7mqrP/CsrT/ybq7/8y+v/8AgQB+/wA6SFP/PElV/z9MV/9DUFv/SVRf/09YY/9VXWf/W2Fq/2Flbv9naXL/bm52/3Z1fP+AfYP/i4aM/5iRl/+knKH/sKar/7musv++srb/v7O2/7yvsv+1p6v/rZ+i/6WWmf+fkJP/nI6R/56Qk/+ll5n/rqCi/7eprP+/sbT/w7a4/wCBAH7/ACw9Sv8tPkv/MEBN/zRDT/84RlL/PUpV/0NNWf9IUVz/TlVf/1RZY/9cX2j/ZWZu/3Bvd/99eoH/ioWM/5eRl/+jm6H/rKOo/7GnrP+xpqr/rKGl/6SYnP+ajpL/kYWI/4t+gv+IfH//i3+C/5KGif+ckJP/p5qe/6+jpv+0qKv/AIEAfv8AIDRC/yE1Qv8kNkT/JzhG/yo7SP8uPUr/M0BM/zhDT/89RlH/Q0tV/0tQWv9VWGH/YGFq/21sdf97eYD/iYWM/5WPlv+dlpz/oZmf/6CXnP+akJX/kYaL/4Z7f/97cHX/dGlt/3Jna/91am7/fXJ2/4h8gP+TiIz/nJGV/6KXm/8AgQB+/wAXLTz/GC08/xouPf8cMD7/HzE//yIzQf8mNUL/KjdE/y86Rv81Pkn/PURO/0ZLVf9SVV//YGBp/25tdf98eYH/h4OK/4+JkP+Si5L/kIiO/4mAhv9+dXr/cmht/2ddYv9fVVr/XVJX/2BVWv9oXmL/c2lu/391ev+Jf4T/j4WJ/wCBAH7/ABIoOP8SKTj/Eyk4/xUqOf8XKzr/Giw6/x0tO/8gLzz/JTE+/ys1Qf8yOkb/PEJN/0hMVv9VV2H/ZGRs/3FveP98eYH/hH+G/4aAh/+DfIP/e3N5/29nbf9iWV//Vk1T/05FSv9LQkf/T0VK/1dOU/9jWl7/b2Zr/3pwdf9/dnv/AYEAfv8ADyY2/w8mNv8QJzb/Eic2/xQoN/8WKDf/GCk3/xsqOP8gLTr/JTA8/y01Qf82PUj/QkdR/1BSXP9eXmj/a2pz/3d0fP9+eYH/gHqB/3x1fP9zbHL/Z19l/1lRV/9NRUr/RTxC/0I5Pv9FPEL/TkVK/1pRVv9mXWP/cWht/3duc/+Nk+T6WMIKhAAAAABJRU5ErkJggg==";

  public citiesForCarousel = signal<ICity[]>([]);
  private name: string;
  private curLang: string;
  private lSub: Subscription;
  private pageWrapScrollSub: Subscription;
  private pageScrollSub: Subscription;
  private prewScrollTop = 0;
  public hideHeader = signal(true);
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
    private citiesService: CitiesService,
    private vc: ViewportScroller
    // private cd: ChangeDetectorRef
    // private translateService: GoogleTranslationService
  ) { super() }

  // @HostListener('window:load', [])
  // onWindowLoad() {
  //   console.log('onWindowLoad');
  // }

  public ngOnInit(): void {

    // this.lSub = this.pagesService.currentLanguage.pipe(
    //   tap(lang => this.curLang = lang),
    //   // switchMap(lang => this.translateService.translate(lang, ['Семья начинается с нас']))
    // ).subscribe(
    //   resp => {
    //     // console.log(resp);
    //     // this.cd.detectChanges();
    //   }
    // )

    this.getCitiesForCarousel();

    // this.aboutThumbHash();
    // this.aboutProgressiveImage();
  }

  ngAfterViewInit(): void {
    this.ensureVideoPlays();
    this.addEventListenerToPage();
  }

  public get productName(): string {
    // console.log('home page render!');
    return 'Dazzlink';
  }

  private addEventListenerToPage(): void {
    this.pageScrollSub = fromEvent(window, 'scroll')
      .pipe(
        auditTime(200)
      )
      .subscribe({
        next: () => {
          this.operatePageScroll();
        }
      });
  }

  private operatePageScroll() {
    const [curScrollLeft, curScrollTop] = this.vc.getScrollPosition();
    // console.log('cur:', curScrollTop);
    // console.log('prev:', this.prewScrollTop);
    if (curScrollTop > this.prewScrollTop || curScrollTop < 100) {
      if (curScrollTop < 100) {
        if (curScrollTop === 0) {
          // console.log('Скрываем header');
          this.hideHeader.set(true);
        }
      } else {
        // console.log('Скрываем header');
        this.hideHeader.set(true);
      }
    } else {
      // console.log('Показываем header');
      this.hideHeader.set(false);
    }
    this.prewScrollTop = curScrollTop;
    // this.cd.detectChanges();
  }
  
  private getCitiesForCarousel(): void {
    this.cSub = this.citiesService.getCities().subscribe({
      next: value => {
        let cityList: any = value.map(el => el.cityList).flat();

        cityList.map(el => {
          if (el.imageList[0]?.metadata?.imageReference) {
            const hash = this.base64ToThumbHash(el.imageList[0]?.metadata?.imageReference);
            el.imageList[0].metadata.imageBase64 = this.thumbHashToDataURL(hash);
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
  //   const originalURL = 'assets/images/team-page/mainPic.png';
  //   const binaryThumbHash = await this.getBinaryThumbHash(originalURL);
  //   console.log(binaryThumbHash); // [35, 73, 6, 22, 130, 9, 150, 72, 90, 116, 120, 176, 168, 73, 197, 54, 138, 86, 71, 113, 127, 4 , 247]

  //   // ThumbHash to data URL
  //   const placeholderURL = this.thumbHashToDataURL(binaryThumbHash);
  //   console.log(placeholderURL);
  //   console.log(this.thumbHashDemoImg);
  //   this.thumbHashDemoImg.nativeElement.style.background = `center / cover url(${placeholderURL})`;
  //   setTimeout(() => this.thumbHashDemoImg.nativeElement.src = originalURL, 2000);
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
    this.pageScrollSub?.unsubscribe();
    this.lSub?.unsubscribe();
    this.cSub?.unsubscribe();
    this.removeAllListeners();
  }

}
