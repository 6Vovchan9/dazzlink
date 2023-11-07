import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer, Subscription, fromEvent, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { PagesService } from '@app/shared/services/pages.service';
import { langArr } from '@app/shared/constants/languages.constants';
import { LocationsService } from '@app/shared/services/locations.service';
import { Place } from '@app/shared/interfaces';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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
  public isSorting = false;
  private lSub: Subscription;
  private locationsSub: Subscription;
  private curLang: string;
  private pageWrapScrollSub: Subscription;
  public filterBarFixed = false;
  public filterBarGroup: UntypedFormGroup;
  public allSelectedСities = 0;
  public dropdownHeadForSort = `
    <div class="headInSortDropdown">
      <div class="headInSortDropdown__icon"></div>
      <div class="headInSortDropdown__text">Сортировка</div>
    </div>
  `;
  public sortFieldOptions: DropdownOptions = {
    disabled: false,
    id: "sort",
    required: false,
    items: [
      { value: '+price', details: 'По цене $ → $$$' },
      { value: '-price', details: 'По цене $$$ → $' },
      { value: '-rating', details: 'По рейтингу' },
    ],
  };
  public filterFieldOptions = [
    {
      title: 'Узбекистан',
      valueList: [
        {
          name: 'Ташкент',
          value: 'Tashkent',
          count: 42
        },
        {
          name: 'Наманган',
          value: 'Namangan',
          count: 2,
        },
        {
          name: 'Самарканд',
          value: 'Samarkand',
          count: 32
        },
        {
          name: 'Андижан',
          value: 'Andizhan',
          count: 62
        },
        {
          name: 'Нукус',
          value: 'Nukus',
          count: 47
        },
        {
          name: 'Коканд',
          value: 'Kokand',
          count: 1
        },
        {
          name: 'Бухара',
          value: 'Buhara',
          count: 46
        },
        {
          name: 'Карши',
          value: 'Karshi',
          count: 49
        },
        {
          name: 'Фергана',
          value: 'Fergana',
          count: 40
        },
        {
          name: 'Маргилан',
          value: 'Margilan',
          count: 81
        }
      ]
    },
    {
      title: 'Казахстан',
      valueList: [
        {
          name: 'Алматы',
          value: 'Almati',
          count: 62
        },
        {
          name: 'Астана',
          value: 'Astana',
          count: 4
        },
        {
          name: 'Шымкент',
          value: 'Shimkent',
          count: 83
        },
        {
          name: 'Актобе',
          value: 'Aktobe',
          count: 44
        },
        {
          name: 'Караганда',
          value: 'Karaganda',
          count: 49
        },
        {
          name: 'Тараз',
          value: 'Taraz',
          count: 24
        },
        {
          name: 'Усть-Каменогорск',
          value: 'Kamen',
          count: 70
        },
        {
          name: 'Павлодар',
          value: 'Pavlodar',
          count: 89
        }
      ]
    }
  ]

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
          const sortControlVal = this.filterBarGroup?.get('sort')?.value;
          this.getAllLocations(true, sortControlVal);
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
    //   sort: new FormControl({ value: '-rating', disabled: false }),
    // });
    this.filterBarGroup = new UntypedFormGroup({});

    // this.filterBarGroup.valueChanges.subscribe(
    //   val => {
    //     this.onSortControlChange(val);
    //   }
    // )

    this.filterBarGroup.addControl('sort', new UntypedFormControl({ value: null, disabled: false }));

  }

  private onSortControlChange(val: string): void {
    if (val['sort']) {
      this.dropdownHeadForSort = `
        <div class="headInSortDropdown">
          <div class="headInSortDropdown__icon headInSortDropdown__icon--selected"></div>
          <div class="headInSortDropdown__text">Сортировка</div>
        </div>
      `;
    } else {
      this.dropdownHeadForSort = `
        <div class="headInSortDropdown">
          <div class="headInSortDropdown__icon"></div>
          <div class="headInSortDropdown__text">Сортировка</div>
        </div>
      `;
    }
    this.sortLocationsList();
  }

  public get webview(): boolean {
    const result = navigator.userAgent.includes('Dazzlink');
    return result;
  }

  private sortLocationsOnBackend() {
    const sortControlVal = this.filterBarGroup?.get('sort')?.value;

    this.getAllLocationsAfterSort(sortControlVal);
  }

  private sortLocationsList(): void {

    const sortControlVal = this.filterBarGroup?.get('sort')?.value;

    if (sortControlVal === '+price') {
      console.log('Сортируем от меньшего к большему');
      this.locationsNew.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return a.priceRange - b.priceRange;
          })
        }
      });
    } else if (sortControlVal === '-price') {
      console.log('Сортируем от большего к меньшему');
      this.locationsNew.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return b.priceRange - a.priceRange;
          })
        }
      });
    } else if (sortControlVal === '-rating') {
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

  private getAllLocations(afterChangeLang = false, sortVal?: string): void {
    this.isLoading = true;
    if (true) {
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
                      "imageList": [
                        {
                          "type": null,
                          "href": 'https://store.rosbank.ru/static/images/dbo/range_rover.png'
                        }
                      ]
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
        }, 2000)
      })

      stream$
        // .pipe(
        //   delay(1000)
        // )
        .subscribe(
          value => {
            this.locationsNew = value;
            if (afterChangeLang && this.filterBarGroup) {
              // this.sortLocationsList();
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
      this.locationsSub = this.locationsService.getAllLocations(sortVal)
        .pipe(
          delay(2000)
        )
        .subscribe(
          value => {
            this.locationsNew = value;
            if (afterChangeLang && this.filterBarGroup) {
              // this.sortLocationsList();
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

  private getAllLocationsAfterSort(sortVal?: string): void {
    if (true) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('getAllLocationsAfter пошел');
        setTimeout(() => {
          console.warn('getAllLocationsAfter ок!');
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
                      "imageList": [
                        {
                          "type": null,
                          "href": 'https://store.rosbank.ru/static/images/dbo/range_rover.png'
                        }
                      ]
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
        }, 3000)
      })

      stream$
        // .pipe(
        //   delay(1000)
        // )
        .subscribe(
          value => {
            this.locationsNew = value;
            this.filterBarGroup.get('sort').enable();
            this.setIconForSortDropdown(sortVal);
            this.isSorting = false;
          },
          () => {
            this.filterBarGroup.get('sort').enable();
            this.isSorting = false;
            // Нужно будет как ниб показать сообщ о том что не удалось отсортировать локации
          }
        );

    } else {
      this.locationsSub = this.locationsService.getAllLocations(sortVal)
        .pipe(
          delay(3000)
        )
        .subscribe(
          value => {
            this.locationsNew = value;
            this.filterBarGroup.get('sort').enable();
            this.setIconForSortDropdown(sortVal);
            this.isSorting = false;
          },
          () => {
            this.filterBarGroup.get('sort').enable();
            this.isSorting = false;
            // Нужно будет как ниб показать сообщ о том что не удалось отсортировать локации
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
    this.isSorting = true;
    this.filterBarGroup.get('sort').disable();
    this.sortLocationsOnBackend();
  }

  private setIconForSortDropdown(sortValue: string): void {
    if (sortValue) {
      this.dropdownHeadForSort = `
        <div class="headInSortDropdown">
          <div class="headInSortDropdown__icon headInSortDropdown__icon--selected"></div>
          <div class="headInSortDropdown__text">Сортировка</div>
        </div>
      `;
    } else {
      this.dropdownHeadForSort = `
        <div class="headInSortDropdown">
          <div class="headInSortDropdown__icon"></div>
          <div class="headInSortDropdown__text">Сортировка</div>
        </div>
      `;
    }
  }

  public ngOnDestroy(): void {
    this.pageWrapScrollSub?.unsubscribe();
    this.lSub?.unsubscribe();
    this.locationsSub?.unsubscribe();
  }

  private onSelectCity(linkToCountry: any, linkToCity: any): void {
    const curVal = linkToCity.selected;
    if (curVal) {
      console.log('Отжали какойто город');
      linkToCity.selected = false;
      linkToCountry.selectedСities -= 1;
      this.allSelectedСities -= 1;
    } else {
      console.log('Выбрали еще какойто город');
      linkToCity.selected = true;
      if (!linkToCountry.selectedСities) {linkToCountry.selectedСities = 0};
      linkToCountry.selectedСities += 1;
      this.allSelectedСities += 1;
    }
  }

  private getAmountOfAllSelectedCities(): string {
    return this.allSelectedСities ? `Показан ${this.allSelectedСities} из 20 городов` : 'Показаны все города'
  }

}
