import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer, Subscription, fromEvent, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { PagesService } from '@app/shared/services/pages.service';
import { langArr } from '@app/shared/constants/languages.constants';
import { LocationsService } from '@app/shared/services/locations.service';
import { CountryFilterItem, Place } from '@app/shared/interfaces';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  private FSub: Subscription;
  private curLang: string;
  private pageWrapScrollSub: Subscription;
  public filterBarFixed = false;
  public filterBarGroup: UntypedFormGroup;
  public amountAllSelectedCities: Array<string> = [];
  private timerForFilter: any;
  public showFilterControls = false;
  public errorAfterSort = false;
  private lastSuccessSortVal: string = null;
  public dropdownHeadForSort = `
    <div class="headInSortDropdown">
      <div class="headInSortDropdown__icon sortIcon"></div>
      <div class="headInSortDropdown__text">Сортировка</div>
    </div>
  `;
  public sortFieldOptions: DropdownOptions = {
    disabled: false,
    id: "sort",
    required: false,
    items: [
      // { value: '+price', details: 'По цене $ → $$$' },
      // { value: '-price', details: 'По цене $$$ → $' },
      // { value: '-rating', details: 'По рейтингу' },
    ],
  };
  public filterFieldOptions: Array<CountryFilterItem>;

  @ViewChild('locationsWrapper') locationsWrapper: ElementRef;
  
  constructor(
    private pagesService: PagesService,
    public mobileDetectService: MobileDetectService,
    private locationsService: LocationsService
  ) { }

  clickByMybtn1() {
    console.log(this.filterBarGroup);
    console.log(this.filterFieldOptions);
  }

  clickByMybtn2() {

    // this.filterFieldOptions.forEach(country => {
    //   country.cityList.forEach(city => delete city.selected);
    //   delete country.selectedСities;
    // });
    this.amountAllSelectedCities = [];
    this.filterFieldOptions = null;
    this.showFilterControls = false;

    // this.filterBarGroup.get('sort').reset(null, { emitEvent: false });
  }

  clickByMybtn3() {
    this.filterBarGroup.get('sort').enable();
  }

  ngOnInit(): void {
    this.lSub = this.pagesService.currentLanguage.subscribe(
      lang => {
        this.curLang = lang;
        if (!this.isLoading) {

          // Строки ниже это для сброса всего связанного с фильтрацией
          // this.filterFieldOptions.forEach(country => {
          //   country.cityList.forEach(city => delete city.selected);
          //   delete country.selectedСities;
          // });
          this.filterFieldOptions = null;
          this.amountAllSelectedCities = [];
          this.showFilterControls = false;

          // Ниже 4 строки это для сброса всего связанного с FormControl-ом сортировки
          this.filterBarGroup.get('sort').setValue(null, { emitEvent: false });
          this.setIconForSortDropdown(null);
          this.sortFieldOptions.items = [];
          this.filterBarGroup.get('sort').disable({ emitEvent: false });

          this.getSort();
          this.getFilters();
          this.getAllLocations();
        }
      }
    );

    this.createForm();
    this.getSort();
    this.getFilters();
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
    this.filterBarGroup = new UntypedFormGroup({
      // filter: new FormGroup({
      //   Узбекистан: new FormGroup({
      //     Tashkent: new FormControl(true, Validators.requiredTrue),
      //     Namangan: new FormControl(false, Validators.requiredTrue),
      //     Samarkand: new FormControl(true, Validators.requiredTrue)
      //   }),
      //   Казахстан: new FormGroup({
      //     Almati: new FormControl(true, Validators.requiredTrue),
      //     Astana: new FormControl(true, Validators.requiredTrue),
      //     Shimkent: new FormControl(true, Validators.requiredTrue),
      //     Pavlodar: new FormControl(false, Validators.requiredTrue),
      //   })
      // })
    });

    // this.filterBarGroup.valueChanges.subscribe(
    //   val => {
    //     this.onSortControlChange(val);
    //   }
    // )

    this.filterBarGroup.addControl('sort', new UntypedFormControl({ value: null, disabled: true }));

    this.filterBarGroup.get('sort').valueChanges.subscribe(
      val => {
        this.onChangeSort(val);
      }
    );

  }

  private onSortControlChange(val: string): void {
    if (val['sort']) {
      this.dropdownHeadForSort = `
        <div class="headInSortDropdown">
          <div class="headInSortDropdown__icon sortIcon sortIcon--selected"></div>
          <div class="headInSortDropdown__text">Сортировка</div>
        </div>
      `;
    } else {
      this.dropdownHeadForSort = `
        <div class="headInSortDropdown">
          <div class="headInSortDropdown__icon sortIcon"></div>
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
    const filterString = this.amountAllSelectedCities.join(',').toLowerCase();

    this.getAllLocationsAfterSort(sortControlVal, filterString);
  }

  private filterLocationsOnBackend() {
    const sortControlVal = this.filterBarGroup?.get('sort')?.value;
    const filterString = this.amountAllSelectedCities.join(',').toLowerCase();

    this.getAllLocationsAfterFilter(sortControlVal, filterString);
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

  private getSort(): void {
    if (true) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('getSort пошел');
        setTimeout(() => {
          console.warn('getSort ок!');
          // observer.next({})
          // observer.next(null)
          if (this.curLang === 'UZ') {
            observer.error('Error');
          } else {
            observer.next(
              [
                { code: '+price', name: 'По цене $ → $$$' },
                { code: '-price', name: 'По цене $$$ → $' },
                { code: '-rating', name: 'По рейтингу' }
              ]
            )
          }
        }, 2000)
      })

      stream$
        .pipe(
          map(resp => {
            if (resp.length) {
              resp = resp.map(el => {
                const res = {
                  details: el.name,
                  value: el.code
                }
                return res;
              })
            }
            return resp;
          })
        )
        .subscribe(
          value => {
            if (value.length) {
              this.filterBarGroup.get('sort').enable({ emitEvent: false });
              this.sortFieldOptions.items = value;
            } else {
              console.log('Список сортировки пришел пустой');
            }
          },
          () => {
            console.error('Ошибка при получении сортировки');
          }
        );
    } else {
      this.FSub = this.locationsService.getSortOptions()
        .pipe(
          map((resp: Array<{ name?: string, code?: string, details?: string, value?: string }>) => {
            if (resp.length) {
              resp = resp.map(el => {
                const res = {
                  details: el.name,
                  value: el.code
                }
                return res;
              })
            }
            return resp;
          })
        )
        .subscribe(
          (value: Array<{ details: string, value: string }>) => {
            if (value.length) {
              this.filterBarGroup.get('sort').enable({ emitEvent: false });
              this.sortFieldOptions.items = value;
            } else {
              console.log('Список сортировки пришел пустой');
            }
          },
          () => {
            console.error('Ошибка при получении сортировки');
          }
        );
    }
  }

  private getFilters(): void {
    if (true) {
      const stream$ = new Observable((observer: Observer<Array<CountryFilterItem>>) => {
        console.warn('getFilter пошел');
        setTimeout(() => {
          console.warn('getFilter ок!');
          // observer.next({})
          // observer.next(null)
          if (this.curLang === 'KZ') {
            observer.error('Error');
          } else {
            observer.next([
              {
                countryName: 'Узбекистан',
                cityList: [
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
                countryName: 'Казахстан',
                cityList: [
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
              },
              {
                countryName: 'Армения',
                cityList: []
              }
            ]);
          }
          // observer.error('Error')
        }, 3000)
      })

      stream$
        .subscribe(
          (value: Array<CountryFilterItem>) => {
            this.filterFieldOptions = value?.filter(el => el.cityList?.length);
          },
          () => {
            console.error('Ошибка при получении фильтрации');
          }
        );
    } else {
      this.FSub = this.locationsService.getFilterOptions()
        .subscribe(
          (value: Array<CountryFilterItem>) => {
            this.filterFieldOptions = value?.filter(el => el.cityList?.length);
          },
          () => {
            console.error('Ошибка при получении фильтрации');
          }
        )
    }
  }

  private operateFilterFieldOptions(): void { // Тут мы будем анализировать список стран, считать кол-во выбранных городов и записывать их в отдельный список
    
    const arrOfSelectedCities = [];
    // this.filterFieldOptions.forEach(country => contr)

  }

  private getAllLocations(): void {
    this.isLoading = true;
    if (true) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('getLocations пошел');
        setTimeout(() => {
          console.warn('getLocations ок!');
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
        .subscribe(
          value => {
            this.locationsNew = value;
            this.isLoading = false;
          },
          () => {
            this.locationsNew = null;
            this.isLoading = false;
          }
        );

    } else {
      this.locationsSub = this.locationsService.getAllLocations()
        .pipe(
          delay(2000)
        )
        .subscribe(
          value => {
            this.locationsNew = value;
            this.isLoading = false;
          },
          () => {
            this.locationsNew = null;
            this.isLoading = false;
          }
        );
    }
  }

  private getAllLocationsAfterSort(sortVal?: string, filterVal?: string): void {
    if (true) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('getLocationsAfter пошел');
        setTimeout(() => {
          console.warn('getLocationsAfter ок!');
          if (this.errorAfterSort) {
            observer.error('Error');
          } else {
            // observer.next({});
            // observer.next(null);
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
            );
          }
        }, 3000)
      })

      stream$
        .subscribe(
          value => {
            console.log(`Успешно отсортировали (${sortVal})!`);
            this.locationsNew = value;
            this.lastSuccessSortVal = sortVal;
            this.filterBarGroup.get('sort').enable({ emitEvent: false });
            this.setIconForSortDropdown(sortVal);
            this.isSorting = false;
          },
          () => {
            console.error('Ошибка при получении отсортированных локаций! Поэтому не обновляем порядок локаций и берем предыдущее успешное значение сортировки');
            this.filterBarGroup.get('sort').enable({ emitEvent: false });
            this.filterBarGroup.get('sort').setValue(this.lastSuccessSortVal, { emitEvent: false });
            // this.filterBarGroup.get('sort').reset(null, { emitEvent: false }); // или тут можно будет установить последнее успешное значение сортировки
            this.setIconForSortDropdown(this.lastSuccessSortVal);
            this.isSorting = false;
            // Нужно будет как ниб показать сообщ о том что не удалось отсортировать локации
          }
        );

    } else {
      this.locationsSub = this.locationsService.getAllLocations(sortVal, filterVal)
        .pipe(
          delay(3000)
        )
        .subscribe(
          value => {
            console.log(`Успешно отсортировали (${sortVal})!`);
            this.locationsNew = value;
            this.lastSuccessSortVal = sortVal;
            this.filterBarGroup.get('sort').enable({ emitEvent: false });
            this.setIconForSortDropdown(sortVal);
            this.isSorting = false;
          },
          () => {
            console.error('Ошибка при получении отсортированных локаций! Поэтому не обновляем порядок локаций и берем предыдущее успешное значение сортировки');
            this.filterBarGroup.get('sort').enable({ emitEvent: false });
            this.filterBarGroup.get('sort').setValue(this.lastSuccessSortVal, { emitEvent: false });
            // this.filterBarGroup.get('sort').reset(null, { emitEvent: false }); // или тут можно будет установить последнее успешное значение сортировки
            this.setIconForSortDropdown(this.lastSuccessSortVal);
            this.isSorting = false;
            // Нужно будет как ниб показать сообщ о том что не удалось отсортировать локации
          }
        );
    }
  }

  private getAllLocationsAfterFilter(sortVal?: string, filterVal?: string): void {
    if (true) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('getLocationsAfterFilter пошел');
        setTimeout(() => {
          if (this.errorAfterSort) {
            console.warn('getLocationsAfterFilter error!');
            observer.error('Error');
          } else {
            console.warn('getLocationsAfterFilter ок!');
            // observer.next({});
            // observer.next(null);
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
            );
          }
        }, 3000)
      })

      stream$
        .subscribe(
          value => {
            console.log(`Успешно отфильтровали!`);
            this.locationsNew = value;
            this.isSorting = false;
          },
          () => {
            console.error('Ошибка при фильтрации, сбрасываем фильтрацию/сортировку и запрашиваем чистый список локаций')
            // Нужно будет как ниб показать сообщ о том что не удалось отфильтровать локации
            this.isSorting = false;
            this.afterFilterAndSortError();
          }
        );

    } else {
      this.locationsSub = this.locationsService.getAllLocations(sortVal, filterVal)
        .pipe(
          delay(3000)
        )
        .subscribe(
          value => {
            console.log(`Успешно отфильтровали!`);
            this.locationsNew = value;
            this.isSorting = false;
          },
          () => {
            console.error('Ошибка при фильтрации, сбрасываем фильтрацию/сортировку и запрашиваем чистый список локаций')
            // Нужно будет как ниб показать сообщ о том что не удалось отфильтровать локации
            this.isSorting = false;
            this.afterFilterAndSortError();
          }
        );
    }
  }

  private afterFilterAndSortError(): void {

    // Пока что проще всего при такой ошибке сбросить все и запросить чистый список локаций а не возвращать к последней успешной фильтрации и как это делается в случае ошибки сортировки

    // сбрасываем фильтрацию:
    this.filterFieldOptions.forEach(country => {
      country.cityList.forEach(city => delete city.selected);
      delete country.selectedСities;
    });
    this.amountAllSelectedCities = [];
    this.showFilterControls = false;

    // сбрасываем сортировку:
    this.filterBarGroup.get('sort').setValue(null, { emitEvent: false });
    this.setIconForSortDropdown(null);

    // запрашиваем новый список локаций:
    this.getAllLocations();
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
    this.filterBarGroup.get('sort').disable({ emitEvent: false });
    this.sortLocationsOnBackend();
  }

  private setIconForSortDropdown(sortValue: string): void {
    if (sortValue) {
      this.dropdownHeadForSort = `
        <div class="headInSortDropdown">
          <div class="headInSortDropdown__icon sortIcon sortIcon--selected"></div>
          <div class="headInSortDropdown__text">Сортировка</div>
        </div>
      `;
    } else {
      this.dropdownHeadForSort = `
        <div class="headInSortDropdown">
          <div class="headInSortDropdown__icon sortIcon"></div>
          <div class="headInSortDropdown__text">Сортировка</div>
        </div>
      `;
    }
  }

  private onSelectCity(linkToCountry: any, linkToCity: any): void {
    const curVal = linkToCity.selected;
    if (curVal) {
      console.log('Отжали какой-то город');
      linkToCity.selected = false;
      linkToCountry.selectedСities = linkToCountry.selectedСities.filter(el => el !== linkToCity.value);
      // this.amountAllSelectedCities -= 1;
      this.amountAllSelectedCities = this.amountAllSelectedCities.filter(el => el !== linkToCity.value);
    } else {
      console.log('Выбрали еще какой-то город');
      linkToCity.selected = true;
      if (!linkToCountry.selectedСities?.length) { linkToCountry.selectedСities = [] };
      linkToCountry.selectedСities.push(linkToCity.value);
      // this.amountAllSelectedCities += 1;
      this.amountAllSelectedCities.push(linkToCity.value);
    }

    if (this.timerForFilter) {
      clearTimeout(this.timerForFilter);
    }

    this.timerForFilter = setTimeout(() => {
      this.timerForFilter = null;
      console.log('Делаем фильтрацию...');
      this.isSorting = true;
      this.filterLocationsOnBackend();
    }, 2000);
  }

  private getAmountOfAllSelectedCities(): string {
    return this.amountAllSelectedCities.length ? `Показан ${this.amountAllSelectedCities.length} из 20 городов` : 'Показаны все города'
  }

  public ngOnDestroy(): void {
    this.pageWrapScrollSub?.unsubscribe();
    this.lSub?.unsubscribe();
    this.locationsSub?.unsubscribe();
    this.FSub?.unsubscribe();
  }

}
