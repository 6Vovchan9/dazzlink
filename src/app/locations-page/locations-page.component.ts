import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { Observable, Observer, Subscription, fromEvent, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { PagesService } from '@app/shared/services/pages.service';
import { langArr } from '@app/shared/constants/languages.constants';
import { LocationsService } from '@app/shared/services/locations.service';
import { CountryFilterItem, Place } from '@app/shared/interfaces';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';
import { Router } from '@angular/router';
import { ToastService } from '@app/shared/services/toast.service';
import { GlobalModalService } from '@app/shared/services/global-modal.service';

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
  private langSub: Subscription;
  private locationsSub: Subscription;
  private locationsAfterFilterSub: Subscription;
  private locationsAfterSortSub: Subscription;
  private fSub: Subscription;
  private sSub: Subscription;
  private curLang: string;
  private pageWrapScrollSub: Subscription;
  public filterBarFixed = false;
  public filterBarGroup: UntypedFormGroup;
  public amountAllSelectedCities: Array<string> = [];
  public amountAllSelectedCitiesBefore: Array<string> = [];
  private timerForFilter: any;
  public showFilterControls = false;
  public errorAfterSort = false;
  public errorInGetAllLocations = false;
  private lastSuccessSortVal: string = null;
  private locationsUpdating = false;
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
      // { value: 'price_asc', details: 'По цене $ → $$$' },
      // { value: 'price_desc', details: 'По цене $$$ → $' },
      // { value: 'rating_desc', details: 'По рейтингу' },
    ],
  };
  public filterFieldOptions: Array<CountryFilterItem>;

  @ViewChild('locationsWrapper') locationsWrapper: ElementRef;
  
  constructor(
    private pagesService: PagesService,
    @Optional() public mobileDetectService: MobileDetectService,
    private locationsService: LocationsService,
    private toastService: ToastService,
    private router: Router,
    public modalService: GlobalModalService,
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

    this.langSub = this.pagesService.currentLanguage.subscribe(
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

          this.subscriptionList(); // Отписываемся от всех запросов

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
    // this.aboutProgressiveImage();
  }

  public onResetAllFilters(): void {

    // сбрасываем фильтрацию:
    this.filterFieldOptions.forEach(country => {
      country.cityList.forEach(city => delete city.selected);
      delete country.selectedСities;
    });
    this.amountAllSelectedCities = [];

    // this.subscriptionList(); // Отписываемся от всех запросов. Тут это не нужно

    this.filterBarGroup.get('sort').disable({ emitEvent: false }); // Блокируем сортировку
    this.isSorting = true; // Включаем скелетон

    // запрашиваем новый список локаций:
    this.filterLocationsOnBackend();
  }

  public onResetAllFiltersOnMobile(): void {

    // сбрасываем фильтрацию:
    this.filterFieldOptions.forEach(country => {
      country.cityList.forEach(city => delete city.selected);
      delete country.selectedСities;
    });
    this.amountAllSelectedCities = [];

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
    //   sort: new FormControl({ value: 'rating_desc', disabled: false }),
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
    const filterString = this.amountAllSelectedCities.join(',');

    this.getAllLocationsAfterSort(sortControlVal, filterString);
  }

  private filterLocationsOnBackend() {
    const sortControlVal = this.filterBarGroup?.get('sort')?.value;
    const filterString = this.amountAllSelectedCities.join(',');

    this.getAllLocationsAfterFilter(sortControlVal, filterString);
  }

  private sortLocationsList(): void {

    const sortControlVal = this.filterBarGroup?.get('sort')?.value;

    if (sortControlVal === 'price_asc') {
      console.log('Сортируем от меньшего к большему');
      this.locationsNew.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return a.priceRange - b.priceRange;
          })
        }
      });
    } else if (sortControlVal === 'price_desc') {
      console.log('Сортируем от большего к меньшему');
      this.locationsNew.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return b.priceRange - a.priceRange;
          })
        }
      });
    } else if (sortControlVal === 'rating_desc') {
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
    if (false) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('sortGet пошел');
        setTimeout(() => {
          // observer.next({})
          // observer.next(null)
          if (this.curLang === 'UZ') {
            console.warn('sortGet error!');
            observer.error('Error');
          } else {
            console.warn('sortGet ок!');
            observer.next(
              [
                { code: 'price_asc', title: 'По цене $ → $$$' },
                { code: 'price_desc', title: 'По цене $$$ → $' },
                { code: 'rating_desc', title: 'По рейтингу' }
              ]
            )
          }
        }, 2000)
      })

      this.sSub = stream$
        .pipe(
          map(resp => {
            if (resp.length) {
              resp = resp.map(el => {
                const res = {
                  details: el.title || el.code,
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
      this.sSub = this.locationsService.getSortOptions()
        .pipe(
          map((resp: Array<{ title?: string, code?: string, details?: string, value?: string }>) => {
            if (resp.length) {
              resp = resp.map(el => {
                const res = {
                  details: el.title || el.code,
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
    if (false) {
      const stream$ = new Observable((observer: Observer<Array<CountryFilterItem>>) => {
        console.warn('filterGet пошел');
        setTimeout(() => {
          // observer.next({})
          // observer.next(null)
          if (this.curLang === 'KZ') {
            console.warn('filterGet error!');
            observer.error('Error');
          } else {
            console.warn('filterGet ок!');
            observer.next([
              {
                countryTitle: 'Узбекистан',
                cityList: [
                  {
                    title: 'Ташкент',
                    code: 'Tashkent',
                    count: 42
                  },
                  {
                    title: 'Наманган',
                    code: 'Namangan',
                    count: 2,
                  },
                  {
                    title: 'Самарканд',
                    code: 'Samarkand',
                    count: 32
                  },
                  {
                    title: 'Андижан',
                    code: 'Andizhan',
                    count: 62
                  },
                  {
                    title: 'Нукус',
                    code: 'Nukus',
                    count: 47
                  },
                  {
                    title: 'Коканд',
                    code: 'Kokand',
                    count: 1
                  },
                  {
                    title: 'Бухара',
                    code: 'Buhara',
                    count: 46
                  },
                  {
                    title: 'Карши',
                    code: 'Karshi',
                    count: 49
                  },
                  {
                    title: 'Фергана',
                    code: 'Fergana',
                    count: 40
                  },
                  {
                    title: 'Маргилан',
                    code: 'Margilan',
                    count: 81
                  }
                ]
              },
              {
                countryTitle: 'Казахстан',
                cityList: [
                  {
                    title: 'Алматы',
                    code: 'Almati',
                    count: 62
                  },
                  {
                    title: 'Астана',
                    code: 'Astana',
                    count: 4
                  },
                  {
                    title: 'Шымкент',
                    code: 'Shimkent',
                    count: 83
                  },
                  {
                    title: 'Актобе',
                    code: 'Aktobe',
                    count: 44
                  },
                  {
                    title: 'Караганда',
                    code: 'Karaganda',
                    count: 49
                  },
                  {
                    title: 'Тараз',
                    code: 'Taraz',
                    count: 24
                  },
                  {
                    title: 'Усть-Каменогорск',
                    code: 'Kamen',
                    count: 70
                  },
                  {
                    title: 'Павлодар',
                    code: 'Pavlodar',
                    count: 89
                  }
                ]
              },
              {
                countryTitle: 'Армения',
                cityList: []
              }
            ]);
          }
          // observer.error('Error')
        }, 3000)
      })

      this.fSub = stream$
        .subscribe(
          (value: Array<CountryFilterItem>) => {
            this.filterFieldOptions = value?.filter(el => el.cityList?.length);
          },
          () => {
            console.error('Ошибка при получении фильтрации');
          }
        );
    } else {
      this.fSub = this.locationsService.getFilterOptions()
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

  private retryGetAllLocations(): void {
    this.getAllLocations();
    if (!this.sortFieldOptions.items.length) {
      console.log('Нет параметров сортировки, запросим их снова');
      this.getSort();
    }
    if (!this.filterFieldOptions?.length) {
      console.log('Нет параметров фильтрации, запросим их снова');
      this.getFilters();
    }
  }

  private getAllLocations(): void {
    this.isLoading = true;
    if (false) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('locationsGet пошел');
        setTimeout(() => {
          if (this.errorInGetAllLocations) {
            console.warn('locationsGet error :(');
            // observer.next({});
            observer.next(null);
            // observer.error('Error');
          } else {
            console.warn('locationsGet ок!');
            observer.next(
              {
                "placeCount": 5,
                "cityPlaceList": [
                  {
                    "cityCode": "Tashkent",
                    "cityTitle": "Ташкент",
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
                            "href": 'assets/images/home-page/linkToArticlesX2.jpg'
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
                    "cityTitle": "Алматы",
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
                    "cityTitle": "Москва",
                    "placeList": []
                  },
                  {
                    "cityTitle": "Ереван",
                  }
                ]
              }
            );
          }
        }, 2000)
      })

      this.locationsSub = stream$.subscribe(
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
        // .pipe(
        //   delay(2000)
        // )
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
    this.locationsUpdating = true;
    if (false) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('afterSortGetLocations пошел');
        setTimeout(() => {
          if (this.errorAfterSort) {
            console.warn('afterSortGetLocations error!');
            observer.error('Error');
          } else {
            console.warn('afterSortGetLocations ок!');
            // observer.next({});
            // observer.next(null);
            observer.next(
              {
                "placeCount": 5,
                "cityPlaceList": [
                  {
                    "cityCode": "Tashkent",
                    "cityTitle": "Ташкент",
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
                            "href": 'assets/images/home-page/linkToArticlesX2.jpg'
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
                    "cityTitle": "Алматы",
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
                    "cityTitle": "Москва",
                    "placeList": []
                  },
                  {
                    "cityTitle": "Ереван",
                  }
                ]
              }
            );
          }
        }, 3000)
      })

      this.locationsAfterSortSub = stream$.subscribe(
        value => {
          this.locationsUpdating = false;
          console.log(`Успешно отсортировали (${sortVal})!`);
          this.toastService.success('Отсортировано');
          this.locationsNew = value;
          this.lastSuccessSortVal = sortVal;
          this.filterBarGroup.get('sort').enable({ emitEvent: false });
          this.setIconForSortDropdown(sortVal);
          this.isSorting = false;
        },
        () => {
          this.locationsUpdating = false;
          console.error('Ошибка при получении отсортированных локаций! Поэтому не обновляем порядок локаций и берем предыдущее успешное значение сортировки');
          this.toastService.warning('Ошибка сортировки, попробуйте еще раз');
          this.filterBarGroup.get('sort').enable({ emitEvent: false });
          this.filterBarGroup.get('sort').setValue(this.lastSuccessSortVal, { emitEvent: false });
          // this.filterBarGroup.get('sort').reset(null, { emitEvent: false }); // или тут можно будет установить последнее успешное значение сортировки
          this.setIconForSortDropdown(this.lastSuccessSortVal);
          this.isSorting = false;
          // Нужно будет как ниб показать сообщ о том что не удалось отсортировать локации
        }
      );

    } else {
      this.locationsAfterSortSub = this.locationsService.getAllLocations(sortVal, filterVal)
        // .pipe(
        //   delay(3000)
        // )
        .subscribe(
          value => {
            this.locationsUpdating = false;
            console.log(`Успешно отсортировали (${sortVal})!`);
            this.toastService.success('Отсортировано');
            this.locationsNew = value;
            this.lastSuccessSortVal = sortVal;
            this.filterBarGroup.get('sort').enable({ emitEvent: false });
            this.setIconForSortDropdown(sortVal);
            this.isSorting = false;
          },
          () => {
            this.locationsUpdating = false;
            console.error('Ошибка при получении отсортированных локаций! Поэтому не обновляем порядок локаций и берем предыдущее успешное значение сортировки');
            this.toastService.warning('Ошибка сортировки, попробуйте еще раз');
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
    if (this.locationsUpdating) { // Если запрос локаций в данный момент идет тогда отписываемся от него и запускаем новый
      this.locationsAfterFilterSub?.unsubscribe();
      this.locationsAfterSortSub?.unsubscribe();
    }
    this.locationsUpdating = true;
    if (false) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('afterFilterGetLocations пошел');
        setTimeout(() => {
          if (this.errorAfterSort) {
            console.warn('afterFilterGetLocations error!');
            observer.error('Error');
          } else {
            console.warn('afterFilterGetLocations ок!');
            // observer.next({});
            // observer.next(null);
            observer.next(
              {
                "placeCount": 5,
                "cityPlaceList": [
                  {
                    "cityCode": "Tashkent",
                    "cityTitle": "Ташкент",
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
                            "href": 'assets/images/home-page/linkToArticlesX2.jpg'
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
                    "cityTitle": "Алматы",
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
                    "cityTitle": "Москва",
                    "placeList": []
                  },
                  {
                    "cityTitle": "Ереван",
                  }
                ]
              }
            );
          }
        }, 3000)
      })

      this.locationsAfterFilterSub = stream$.subscribe(
        value => {
          this.locationsUpdating = false;
          console.log(`Успешно отфильтровали!`);
          this.toastService.success('Отфильтровано');
          this.locationsNew = value;
          this.isSorting = false;
          if (this.sortFieldOptions.items.length) this.filterBarGroup.get('sort').enable({ emitEvent: false }); // Эти 2 подстраховки на случай когда начали соритровать и сразу принялись фильтровать
          if (this.filterBarGroup.get('sort').value) this.setIconForSortDropdown(this.filterBarGroup.get('sort').value);
        },
        () => {
          this.locationsUpdating = false;
          console.error('Ошибка при фильтрации, сбрасываем фильтрацию/сортировку и запрашиваем чистый список локаций');
          this.toastService.warning('Ошибка фильтрации, попробуйте еще раз');
          this.isSorting = false;
          this.afterFilterAndSortError();
          // Нужно будет как ниб показать сообщ о том что не удалось отфильтровать локации
        }
      );

    } else {
      this.locationsAfterFilterSub = this.locationsService.getAllLocations(sortVal, filterVal)
        // .pipe(
        //   delay(3000)
        // )
        .subscribe(
          value => {
            this.locationsUpdating = false;
            console.log(`Успешно отфильтровали!`);
            this.toastService.success('Отфильтровано');
            this.locationsNew = value;
            this.isSorting = false;
            if (this.sortFieldOptions.items.length) this.filterBarGroup.get('sort').enable({ emitEvent: false }); // Эти 2 подстраховки на случай когда начали соритровать и сразу принялись фильтровать
            if (this.filterBarGroup.get('sort').value) this.setIconForSortDropdown(this.filterBarGroup.get('sort').value);
          },
          () => {
            this.locationsUpdating = false;
            console.error('Ошибка при фильтрации, сбрасываем фильтрацию/сортировку и запрашиваем чистый список локаций');
            this.toastService.warning('Ошибка фильтрации, попробуйте еще раз');
            this.isSorting = false;
            this.afterFilterAndSortError();
            // Нужно будет как ниб показать сообщ о том что не удалось отфильтровать локации
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
    if (this.sortFieldOptions.items.length) this.filterBarGroup.get('sort').enable({ emitEvent: false });
    this.filterBarGroup.get('sort').setValue(null, { emitEvent: false });
    this.setIconForSortDropdown(null);

    // запрашиваем новый список локаций:
    this.getAllLocations();
  }

  public goToAnotherLocations(): void {
    if (this.mobileDetectService.mobileOrTabletDevice) {
      this.mobileDetectService?.goToDeviceStore();
    } else {
      this.modalService.open({ component: 'mainLayoutComponent' }); // на аргумент можно не обращать внимание
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

  public onCloseFilterOptionsInMobile(): void {
    if (true) {
      this.onFilterFromMobile();
    } else {
      if (this.amountAllSelectedCities.length) {
        this.filterFieldOptions.forEach(country => {
          country.cityList.forEach(city => delete city.selected);
          delete country.selectedСities;
        });
        this.amountAllSelectedCities = [];
      }
      this.showFilterControls = false;
    }
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

  public clickByFilterOptions(e): void {
    e.stopPropagation();
  }

  public onFilterFromMobile(): void {

    const arrBefore = this.amountAllSelectedCitiesBefore;
    const arrAfter  = this.amountAllSelectedCities;

    console.log('Before:', arrBefore);
    console.log('After:',  arrAfter);

    this.showFilterControls = false;

    if (arrBefore.length === arrAfter.length && this.isArraysEqual(arrBefore, arrAfter)) {
      console.log('He фильтруем города, выбор не изменился!');
    } else {
      console.log('Делаем фильтрацию городов...');
      this.isSorting = true;
      this.filterLocationsOnBackend();
    }
  }

  private isArraysEqual(arr1, arr2): boolean {
    console.log('Сравниваем списки городов до/после...');
    let newArr1 = arr1.sort();
    let newArr2 = arr2.sort();

    const res = JSON.stringify(newArr1) == JSON.stringify(newArr2);
    // console.log(res ? 'Списки городов до/после равны' : 'Списки городов до/после разные');

    return res;
  }

  public onShowHideFilterControls() {
    this.showFilterControls = !this.showFilterControls;

    this.amountAllSelectedCitiesBefore = [...this.amountAllSelectedCities];
  }

  private onSelectCity(linkToCountry: any, linkToCity: any): void {

    this.filterBarGroup.get('sort').disable({ emitEvent: false });
    const curVal = linkToCity.selected;
    if (curVal) {
      console.log('Отжали какой-то город');
      linkToCity.selected = false;
      linkToCountry.selectedСities = linkToCountry.selectedСities.filter(el => el !== linkToCity.code);
      // this.amountAllSelectedCities -= 1;
      this.amountAllSelectedCities = this.amountAllSelectedCities.filter(el => el !== linkToCity.code);
    } else {
      console.log('Выбрали еще какой-то город');
      linkToCity.selected = true;
      if (!linkToCountry.selectedСities?.length) { linkToCountry.selectedСities = [] };
      linkToCountry.selectedСities.push(linkToCity.code);
      // this.amountAllSelectedCities += 1;
      this.amountAllSelectedCities.push(linkToCity.code);
    }

    const mobileWidth = document.documentElement.clientWidth < 768;

    if (!mobileWidth) {
      if (this.locationsUpdating) { // Если фильтрация в данный момент идет тогда запускаем новую без задержки
        console.log('Делаем фильтрацию...');
        this.isSorting = true;
        this.filterLocationsOnBackend();
      } else {
        if (this.timerForFilter) { // Это задержка, чтоб не отправлять запрос при каждом клике по фильтрации
          clearTimeout(this.timerForFilter);
        }

        this.timerForFilter = setTimeout(() => {
          this.timerForFilter = null;
          console.log('Делаем фильтрацию...');
          this.isSorting = true;
          this.filterLocationsOnBackend();
        }, 1500);
      }
    }
  }

  private getAmountOfAllSelectedCities(): string {
    return this.amountAllSelectedCities.length ? `Показан ${this.amountAllSelectedCities.length} из 20 городов` : 'Показаны все города'
  }

  public goToLocationDesc(id: string): void {
    if (this.isSorting) return;

    console.log('Идем к подробностям выбранной локации')
    this.router.navigate(['/place', id]).then(
      (success: boolean) => {
        // console.log(success)
      }
    )
  }

  private subscriptionList(): void {
    this.locationsAfterFilterSub?.unsubscribe();
    this.locationsAfterSortSub?.unsubscribe();
    this.fSub?.unsubscribe();
    this.sSub?.unsubscribe();
    clearTimeout(this.timerForFilter);
  }

  public ngOnDestroy(): void {
    this.pageWrapScrollSub?.unsubscribe();
    this.langSub?.unsubscribe();
    this.locationsSub?.unsubscribe();
    this.subscriptionList();
  }

}
