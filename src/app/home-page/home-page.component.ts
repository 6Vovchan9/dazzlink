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
import { ThumbHashImageComponent } from '@app/shared/components/thumb-hash-image/thumb-hash-image.component';

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
    ThumbHashImageComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent extends ThumbHash implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('advertisingVideo') advertisingVideo: ElementRef;
  // @ViewChild('thumbHashDemo') thumbHashDemoImg: ElementRef<HTMLImageElement>;

  public base64ForImg =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAXCAYAAABqBU3hAAAMEElEQVR4AQCBAH7/ALCiof+voaD/rZ+e/6ucnP+pmpn/qJiX/6iWlf+olpX/qJWU/6mVlP+qlZT/q5WU/6uWlP+slpT/rpiW/7CamP+0npz/uKKg/7ympf+/qqn/wa2s/8Gurf/Ara3/vKuq/7enp/+xoqL/rJ2e/6eZmv+jlpf/oJSV/56Sk/+dkpP/AIEAfv8ArqCg/62fnv+snZ3/qpua/6iZmP+nl5b/p5aV/6eVlP+olZT/qZWU/6qVlP+rlZT/q5aU/6yWlf+umJb/sZuZ/7Wenf+5o6H/vaim/8Gsq//Dr67/xLGw/8OwsP+/rq3/u6qq/7Wmpv+woaH/q52e/6eam/+kmJn/o5eY/6KWl/8AgQB+/wCrnZz/qpyb/6mamv+omJj/p5eW/6aWlf+mlZT/p5WU/6iVlP+plZT/qpWU/6uVlP+slpT/rZaV/6+Ylv+ym5n/tp+e/7ulo//Aqqj/xa+u/8izsv/JtbT/yLW0/8Wzsv/BsK//vKys/7eoqP+ypKT/r6Gi/6yfoP+rnp//qp6e/wCBAH7/AKeZmP+mmJj/ppeW/6WWlf+llZT/pZST/6aUk/+nlZP/qJWT/6mVlP+qlZT/q5WT/6yWlP+tlpT/r5iW/7Ocmv+4oZ//vaak/8Otq//IsrH/zLe1/866uP/Ourn/zLm4/8i2tf/Ds7L/v6+v/7usrP+4qan/taio/7Snp/+zpqb/AIEAfv8Ao5WU/6OVlP+ilJT/o5ST/6OTk/+klJP/pZST/6eVlP+olZT/qpaU/6qWlP+rlZP/rJWT/62WlP+wmJb/tJya/7mhn/+/qKX/xq+s/8y1s//Qurj/0728/9O/vf/Rvrz/zru6/8q4t//GtbT/wrKx/7+wr/+9rq7/vK6t/7ytrf8AgQB+/wCgkpL/oJKS/6CSkv+hk5L/opOS/6SUk/+mlZT/qJaV/6qXlf+rl5X/q5aU/6uWlP+slZP/rZaU/7CYlf+0nJn/uaGf/8Copf/Hr63/zba0/9K8uf/Vv73/1sG//9TAvv/Rvrz/zru6/8q4t//GtbT/xLOy/8Kysf/BsrH/wbGx/wCBAH7/AJ2RkP+ekZH/n5KR/6GTkv+jlJP/pZaV/6iXlv+qmJf/q5mX/6yYl/+sl5X/rJaU/6yVk/+tlZP/r5eV/7ObmP+5oJ7/wKel/8evrP/NtrP/0ru5/9W/vP/WwL7/1L+9/9G9u//Ourj/yre1/8e1s//Fs7L/w7Kx/8Kysf/CsrD/AIEAfv8AnJCQ/52Rkf+fkpL/oZSU/6SWlv+nmJf/qpqZ/6ybmv+tm5r/rpqZ/62Zl/+sl5X/rJaT/6yVk/+ul5T/spqX/7ifnf+/pqP/xq2q/8y0sf/Rubb/07y6/9S9u//SvLn/zrm3/8q2tP/Hs7H/xLCv/8Kvrf/Brq3/wK6t/8Curf8AgQB+/wCbkZH/nJGS/5+TlP+ilpb/pZiY/6mbm/+snZz/rp6d/6+enf+vnZz/rpuZ/62Yl/+slpT/rJWT/66XlP+ympf/t5+c/76lov/ErKn/yrKv/8+2tP/Qubb/0Lm2/823tP/Js7H/xbCu/8Gtq/++qqj/vamn/7ypp/+8qaf/vKmn/wCBAH7/AJqRkv+bkpP/npSV/6GXmP+lmpv/qZ2d/62fn/+voaD/sKCg/7Cfnv+vnZv/rZqY/6yXlv+slpX/rpeV/7KamP+3n53/vaWj/8Ssqf/Jsa7/zbWy/862s//MtbL/ybKv/8Suq/+/qqf/u6ak/7mkov+3o6H/t6Oh/7ekov+3pKL/AIEAfv8Al5CS/5iRk/+bk5X/n5eY/6SanP+onp//rKCh/6+iov+woqL/sKCg/6+enf+tm5r/rJmY/62Yl/+vmZj/s5yb/7ihn/+/p6X/xa2r/8qyr//MtLL/zLWy/8mysP/Frqz/wKqn/7ulo/+3oqD/taCe/7Sgnv+0oJ7/taGf/7WioP8AgQB+/wCRjI//k46R/5aQk/+alJf/n5ia/6Scnv+on6H/q6Ci/62hov+tn6D/rZ6e/6ybm/+smpr/rZqZ/7Ccm/+1oJ7/u6Wk/8Krqf/Isa//zLWz/822tP/MtbP/ybKw/8Stq/++qKb/uaOh/7Wgnv+zn53/s5+d/7Sgn/+2oqD/tqOh/wCBAH7/AIiGi/+KiIz/jouP/5KPkv+Xk5b/nZea/6Ganf+lnJ//p52f/6idnv+pm53/qZqb/6qam/+tm5z/sZ+f/7eko/++qqn/xbCv/8u2tf/Pubj/0Lq5/864t//KtLP/xK6t/76pp/+5pKP/tqGg/7Whn/+2oqD/uKSj/7qmpf+7qKf/AIEAfv8AfX6D/35/hf+Cgoj/h4aL/4yLj/+Sj5P/l5KX/5uVmf+elpr/oJea/6KXmv+kl5n/p5ma/6ucnf+xoaL/uaeo/8Gvr//Jtrb/z7u7/9O+vv/Tv77/0Ly7/8u3tv/FsK//v6qp/7qmpf+3pKP/t6Sj/7qnpv+9qqn/wK2s/8Kvrv8AgQB+/wBuc3r/cHR7/3R3fv94e4L/fn+G/4OEiv+JiI3/jYuQ/5GNkf+UjpL/mJCT/5uSlf+glZj/p5qd/6+ho/+5qav/wrKz/8u5uv/Rv8D/1cLD/9XCwv/Rvr7/y7i4/8Sxsf++q6v/uaen/7ilpf+5p6f/vaur/8Gvr//FtLT/yLa2/wCBAH7/AF5mbv9gZ3D/Y2py/2hudv9tcnr/c3Z+/3h6gf99fYT/goCG/4aDiP+LhYv/kImO/5eOk/+glpn/qp6h/7Woq//AsrT/yrq8/9DAwv/Tw8T/08HD/869vv/Itrf/wK+v/7qoqf+2pKX/taSl/7inp/+9rK3/wrKz/8i3uP/Lurv/AIEAfv8ATllj/1BaZP9TXWb/V2Bp/1xkbf9hZ3D/Zmtz/2tudv9wcXn/dXV8/3t5f/+CfoT/i4WK/5aOk/+imJ3/rqSo/7qusv/Et7r/y73A/86/wf/Mvb//x7e5/7+vsf+3p6n/sKCi/62dn/+tnZ//saGj/7eoqf++r7H/xba3/8i5u/8AgQB+/wA+TFj/QE1Z/0JPW/9GUl3/SlVg/05YYv9TW2X/WF5o/11hav9jZW3/ampy/3JweP98eYD/iIOJ/5aPlf+km6H/saer/7uwtP/Btbn/w7a6/8Cztv+6rK//saOm/6ianf+hk5b/npCS/5+Rk/+klpj/q52g/7SmqP+7rbD/v7K0/wCBAH7/ADBBTv8xQk//M0NQ/zZFUv86R1P/PUpV/0FMV/9GTln/SlFc/1BVX/9YW2T/YWJq/2xrc/96d37/iIOK/5eQl/+knKL/rqWq/7Sqr/+0qq7/sKWp/6icoP+ekpb/lYiM/42BhP+KfYH/i3+C/5GFiP+ajpH/o5ea/6ufov+wpKf/AIEAfv8AJThG/yU5Rv8nOUf/KTpI/ys8Sf8uPUr/MT5L/zVATP85Q07/P0ZR/0dMVv9QVF3/XF1m/2ppcv95d37/iISL/5WQlv+fmJ7/pJyi/6SaoP+elJn/lYqP/4p/g/9/dHj/d2xw/3RobP91am7/fHF0/4V6fv+QhYn/mI2R/52Slv8AgQB+/wAcMUD/HDFA/x0yQP8fMkD/IDJA/yIzQP8kM0H/JzVB/ys2Qv8xOkX/OD9K/0JHUf9OUVv/XV1m/2xrc/97eID/iIOL/5GLkv+VjpX/lIyS/42Eiv+CeX7/dmxx/2pgZf9iWFz/XlRZ/2BWWv9nXWH/cWdr/3xydv+Fe4D/ioCF/wCBAH7/ABYtPP8WLTz/Fy08/xgsO/8YLDv/Giw6/xssOf8eLDn/IS46/yYxPf8uNkH/OD5I/0RIUv9SVF7/YmJr/3Fvd/99eoL/hoGI/4mDiv+HgIb/f3d+/3Nrcf9mXWP/WlFW/1FITf9NREn/T0VL/1ZNUv9hV1z/bGNo/3Zscf97cnf/AYEAfv8AEyo6/xMqOv8TKjn/FCk5/xUpOP8VKDf/Fyg2/xkoNf8cKTb/ISw4/ygxPf8yOUT/PkNN/01PWf9cXWb/a2py/3d0ff+Ae4P/g32E/4B5gP93cHf/a2Nq/15VW/9RSE7/SD9E/0Q7QP9GPEL/TURJ/1dPVP9jWl//bWRp/3Jqb//KneTuVwGZAgAAAABJRU5ErkJggg==";

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
    this.lSub?.unsubscribe();
    this.cSub?.unsubscribe();
    this.removeAllListeners();
  }

}
