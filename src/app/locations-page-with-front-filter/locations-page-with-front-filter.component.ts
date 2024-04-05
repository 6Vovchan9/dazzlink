import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { Observable, Observer, Subject, Subscription, fromEvent, of } from 'rxjs';
import { catchError, delay, filter, map, skip, takeUntil, tap } from 'rxjs/operators';

import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { langArr } from '@app/shared/constants/languages.constants';
import { LocationsService } from '@app/shared/services/locations.service';
import { CountryFilterItem, ECategoryCodes, ILocationCategories, Place, RespCityPlaceList, RovraggeRespLocationsData } from '@app/shared/interfaces';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastService } from '@app/shared/services/toast.service';
import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { MOCK_LOCATIONS, MOCK_LOCATIONS_FOR_SKELETON } from '@app/shared/mock/locations';
import { CATEGORYCODES } from '@app/shared/constants/all.constants';

@Component({
  selector: 'app-locations-page-with-front-filter',
  templateUrl: './locations-page-with-front-filter.component.html',
  styleUrls: ['./locations-page-with-front-filter.component.scss']
})
export class LocationsPageWithFrontFilterComponent implements OnInit {

  public allLocations: RovraggeRespLocationsData = MOCK_LOCATIONS_FOR_SKELETON;
  public filteredLocations: Array<RespCityPlaceList>;
  public isLoading = true;
  public isSorting = false;
  public curCategoryCode: ECategoryCodes = ECategoryCodes.restaurants;
  protected categoryCodes: Array<ILocationCategories> = CATEGORYCODES;
  private locationsSub: Subscription;
  private locationsAfterFilterSub: Subscription;
  private locationsAfterSortSub: Subscription;
  private fSub: Subscription;
  private sSub: Subscription;
  private curLang: string;
  public filterBarGroup: UntypedFormGroup;
  private selectedCitiesMap: Record<string, 'chosen'> = {};
  public amountAllSelectedCities: Array<string> = [];
  public amountAllSelectedCitiesBefore: Array<string> = [];
  private debounceTimeForFilter: any;
  private fakeDelayForFilter: any;
  private fakeDelayForSort: any;
  private aboutType: unknown;
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
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Optional() public mobileDetectService: MobileDetectService,
    private locationsService: LocationsService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: GlobalModalService,
  ) {
    this.filteredLocations = this.allLocations.cityPlaceList;
  }

  ngOnInit(): void {

    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        tap((params: Params) => {
          const isValueExists = Object.values(ECategoryCodes).includes(params.category);
          if (isValueExists) {
            this.curCategoryCode = params.category;
          }
        }),
        // skip(1),
        filter((val, index) => index > 0)
      ).subscribe(
        (params: Params) => {
          console.log('Сейчас:', this.curCategoryCode);

          // Строки ниже это для сброса всего связанного с фильтрацией
          this.amountAllSelectedCities = [];
          this.selectedCitiesMap = {};
          this.showFilterControls = false;
          this.filterFieldOptions = null;
          
          // Ниже 4 строки это для сброса всего связанного с FormControl-ом сортировки
          this.filterBarGroup.get('sort').setValue(null, { emitEvent: false });
          this.filterBarGroup.get('sort').disable({ emitEvent: false });
          this.sortFieldOptions.items = [];
          this.setIconForSortDropdown(null);

           // Отписываемся от всех запросов:
          this.subscriptionList();

          // Снова запрашиваем локации фильтрацию и сортировку:

        }
      );

    this.createForm();
    this.getSort();
    this.getFilters();
    this.getAllLocations();
  }

  public onResetAllFilters(): void {

    // сбрасываем фильтрацию:
    this.filterFieldOptions.forEach(country => {
      country.cityList.forEach(city => delete city.selected);
      delete country.selectedСities;
    });

    this.amountAllSelectedCities = [];
    this.selectedCitiesMap = {};

    this.filterBarGroup.get('sort').disable({ emitEvent: false }); // Блокируем сортировку
    this.isSorting = true; // Включаем скелетон

    setTimeout(() => {
      this.filteredLocations = this.allLocations.cityPlaceList;
      console.log(`Успешно отфильтровали!`);
      this.toastService.success('Отфильтровано');
      this.isSorting = false;
      if (this.sortFieldOptions.items.length) this.filterBarGroup.get('sort').enable({ emitEvent: false });
    }, 1600);

  }

  public onResetAllFiltersOnMobile(): void {

    // сбрасываем фильтрацию:
    this.filterFieldOptions.forEach(country => {
      country.cityList.forEach(city => delete city.selected);
      delete country.selectedСities;
    });
    this.amountAllSelectedCities = [];
    this.selectedCitiesMap = {};

  }

  private createForm(): void {
    this.filterBarGroup = new UntypedFormGroup({});

    this.filterBarGroup.addControl('sort', new UntypedFormControl({ value: null, disabled: true }));

    this.filterBarGroup.get('sort').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        val => {
          this.onChangeSort(val);
        }
      );
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

  private filterLocationsOnFront(): void {

    if (this.amountAllSelectedCities.length) {
      this.filteredLocations = this.allLocations.cityPlaceList.filter(city => {
        return city.cityCode in this.selectedCitiesMap;
      });
    } else {
      this.filteredLocations = this.allLocations.cityPlaceList;
    }
  
    console.log(`Успешно отфильтровали!`);
    this.toastService.success('Отфильтровано');
    this.isSorting = false;
    if (this.sortFieldOptions.items.length) this.filterBarGroup.get('sort').enable({ emitEvent: false });
  }

  private sortLocationsOnFront(): void {

    const sortControlVal = this.filterBarGroup?.get('sort')?.value;

    if (sortControlVal === 'price_asc') {
      console.log('Сортируем от меньшего к большему');
      this.allLocations.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return a.priceRange - b.priceRange;
          })
        }
      });
    } else if (sortControlVal === 'price_desc') {
      console.log('Сортируем от большего к меньшему');
      this.allLocations.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return b.priceRange - a.priceRange;
          })
        }
      });
    } else if (sortControlVal === 'rating_desc') {
      console.log('Сортируем по рейтингу');
      this.allLocations.cityPlaceList.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return b.rating - a.rating;
          })
        }
      });
    }

    console.log(`Успешно отсортировали (${sortControlVal})!`);
    this.toastService.success('Отсортировано');
    this.filterBarGroup.get('sort').enable({ emitEvent: false });
    this.setIconForSortDropdown(sortControlVal);
    this.isSorting = false;
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
          // delay(4000),
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
        // .pipe(delay(2000))
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
            console.warn('locationsGet что-то пошло не так :(');
            // observer.next({});
            observer.next(null);
            // observer.error('Error');
            // observer.next({
            //   placeCount: 0,
            //   cityPlaceList: []
            // });
          } else {
            console.warn('locationsGet ок!');
            observer.next(MOCK_LOCATIONS);
          }
        }, 2000)
      })

      this.locationsSub = stream$
        // .pipe(delay(6000))
        .subscribe(
          value => {
            this.allLocations = value;
            this.filteredLocations = value?.cityPlaceList;
            this.isLoading = false;
          },
          () => {
            this.allLocations = this.filteredLocations = null;
            this.isLoading = false;
          }
        );

    } else {
      this.locationsSub = this.locationsService.getAllLocations()
        // .pipe(delay(2000))
        .subscribe({
          next: value => {
            // console.log(value);
            // let locationsForYmap = value.cityPlaceList.map(el1 => el1.placeList).flat();
            // console.log(locationsForYmap);
            this.allLocations = value;
            this.filteredLocations = value?.cityPlaceList;
            this.isLoading = false;
          },
          error: () => {
            this.allLocations = this.filteredLocations = null;
            this.isLoading = false;
          }
        });
    }
  }

  private getAllLocationsAfterSort(sortVal?: string, filterVal?: string): void {
    this.locationsUpdating = true;
      this.locationsAfterSortSub = this.locationsService.getAllLocations(sortVal, filterVal)
        // .pipe(
        //   delay(3000)
        // )
        .subscribe(
          value => {
            this.locationsUpdating = false;
            console.log(`Успешно отсортировали (${sortVal})!`);
            this.toastService.success('Отсортировано');
            this.allLocations = value;
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

  private getAllLocationsAfterFilter(sortVal?: string, filterVal?: string): void {
    if (this.locationsUpdating) { // Если запрос локаций в данный момент идет тогда отписываемся от него и запускаем новый
      this.locationsAfterFilterSub?.unsubscribe();
      this.locationsAfterSortSub?.unsubscribe();
    }
    this.locationsUpdating = true;
      this.locationsAfterFilterSub = this.locationsService.getAllLocations(sortVal, filterVal)
        .subscribe(
          value => {
            this.locationsUpdating = false;
            console.log(`Успешно отфильтровали!`);
            this.toastService.success('Отфильтровано');
            this.allLocations = value;
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
    this.fakeDelayForSort = setTimeout(() => this.sortLocationsOnFront(), 1600);
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
      this.filterBarGroup.get('sort').disable({ emitEvent: false });
      this.fakeDelayForFilter = setTimeout(() => this.filterLocationsOnFront(), 1600);
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

  private onSelectCity(linkToCountry: CountryFilterItem, linkToCity: any): void {

    if (!+linkToCity.count) {
      return;
    }

    const curVal = linkToCity.selected;
    if (curVal) {
      console.log('Отжали какой-то город');
      linkToCity.selected = false;
      linkToCountry.selectedСities = linkToCountry.selectedСities.filter(el => el !== linkToCity.code);
      this.amountAllSelectedCities = this.amountAllSelectedCities.filter(el => el !== linkToCity.code);
      delete this.selectedCitiesMap[linkToCity.code];
    } else {
      console.log('Выбрали еще какой-то город');
      linkToCity.selected = true;
      if (!linkToCountry.selectedСities?.length) { linkToCountry.selectedСities = [] };
      linkToCountry.selectedСities.push(linkToCity.code);
      this.amountAllSelectedCities.push(linkToCity.code);
      this.selectedCitiesMap[linkToCity.code] = 'chosen';
    }

    const mobileWidth = document.documentElement.clientWidth < 768;

    if (!mobileWidth) {
      this.filterBarGroup.get('sort').disable({ emitEvent: false });
      if (this.locationsUpdating) { // Если фильтрация в данный момент идет тогда запускаем новую без задержки
        console.log('Делаем фильтрацию...');
        this.isSorting = true;
        // this.filterBarGroup.get('sort').disable({ emitEvent: false });
        this.fakeDelayForFilter = setTimeout(() => this.filterLocationsOnFront(), 1600);
      } else {
        if (this.debounceTimeForFilter) { // Это задержка, чтоб не отправлять запрос при каждом клике по фильтрации
          clearTimeout(this.debounceTimeForFilter);
        }

        this.debounceTimeForFilter = setTimeout(() => {
          this.debounceTimeForFilter = null;
          console.log('Делаем фильтрацию...');
          this.isSorting = true;
          this.filterBarGroup.get('sort').disable({ emitEvent: false }); // Если это убрать то контрол раздизейблится если запустить сортировку и быстро запустить фильтрацию
          this.fakeDelayForFilter = setTimeout(() => this.filterLocationsOnFront(), 1600);
        }, 1500);
      }
    }
  }

  public getAmountOfAllSelectedCities(): string {
    return this.amountAllSelectedCities.length ? `Показан ${this.amountAllSelectedCities.length} из 20 городов` : 'Показаны все города'
  }

  public onChangeCurCategory(categoryVal: ECategoryCodes): void {
    // const categoryParam: ECategoryCodes = categoryVal === ECategoryCodes.restaurants ? null : categoryVal;
    const categoryParam: ECategoryCodes = categoryVal;
    this.router.navigate(
      [],
      {
        queryParams: { category: categoryParam },
        replaceUrl: true
        // queryParamsHandling: 'merge'
      }
    ).then(
      (success: boolean) => {
        this.curCategoryCode = categoryVal;
      }
    )
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
    this.locationsSub?.unsubscribe();
    this.locationsAfterFilterSub?.unsubscribe();
    this.locationsAfterSortSub?.unsubscribe();
    this.fSub?.unsubscribe();
    this.sSub?.unsubscribe();
    clearTimeout(this.debounceTimeForFilter);
    clearTimeout(this.fakeDelayForFilter);
    clearTimeout(this.fakeDelayForSort);
  }

  public ngOnDestroy(): void {
    this.subscriptionList();

    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
