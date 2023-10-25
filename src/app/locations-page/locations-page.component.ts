import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer, Subscription, fromEvent, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { PagesService } from '@app/shared/services/pages.service';
import { langArr } from '@app/shared/constants/languages.constants';
import { LocationsService } from '@app/shared/services/locations.service';
import { Place } from '@app/shared/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnInit {

  public locations$: Observable<Place[]>;
  public locationsNew: any;
  public isLoading = true;
  private lSub: Subscription;
  private locationsSub: Subscription;
  private curLang: string;
  private pageWrapScrollSub: Subscription;
  public filterBarFixed = false;
  public filterBarGroup: FormGroup;
  public dropdownHeadForSort = '<div class="sortIcon"></div>Сортировка';
  public sortFieldOptions: DropdownOptions = {
    disabled: false,
    id: "sort",
    required: false,
    items: [
      { value: 'priceFromLeast', details: 'По цене $ → $$$' },
      { value: 'priceFromMost', details: 'По цене $$$ → $' },
      { value: 'rating', details: 'По рейтингу' },
    ],
  };

  @ViewChild('locationsWrapper') locationsWrapper: ElementRef;
  
  constructor(
    private pagesService: PagesService,
    public mobileDetectService: MobileDetectService,
    private locationsService: LocationsService
  ) { }

  ngOnInit(): void {
    this.lSub = this.pagesService.currentLanguage.subscribe(
      lang => {
        this.curLang = lang;
        if (!this.isLoading) {
          this.getAllLocations(true);
        }
      }
    );

    // this.createForm();
    this.getAllLocations();
    this.aboutProgressiveImage();
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
    const pageWrap = document.getElementById('pageWrap');
    // pageWrap.addEventListener('scroll', scroller, false);

    this.pageWrapScrollSub = fromEvent(pageWrap, 'scroll').subscribe(
      (el) => {
        const pageWrapScrollTop = el.target['scrollTop'];
        const locationsWrapperOffsetTop = this.locationsWrapper?.nativeElement.offsetTop;
        if (pageWrapScrollTop >= locationsWrapperOffsetTop) {
          this.filterBarFixed = true;
        } else {
          this.filterBarFixed = false;
        }
      }
    );

    function scroller(e) {
      console.log(pageWrap.scrollTop)
    }
  }

  private createForm(): void {

    // this.filterBarGroup = new FormGroup({
    //   sort: new FormControl({ value: 'rating', disabled: false }),
    // });
    this.filterBarGroup = new FormGroup({});

    this.filterBarGroup.valueChanges.subscribe(
      val => {
        this.onSortControlChange(val);
      }
    )

    this.filterBarGroup.addControl('sort', new FormControl({ value: null, disabled: false }));

  }

  private onSortControlChange(val: string): void {
    if (val['sort']) {
      this.dropdownHeadForSort = '<div class="sortIcon sortIcon--selected"></div>Сортировка';
    } else {
      this.dropdownHeadForSort = '<div class="sortIcon"></div>Сортировка';
    }
    this.sortLocationsList();
  }

  public get webview(): boolean {
    const result = navigator.userAgent.includes('Dazzlink');
    return result;
  }

  private sortLocationsList(): void {

    const sortControlVal = this.filterBarGroup?.get('sort')?.value;

    if (sortControlVal === 'priceFromLeast') {
      console.log('Сортируем от меньшего к большему');
      this.locationsNew.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return a.priceRange - b.priceRange;
          })
        }
      });
    } else if (sortControlVal === 'priceFromMost') {
      console.log('Сортируем от большего к меньшему');
      this.locationsNew.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return b.priceRange - a.priceRange;
          })
        }
      });
    } else if (sortControlVal === 'rating') {
      console.log('Сортируем по рейтингу');
      this.locationsNew.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return b.rating - a.rating;
          })
        }
      });
    }
  }

  private getAllLocations(afterChangeLang = false): void {
    this.isLoading = true;
    if (false) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('getAllLocations пошел');
        setTimeout(() => {
          console.warn('getAllLocations ок!');
          // observer.next({})
          // observer.next(null)
          observer.next(
            {
              "placeCount": 5,
              "cityPlaceList": [
                {
                  "cityCode": "Tashkent",
                  "cityName": "Ташкент",
                  "placeList": [
                    {
                      "id": "-NgTNTZzxh9cram2eEd2",
                      "categoryCode": "RESTAURANTS",
                      "title": "Чайхана Navat и еще очень много всего инетересного",
                      "subtitle": "Узбекская кухня",
                      "subcategory": "Бар",
                      "priceRange": 23,
                      "rating": 4.5,
                      "address": "ул. Ислама Каримова, 15",
                      "imageList": [
                        {
                          "type": null,
                          "href": 'assets/images/linkToArticlesX2.jpg'
                        }
                      ]
                    },
                    {
                      "id": "-NgVSDcz4AMZ_2JA8yMZ",
                      "title": "Кафе у Лидии",
                      "subtitle": "Русская кухня",
                      "subcategory": "Бистро",
                      "priceRange": 1,
                      "rating": 5,
                      "address": "ул. Гагарина, 37",
                    },
                    {
                      "id": "-NgYZORk7JcAD5y9fYvM",
                      "title": "Angry Birds",
                      // "subtitle": "Кавказская кухня",
                      "subcategory": "Кафе",
                      "priceRange": '2',
                      "rating": 3.98,
                      "address": "ул. Флерова, 4а",
                    },
                    {
                      "id": "-NgYZORk7JcAD5y9ffSl",
                      "title": "Люксор",
                      "subtitle": "Боевик",
                      "subcategory": "Кинотеатр",
                      "priceRange": '1',
                      "rating": 4,
                      "address": "ул. Трубецкая, 106",
                    },
                  ]
                },
                {
                  "cityCode": null,
                  "cityName": "Алматы",
                  "placeList": [
                    {
                      "id": "-NgVRC20Iit-rnFDKsza",
                      "categoryCode": "RESTAURANTS",
                      "title": "Старый город",
                      "subtitle": "Европейская",
                      "subcategory": "Ресторан",
                      "priceRange": 2,
                      "rating": 4.2,
                      "address": "проспект Ленина, 17",
                      "imageList": null
                    }
                  ]
                },
                {
                  "cityName": "Москва",
                  "placeList": []
                },
                {
                  "cityName": "Ереван",
                }
              ]
            }
          )
          // observer.error('Error')
        }, 1000)
      })

      stream$
        .subscribe(
          value => {
            this.locationsNew = value;
            if (afterChangeLang) {
              this.sortLocationsList();
            } else {
              this.createForm();
            }
            this.isLoading = false;
          },
          () => {
            this.locationsNew = null;
            this.isLoading = false;
          }
        );

    } else {
      this.locationsSub = this.locationsService.getAllLocations()
        .subscribe(
          value => {
            this.locationsNew = value;
            // console.log('Тут:', this.filterBarGroup)
            if (afterChangeLang && this.filterBarGroup) {
              this.sortLocationsList();
            } else {
              this.createForm();
            }
            this.isLoading = false;
          },
          () => {
            this.locationsNew = null;
            this.isLoading = false;
          }
        );
    }
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

  public getContent(key: string): string {
    return langArr[key][this.curLang];
  }

  public onChangeSort(sortValue: string): void {
    // console.log(sortValue);
  }

  public ngOnDestroy(): void {
    this.pageWrapScrollSub?.unsubscribe();
    this.lSub?.unsubscribe();
    this.locationsSub?.unsubscribe();
  }

}
