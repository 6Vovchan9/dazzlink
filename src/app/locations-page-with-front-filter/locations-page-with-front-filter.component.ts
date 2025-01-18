import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  Signal,
  ViewChild,
  effect,
  inject,
  signal,
  viewChild
} from '@angular/core';
import {
  Observable,
  Observer,
  Subject,
  Subscription,
  forkJoin,
  fromEvent,
  of,
  throwError
} from 'rxjs';
import {
  catchError,
  throttleTime,
  delay,
  filter,
  map,
  skip,
  skipWhile,
  takeUntil,
  tap,
  auditTime
} from 'rxjs/operators';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink, Scroll } from '@angular/router';
import {
  DOCUMENT,
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  ViewportScroller
} from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import {
  CountryFilterItem,
  ILocationCategories,
  Place,
  RespCityPlaceList,
  RovraggeRespLocationsData
} from '@app/shared/interfaces';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { langArr } from '@app/shared/constants/languages.constants';
import { LocationsService } from '@app/shared/services/locations.service';
import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';
import { ToastService } from '@app/shared/services/toast.service';
import { GlobalModalService } from '@app/shared/services/global-modal.service';
import {
  MOCK_CATEGORIES_FOR_SKELETON,
  MOCK_LOCATIONS,
  MOCK_LOCATIONS_FOR_SKELETON
} from '@app/shared/mock/locations';
import { LocationItemComponent } from '@app/shared/components/location-item/location-item.component';
import { DropdownFieldModule } from '@app/shared/fields/dropdown-field/dropdown-field.module';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { FooterComponent } from '@app/shared/components/footer/footer.component';
import { CookiesAgreementService } from '@app/shared/services/cookiesAgreement.service';

@Component({
  selector: 'app-locations-page-with-front-filter',
  templateUrl: './locations-page-with-front-filter.component.html',
  styleUrls: ['./locations-page-with-front-filter.component.scss'],
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgIf, NgFor,
    ReactiveFormsModule,
    NgClass, NgStyle,
    RouterLink,

    LocationItemComponent,
    DropdownFieldModule,
    HeaderComponent,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsPageWithFrontFilterComponent implements OnInit, AfterViewInit {

  @ViewChild('progressCircle') progressCircle: ElementRef;

  public allLocations: RovraggeRespLocationsData = MOCK_LOCATIONS_FOR_SKELETON;
  public filteredLocations: Array<RespCityPlaceList>;
  public isLoading = signal<boolean>(true);
  public isSorting = signal(false);
  protected categoryCodes: { selected?: string, list: Array<ILocationCategories> } = {
    list: MOCK_CATEGORIES_FOR_SKELETON
  };
  private locationsSub: Subscription;
  private locationsAfterFilterSub: Subscription;
  private locationsAfterSortSub: Subscription;
  private fSub: Subscription;
  private sSub: Subscription;
  private allOptionsSub: Subscription;
  private curLang: string;
  public filterBarGroup: UntypedFormGroup;
  private selectedCitiesMap: Record<string, 'chosen'> = {};
  public amountAllSelectedCities: Array<string> = [];
  public amountAllSelectedCitiesBefore: Array<string> = [];
  private debounceTimeForFilter: any;
  private fakeDelayForFilter: any;
  private fakeDelayForSort: any;
  private aboutType: unknown;
  private readonly readonlyExample = 'Hello'; // с помощью такого модификатора свойство экземпляра класса помечается как “только для чтения”
  public disabledLocationCategories = signal<boolean>(true);
  public locationCategoriesWithSkeleton = signal(true);
  public showFilterControls = signal(false);
  public errorInGetAllLocations = false;
  private lastSuccessSortVal: string = null;
  private locationsUpdating = false;
  public dropdownHeadForSortSelected = false;
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
  public isEmptySortOptions = signal(false);
  public filterFieldOptions: Array<CountryFilterItem>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public hideScrollProgress = true;
  public hideBecauseOpenSort = false;
  private prevScrollTop = 0;
  public hideHeader = signal(true);
  private pageScrollSub: Subscription;
  scrollingRef = viewChild<HTMLElement>('restoreScrollPosition');
  public allLocationsReceived = false;
  public cookiesAgreementService = inject(CookiesAgreementService);
  private needScrollAfterRedirect = true;
  // public myBlockAboutScroll: { [key: string]: number } = {};

  constructor(
    @Optional() public mobileDetectService: MobileDetectService,
    private readonly locationsService: LocationsService, // модификатор readonly, примененный к параметрам конструктора, заставляет компилятор расценивать их как поля класса (также как и модификаторы доступа private, public, protected).
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: GlobalModalService,
    @Inject(DOCUMENT) private readonly myDocument: Document,
    public vc: ViewportScroller,
    private cd: ChangeDetectorRef
  ) {
    
    this.filteredLocations = this.allLocations.cityPlaceList;

    const scrollingPosition: Signal<[number, number] | null> = toSignal(
      inject(Router).events.pipe(
        filter((event): event is Scroll => event instanceof Scroll),
        map((event: Scroll) => event.position),
      ),
    );

    effect(() => {
      if (this.scrollingRef() && scrollingPosition()) {
        this.vc.scrollToPosition(scrollingPosition()!);
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
  }

  public get getSomething(): string {
    console.log('getSomething');
    return 'Контент';
  }

  ngAfterViewInit(): void {
    this.addEventListenerToPage();
  }

  private addEventListenerToPage(): void {
    const myWindow = this.myDocument.defaultView; // defaultView - свойство которое возвращает окно, связанное с текущим документом. Это аналогия встроенного в браузер глобального объекта window
    this.pageScrollSub = fromEvent(myWindow, 'scroll')
      .pipe(
        skipWhile(() => this.isLoading()),
        auditTime(200)
      )
      .subscribe({
        next: () => {
          this.operateHeaderState();
          this.operateScrollToTopBtnState();
        }
      });
  }

  private operateHeaderState() {
    const [curScrollLeft, curScrollTop] = this.vc.getScrollPosition();
    // console.log('cur:', curScrollTop);
    // console.log('prev:', this.prevScrollTop);

    if (curScrollTop > this.prevScrollTop || curScrollTop < 100) {
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

    this.prevScrollTop = curScrollTop;
    // this.cd.detectChanges();
  }

  private operateScrollToTopBtnState(): void {
    const [curScrollLeft, curScrollTop] = this.vc.getScrollPosition();
    // const myBody: HTMLBodyElement = this.myDocument.activeElement as HTMLBodyElement;
    const myHtml: HTMLHtmlElement = this.myDocument.documentElement as HTMLHtmlElement;
    const myWindow: Window = this.myDocument.defaultView;
    const svgCircleElement = this.progressCircle?.nativeElement as SVGCircleElement;
    if (svgCircleElement) {
      const pageHeight = Math.max(myHtml.scrollHeight, myHtml.offsetHeight, myHtml.clientHeight);  // высота всей страницы, где document.documentElement.clientHeight - высота видимой части документа за вычетом полосы прокрутки и адресной строки (как будто она видна "svh")
      const innerHeight = myWindow.innerHeight; // высота окна (тут учитывается видна/скрыта адресная строка и включает в себя полосу прокрутки)
      const prevState = this.hideScrollProgress;
      this.hideScrollProgress = curScrollTop < innerHeight;
      const futureState = this.hideScrollProgress;
      const radius = svgCircleElement.getAttribute('r');

      // this.myBlockAboutScroll = { pageHeight, innerHeight, scrollTop: curScrollTop }

      const circleLength = 2 * Math.PI * +radius;
      let percentageProgress = Math.round(curScrollTop / (pageHeight - innerHeight) * 100);
      if (percentageProgress > 100) percentageProgress = 100;
      svgCircleElement.setAttribute('stroke-dasharray', String(circleLength));
      svgCircleElement.setAttribute('stroke-dashoffset', String(circleLength - circleLength * percentageProgress / 100));
      if (!this.hideScrollProgress && false) { // для отображения прогрессбара внутри кнопки
        this.cd.detectChanges();
        // UPD: для того чтобы обновить прогрессбар внутри кнопки не нужно запускать обнаружение изменений, оно и так обновляется
      } else if (prevState !== futureState) { // для того чтобы показать/скрыть кнопку
        this.cd.detectChanges();
      }
    }
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
    this.isSorting.set(true); // Включаем скелетон

    setTimeout(() => {
      this.filteredLocations = this.allLocations.cityPlaceList;
      this.router.navigate(
        [],
        {
          queryParams: { country: null },
          replaceUrl: true,
          queryParamsHandling: 'merge'
        }
      );
      console.log(`Успешно отфильтровали!`);
      this.toastService.success('Отфильтровано');
      this.isSorting.set(false);
      if (this.sortFieldOptions.items.length) this.filterBarGroup.get('sort').enable({ emitEvent: false });
      this.cd.detectChanges(); // Не случалась перерисовка страницы на моках поэтому пришлось прибегнуть к detectChanges
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

    if (this.amountAllSelectedCities.length) {

      const qParams = encodeURIComponent(this.amountAllSelectedCities.join(',').toLowerCase());

      this.router.navigate(
        [],
        {
          queryParams: { country: qParams },
          replaceUrl: true,
          queryParamsHandling: 'merge'
        }
      );
    } else {
      this.router.navigate(
        [],
        {
          queryParams: { country: null },
          replaceUrl: true,
          queryParamsHandling: 'merge'
        }
      );
    }

    console.log(`Успешно отфильтровали!`);
    this.toastService.success('Отфильтровано');
    this.isSorting.set(false);
    if (this.sortFieldOptions.items.length) this.filterBarGroup.get('sort').enable({ emitEvent: false });
    this.cd.detectChanges(); // Эта команда нужна для перерисовки страницы на моках, я не разобрался почему она не перерисовывалась (но это точно из-за пустого filteredLocations)
  }

  private sortLocationsOnFront(): void {

    const sortControlVal = this.filterBarGroup?.get('sort')?.value;
    const sorted = this.sortingMethod(sortControlVal, this.allLocations.cityPlaceList);

    if (sorted) {
      const sortQParam = encodeURIComponent(sortControlVal.toLowerCase());
      this.router.navigate(
        [],
        {
          queryParams: { sorting: sortQParam },
          replaceUrl: true,
          queryParamsHandling: 'merge'
        }
      );
      const selectedSortDetail = this.sortFieldOptions.items.find(item => item.value.toLowerCase() === sortControlVal.toLowerCase())?.details;

      console.log(`Успешно отсортировали (${sortControlVal})!`);
      this.toastService.success(selectedSortDetail || 'Отсортировано');
      this.setIconForSortDropdown(sortControlVal);
    } else {
      this.toastService.warning('Ошибка сортировки :(');
      this.setIconForSortDropdown(null);
      this.sortFieldOptions.items.map((item) => {
        delete item.selected;
        return item;
      });
    }

    this.filterBarGroup.get('sort').enable({ emitEvent: false });
    this.isSorting.set(false);

  }

  private sortingMethod(sortVal: string, listForSort: any[]): boolean {
    let sorted = false;
    if (sortVal === 'PRICE_ASC') {
      console.log('Сортируем от меньшего к большему');
      listForSort.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return a.priceRange - b.priceRange;
          })
        }
      });
      sorted = true;
    } else if (sortVal === 'PRICE_DESC') {
      console.log('Сортируем от большего к меньшему');
      listForSort.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return b.priceRange - a.priceRange;
          })
        }
      });
      sorted = true;
    } else if (sortVal === 'RATING_DESC') {
      console.log('Сортируем по рейтингу');
      listForSort.forEach(el => {
        if (el.placeList?.length) {
          el.placeList.sort((a, b) => {
            return b.rating - a.rating;
          })
        }
      });
      sorted = true;
    }
    return sorted;
  }

  private getCategories(): void {
    if (false) {
      const stream$ = new Observable((observer: Observer<Array<ILocationCategories>>) => {
        console.warn('categorGet пошел');
        setTimeout(() => {
          // observer.next({})
          // observer.next(null)
          if (this.curLang === 'KZ') {
            console.warn('categorGet error!');
            observer.error('Error');
          } else {
            console.warn('categorGet ок!');
            observer.next([
              {
                "code": "RESTAURANTS",
                "title": "Еда",
                "subcategoryList": [
                  {
                    "title": "string",
                    "code": "string"
                  }
                ]
              },
              {
                "code": "ART",
                "title": "Искусство",
                "subcategoryList": [
                  {
                    "title": "string",
                    "code": "string"
                  }
                ]
              },
              {
                "code": "PARKS",
                "title": "Природа",
                "subcategoryList": [
                  {
                    "title": "string",
                    "code": "string"
                  }
                ]
              }
            ]);
          }
        }, 2000)
      })

      this.sSub = stream$
        .pipe(
          tap(val => {
            if (!val?.length) {
              throw new Error('Пустой список категорий!');
            }
          })
        )
        .subscribe({
          next: value => {
            let queryParams = this.route.snapshot.queryParams;
            this.categoryCodes.selected = value[0].code;

            if (queryParams.category) {
              let detectedEl = value.find(item => item.code.toLowerCase() === queryParams.category.toLowerCase());
              if (detectedEl) {
                detectedEl.active = true;
                this.categoryCodes.selected = detectedEl.code;
              } else {
                value[0].active = true;
              }
            } else {
              value[0].active = true;
            }

            this.categoryCodes.list = value;
            this.disabledLocationCategories.set(false);
            this.locationCategoriesWithSkeleton.set(false);
            
            this.getAllOptionsAfterCategories();
          },
          error: err => {
            let selectedMockCategory = this.categoryCodes.list[0];
            selectedMockCategory.active = true;
            this.categoryCodes.selected = selectedMockCategory.code;
            this.locationCategoriesWithSkeleton.set(false);
            this.getAllOptionsAfterCategories();
          }
        });
    } else {
      this.locationsService.getCategoryOptions()
        .pipe(
          takeUntil(this.destroy$),
          // delay(4000),
          tap(val => {
            if (!val?.length) {
              throw new Error('Пустой список категорий!');
            }
          })
        )
        .subscribe(
          value => {
            let queryParams = this.route.snapshot.queryParams;
            this.categoryCodes.selected = value[0].code;

            if (queryParams.category) {
              let detectedEl = value.find(item => item.code.toLowerCase() === queryParams.category.toLowerCase());
              if (detectedEl) {
                detectedEl.active = true;
                this.categoryCodes.selected = detectedEl.code;
              } else {
                value[0].active = true;
              }
            } else {
              value[0].active = true;
            }

            this.categoryCodes.list = value;
            this.disabledLocationCategories.set(false);
            this.locationCategoriesWithSkeleton.set(false);
            this.getAllOptionsAfterCategories();
          },
          () => {
            let selectedMockCategory = this.categoryCodes.list[0];
            selectedMockCategory.active = true;
            this.categoryCodes.selected = selectedMockCategory.code;
            this.locationCategoriesWithSkeleton.set(false);
            this.getAllOptionsAfterCategories();
          }
        );
    }
  }

  private getAllOptionsAfterCategories(): void {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.sorting && queryParams.country) { // если есть сортировка и фильтрация в query params
      this.allOptionsSub = forkJoin({
        sort: this.getSortOptionsWrapper().pipe(catchError(() => of(null))),
        filter: this.locationsService.getFilterOptions(this.categoryCodes.selected).pipe(catchError(() => of(null))),
        data: this.locationsService.getAllLocations(null, null, this.categoryCodes.selected).pipe(catchError(() => of('error')))
      }).subscribe({
        next: value => this.sortAndFilterInParams(value)
        // error: err => console.log(err)
        // complete: () => console.log('This is how it ends!'),
      });
    } else if (queryParams.sorting) { // если есть только сортировка в query params
      this.getFilters();
      this.allOptionsSub = forkJoin({
        sort: this.getSortOptionsWrapper().pipe(catchError(() => of(null))),
        data: this.locationsService.getAllLocations(null, null, this.categoryCodes.selected).pipe(catchError(() => of('error')))
      })
        // .pipe(catchError(error => of('error')))
        .subscribe({
          next: value => this.onlySortInParams(value)
        });
    } else if (queryParams.country) { // если есть только фильтрация в query params
      this.getSort();
      this.allOptionsSub = forkJoin({
        filter: this.locationsService.getFilterOptions(this.categoryCodes.selected).pipe(catchError(() => of(null))),
        data: this.locationsService.getAllLocations(null, null, this.categoryCodes.selected).pipe(catchError(() => of('error')))
      }).subscribe({
        next: value => this.onlyFilterInParams(value)
      });
    } else {
      this.getSort();
      this.getFilters();
      this.getAllLocations();
    }
  }

  private sortAndFilterInParams(resp: { sort: any, filter: Array<CountryFilterItem>, data: any }) {
    // сначала проверяем сортировку:
    if (resp.sort?.length) {
      if (resp.data === 'error') {
        // кейс когда сортировка ок, а локации с ошибкой
        this.filterBarGroup.get('sort').enable({ emitEvent: false });
        this.sortFieldOptions.items = resp.sort;
        this.isEmptySortOptions.set(false);
      } else {
        // кейс когда и сортировка ок и локации ок
        const queryParams = this.route.snapshot.queryParams;
        const sortingValFromQParams = queryParams.sorting;
        const sortingMatch = resp.sort.find(sortItem => sortItem.value.toLowerCase() === sortingValFromQParams.toLowerCase());

        if (sortingMatch) {
          // для сортировки:
          this.filterBarGroup.get('sort').setValue(sortingMatch.value, { emitEvent: false });
          sortingMatch.selected = true;
          this.setIconForSortDropdown(sortingMatch.value);

          // для локаций:
          this.sortingMethod(sortingMatch.value, resp.data.cityPlaceList);
        }

        // для сортировки:
        this.filterBarGroup.get('sort').enable({ emitEvent: false });
        this.sortFieldOptions.items = resp.sort;
        this.isEmptySortOptions.set(false);
      }
    } else {
      console.error('Ошибка при получении сортировки или список сортировки пришел пустой');
      this.isEmptySortOptions.set(true);
    }
    // теперь проверяем фильтрацию:
    if (resp.filter?.length) {
      if (resp.data === 'error') {
        // кейс когда фильтрация ок, а локации с ошибкой

        // для фильтрации:
        this.filterFieldOptions = resp.filter?.filter(el => el.cityList?.length);

        // для локаций:
        this.allLocations = this.filteredLocations = null;
        this.isLoading.set(false);
      } else {
        // кейс когда и фильтрация ок и локации ок

        const queryParams = this.route.snapshot.queryParams;
        const filterValFromQParams: string = queryParams.country;
        const decodeFilterValFromQParams = decodeURIComponent(filterValFromQParams);
        const splitFilterValFromQParams = decodeFilterValFromQParams.split(','); // пункты фильтрации (города) из queryParams

        let filterFromResp = resp.filter?.filter(el => el.cityList?.length);

        splitFilterValFromQParams.forEach((valFromQParams: string) => {
          let match = false;
          outer: for (let country of filterFromResp) {
            for (let city of country.cityList) {
              if (city.code.toLowerCase() === valFromQParams.toLowerCase()) {
                this.setSelectedCity(country, city);
                match = true;
                break outer;
              }
            }
          }

          if (!match) {
            console.log(`Мэтча не случилось для "${valFromQParams}" из queryParams`);
            // это значит что не случилось полного совпадения городов из queryParams и response фильтрации, точнне не все города из queryParams были найдены в респонсе
            this.needScrollAfterRedirect = false;
          }
        });

        // для фильтрации:
        this.filterFieldOptions = filterFromResp;

        // для локаций:
        this.allLocationsReceived = true;
        this.allLocations = resp.data;
        if (this.amountAllSelectedCities.length) { // если что-то нафильтровали выше
          this.filteredLocations = this.allLocations.cityPlaceList.filter(city => {
            return city.cityCode in this.selectedCitiesMap;
          });
          // const notMobileWidth = document.documentElement.clientWidth >= 768;
          // if (notMobileWidth) {
          //   this.showFilterControls.set(true);
          // }
        } else {
          this.filteredLocations = this.allLocations.cityPlaceList;
        }
        this.isLoading.set(false);
      }
    } else {
      if (resp.data === 'error') {
        // кейс когда и фильтрация с ошибкой и локации с ошибкой
        this.allLocations = this.filteredLocations = null;
        this.isLoading.set(false);
      } else {
        // кейс когда фильтрация с ошибкой, а локации ок
        this.allLocationsReceived = true;
        this.allLocations = resp.data;
        this.filteredLocations = resp.data?.cityPlaceList;
        this.isLoading.set(false);
      }
    }
  }

  private onlySortInParams(resp: { sort: any, data: any }) {
    if (resp.sort?.length) {

      if (resp.data === 'error') {
        // кейс когда сортировка ок, а локации с ошибкой

        this.filterBarGroup.get('sort').enable({ emitEvent: false });
        this.sortFieldOptions.items = resp.sort;
        this.isEmptySortOptions.set(false);

        this.allLocations = this.filteredLocations = null;
        this.isLoading.set(false);
      } else {
        // кейс когда и сортировка ок и локации ок

        const queryParams = this.route.snapshot.queryParams;
        const sortingValFromQParams = queryParams.sorting;
        const sortingMatch = resp.sort.find(sortItem => sortItem.value.toLowerCase() === sortingValFromQParams.toLowerCase());

        if (sortingMatch) {

          // для сортировки:
          this.filterBarGroup.get('sort').setValue(sortingMatch.value, { emitEvent: false });
          sortingMatch.selected = true;
          this.setIconForSortDropdown(sortingMatch.value);

          // для локаций:
          this.sortingMethod(sortingMatch.value, resp.data.cityPlaceList);
        }

        // для сортировки:
        this.filterBarGroup.get('sort').enable({ emitEvent: false });
        this.sortFieldOptions.items = resp.sort;
        this.isEmptySortOptions.set(false);

        // для локаций:
        this.allLocationsReceived = true;
        this.allLocations = resp.data;
        this.filteredLocations = resp.data?.cityPlaceList;
        this.isLoading.set(false);
        
      }

    } else {

      if (resp.data === 'error') {
        // кейс когда и сортировка с ошибкой и локации с ошибкой
        this.allLocations = this.filteredLocations = null;
        this.isLoading.set(false);
      } else {
        // кейс когда сортировка с ошибкой, а локации ок
        this.allLocationsReceived = true;
        this.allLocations = resp.data;
        this.filteredLocations = resp.data?.cityPlaceList;
        this.isLoading.set(false);
      }

      console.error('Ошибка при получении сортировки или список сортировки пришел пустой');
      this.isEmptySortOptions.set(true);
    }
  }

  private onlyFilterInParams(resp: { filter: Array<CountryFilterItem>, data: any }) {
    if (resp.filter?.length) {
      if (resp.data === 'error') {
        // кейс когда фильтрация ок, а локации с ошибкой

        // для фильтрации:
        this.filterFieldOptions = resp.filter?.filter(el => el.cityList?.length);

        // для локаций:
        this.allLocations = this.filteredLocations = null;
        this.isLoading.set(false);
      } else {
        // кейс когда и фильтрация ок и локации ок

        const queryParams = this.route.snapshot.queryParams;
        const filterValFromQParams: string = queryParams.country;
        const decodeFilterValFromQParams = decodeURIComponent(filterValFromQParams);
        const splitFilterValFromQParams = decodeFilterValFromQParams.split(','); // пункты фильтрации (города) из queryParams

        let filterFromResp = resp.filter?.filter(el => el.cityList?.length);

        splitFilterValFromQParams.forEach((valFromQParams: string) => {
          let match = false;
          outer: for (let country of filterFromResp) {
            for (let city of country.cityList) {
              if (city.code.toLowerCase() === valFromQParams.toLowerCase()) {
                this.setSelectedCity(country, city);
                match = true;
                break outer;
              }
            }
          }

          if (!match) {
            console.log(`Мэтча не случилось для "${valFromQParams}" из queryParams`);
            // это значит что не случилось полного совпадения городов из queryParams и response фильтрации, точнне не все города из queryParams были найдены в респонсе
            this.needScrollAfterRedirect = false;
          }
        });

        // для фильтрации:
        this.filterFieldOptions = filterFromResp;

        // для локаций:
        this.allLocationsReceived = true;
        this.allLocations = resp.data;
        if (this.amountAllSelectedCities.length) { // если что-то нафильтровали выше
          this.filteredLocations = this.allLocations.cityPlaceList.filter(city => {
            return city.cityCode in this.selectedCitiesMap;
          });
          // const notMobileWidth = document.documentElement.clientWidth >= 768;
          // if (notMobileWidth) {
          //   this.showFilterControls.set(true);
          // }
        } else {
          this.filteredLocations = this.allLocations.cityPlaceList;
        }
        this.isLoading.set(false);
      }
    } else {
      if (resp.data === 'error') {
        // кейс когда и фильтрация с ошибкой и локации с ошибкой
        this.allLocations = this.filteredLocations = null;
        this.isLoading.set(false);
      } else {
        // кейс когда фильтрация с ошибкой, а локации ок
        this.allLocationsReceived = true;
        this.allLocations = resp.data;
        this.filteredLocations = resp.data?.cityPlaceList;
        this.isLoading.set(false);
      }
    }
  }

  private afterChangeCategory(): void {

    // Строки ниже это для сброса всего связанного с фильтрацией
    this.amountAllSelectedCities = [];
    this.selectedCitiesMap = {};
    this.showScroll();
    this.showFilterControls.set(false);
    this.filterFieldOptions = null;

    // Ниже 4 строки это для сброса всего связанного с FormControl-ом сортировки
    this.filterBarGroup.get('sort').setValue(null, { emitEvent: false });
    this.filterBarGroup.get('sort').disable({ emitEvent: false });
    this.sortFieldOptions.items = [];
    this.setIconForSortDropdown(null);

    // Отписываемся от всех запросов:
    this.subscriptionList();

    // Снова запрашиваем локации, фильтрацию и сортировку:
    this.retryGetAllLocations();
  }

  private getSort(): void {
    if (false) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('sortGet пошел');
        setTimeout(() => {
          if (this.curLang === 'UZ' || this.categoryCodes.selected === 'ART') {
            console.warn('sortGet error!');
            observer.error('Error');
            // observer.next({})
            // observer.next(null)
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
            if (resp?.length) {
              resp = resp.filter(el => el && Object.keys(el).length);
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
            if (value?.length) {
              this.filterBarGroup.get('sort').enable({ emitEvent: false });
              this.sortFieldOptions.items = value;
              this.isEmptySortOptions.set(false);
              this.cd.detectChanges();
            } else {
              console.log('Список сортировки пришел пустой');
              this.isEmptySortOptions.set(true);
            }
          },
          () => {
            console.error('Ошибка при получении сортировки');
            this.isEmptySortOptions.set(true);
          }
        );
    } else {
      this.sSub = this.getSortOptionsWrapper()
        .subscribe(
          (value: Array<{ details: string, value: string }>) => {
            if (value?.length) {
              this.filterBarGroup.get('sort').enable({ emitEvent: false });
              // value.map(el => {
              //   el.details = el.details.replace(/->/g,'→');
              //   return el;
              // });
              this.sortFieldOptions.items = value;
              this.isEmptySortOptions.set(false);
              this.cd.detectChanges();
            } else {
              console.log('Список сортировки пришел пустой');
              this.isEmptySortOptions.set(true);
            }
          },
          () => {
            console.error('Ошибка при получении сортировки');
            this.isEmptySortOptions.set(true);
          }
        );
    }
  }

  private getSortOptionsWrapper(): Observable<Array<{ details: string, value: string }>> {
    return this.locationsService.getSortOptions(this.categoryCodes.selected)
      .pipe(
        // delay(4000),
        // tap((val) => console.log(val)),
        // map(() => []),
        map((resp: Array<{ title?: string, code?: string, details?: string, value?: string }>): any => {
          if (resp?.length) {
            resp = resp.filter(el => el && Object.keys(el).length);
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
  }

  private getFilters(): void {
    if (false) {
      const stream$ = new Observable((observer: Observer<Array<CountryFilterItem>>) => {
        console.warn('filterGet пошел');
        setTimeout(() => {
          if (this.curLang === 'KZ' || this.categoryCodes.selected === 'ART') {
            console.warn('filterGet error!');
            observer.error('Error');
            // observer.next({})
            // observer.next(null)
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
            this.cd.detectChanges();
          },
          () => {
            console.error('Ошибка при получении фильтрации');
          }
        );
    } else {
      this.fSub = this.locationsService.getFilterOptions(this.categoryCodes.selected)
        // .pipe(delay(2000))
        .subscribe(
          (value: Array<CountryFilterItem>) => {
            this.filterFieldOptions = value?.filter(el => el.cityList?.length);
            this.cd.detectChanges();
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
    if (this.disabledLocationCategories()) {
      this.getCategories();
    } else {
      this.getAllLocations();
      if (!this.sortFieldOptions.items.length) {
        console.log('Нет сортировки или нужна новая, запросим ее снова');
        this.getSort();
      }
      if (!this.filterFieldOptions?.length) {
        console.log('Нет фильтрации или нужна новая, запросим ее снова');
        this.getFilters();
      }
    }
  }

  // Todo: надо проверить что будет если придет пустой моковый список локаций
  private getAllLocations(): void {
    this.isLoading.set(true);
    if (0) {
      const stream$ = new Observable((observer: Observer<any>) => {
        console.warn('locationsGet пошел');
        setTimeout(() => {
          if (this.errorInGetAllLocations) {
            console.warn('locationsGet что-то пошло не так :(');
            // observer.next({});
            // observer.next(null);
            observer.error('Error');
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
            this.isLoading.set(false);
          },
          () => {
            this.allLocations = this.filteredLocations = null;
            this.isLoading.set(false);
          }
        );

    } else {
      this.locationsSub = this.locationsService.getAllLocations(null, null, this.categoryCodes.selected)
        // .pipe(delay(2000))
        .subscribe({
          next: value => {
            // console.log(value);
            // let locationsForYmap = value.cityPlaceList.map(el1 => el1.placeList).flat();
            // console.log(locationsForYmap);

            this.allLocationsReceived = true;

            this.allLocations = value;
            this.filteredLocations = value?.cityPlaceList;
            this.isLoading.set(false);
          },
          error: () => {
            this.allLocations = this.filteredLocations = null;
            this.isLoading.set(false);
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
            this.isSorting.set(false);
          },
          () => {
            this.locationsUpdating = false;
            console.error('Ошибка при получении отсортированных локаций! Поэтому не обновляем порядок локаций и берем предыдущее успешное значение сортировки');
            this.toastService.warning('Ошибка сортировки, попробуйте еще раз');
            this.filterBarGroup.get('sort').enable({ emitEvent: false });
            this.filterBarGroup.get('sort').setValue(this.lastSuccessSortVal, { emitEvent: false });
            // this.filterBarGroup.get('sort').reset(null, { emitEvent: false }); // или тут можно будет установить последнее успешное значение сортировки
            this.setIconForSortDropdown(this.lastSuccessSortVal);
            this.isSorting.set(false);
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
            this.isSorting.set(false);
            if (this.sortFieldOptions.items.length) this.filterBarGroup.get('sort').enable({ emitEvent: false }); // Эти 2 подстраховки на случай когда начали соритровать и сразу принялись фильтровать
            if (this.filterBarGroup.get('sort').value) this.setIconForSortDropdown(this.filterBarGroup.get('sort').value);
          },
          () => {
            this.locationsUpdating = false;
            console.error('Ошибка при фильтрации, сбрасываем фильтрацию/сортировку и запрашиваем чистый список локаций');
            this.toastService.warning('Ошибка фильтрации, попробуйте еще раз');
            this.isSorting.set(false);
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
    this.showFilterControls.set(false);

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
      this.modalService.open({ component: 'appComponent', modalName: 'qrModal' });
    }
  }

  public qrModalOrTelegram(): void {
    if (this.mobileDetectService?.osDevice) {
      this.mobileDetectService.goToTelegramChannel();
    } else {
      this.modalService.open({ component: 'appComponent', modalName: 'qrForTelegram' });
    }
  }

  public openQRModalAdvanced(): void {
    if (this.mobileDetectService?.osDevice) {
      this.mobileDetectService.goToDeviceStore();
    } else {
      this.modalService.open({ component: 'appComponent', modalName: 'qrModal' });
    }
  }

  public getContent(key: string): string {
    return langArr[key][this.curLang];
  }

  public onChangeSort(sortValue: string): void {
    this.isSorting.set(true);
    this.filterBarGroup.get('sort').disable({ emitEvent: false });
    this.fakeDelayForSort = setTimeout(() => this.sortLocationsOnFront(), 1600);
  }

  public onCloseFilterOptionsInMobile(): void {
    this.showScroll('noScrollInMobile');
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
      this.showFilterControls.set(false);
    }
  }

  private setIconForSortDropdown(sortValue: string): void {
    if (sortValue) {
      this.dropdownHeadForSortSelected = true;
    } else {
      this.dropdownHeadForSortSelected = false;
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

    this.showScroll('noScrollInMobile');
    this.showFilterControls.set(false);

    if (arrBefore.length === arrAfter.length && this.isArraysEqual(arrBefore, arrAfter)) {
      console.log('He фильтруем города, выбор не изменился!');
    } else {
      console.log('Делаем фильтрацию городов...');
      this.isSorting.set(true);
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
    this.showFilterControls.set(!this.showFilterControls());
    const isOpen = this.showFilterControls();
    if (isOpen) {
      this.hideScroll('noScrollInMobile'); // для компа это не имеет значения а для телефона это важно (подробности см. в notes.md). Upd: после рефакторинга уже имеет значение
    } else {
      this.showScroll('noScrollInMobile');
    }

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
      this.setSelectedCity(linkToCountry, linkToCity);
    }

    const mobileWidth = document.documentElement.clientWidth < 768;

    if (!mobileWidth) {
      this.filterBarGroup.get('sort').disable({ emitEvent: false });
      if (this.locationsUpdating) { // Если фильтрация в данный момент идет тогда запускаем новую без задержки
        console.log('Делаем фильтрацию...');
        this.isSorting.set(true);
        // this.filterBarGroup.get('sort').disable({ emitEvent: false });
        this.fakeDelayForFilter = setTimeout(() => this.filterLocationsOnFront(), 1600);
      } else {
        if (this.debounceTimeForFilter) { // Это задержка, чтоб не отправлять запрос при каждом клике по фильтрации
          clearTimeout(this.debounceTimeForFilter);
        }

        this.debounceTimeForFilter = setTimeout(() => {
          this.debounceTimeForFilter = null;
          console.log('Делаем фильтрацию...');
          this.isSorting.set(true);
          this.filterBarGroup.get('sort').disable({ emitEvent: false }); // Если это убрать то контрол раздизейблится если запустить сортировку и быстро запустить фильтрацию
          this.fakeDelayForFilter = setTimeout(() => this.filterLocationsOnFront(), 1600);
        }, 1500);
      }
    }
  }

  private setSelectedCity(linkToCountry: CountryFilterItem, linkToCity: any): void {
    linkToCity.selected = true;
    if (!linkToCountry.selectedСities?.length) { linkToCountry.selectedСities = [] };
    linkToCountry.selectedСities.push(linkToCity.code);
    this.amountAllSelectedCities.push(linkToCity.code);
    this.selectedCitiesMap[linkToCity.code] = 'chosen';
  }

  public getAmountOfAllSelectedCities(): string {
    return this.amountAllSelectedCities.length ? `Показан ${this.amountAllSelectedCities.length} из 20 городов` : 'Показаны все города'
  }

  public onChangeCurCategory(categoryItem: ILocationCategories): void {

    if (this.categoryCodes.selected.toLowerCase() === categoryItem.code.toLowerCase()) return;

    this.router.navigate(
      [],
      {
        queryParams: { category: categoryItem.code.toLowerCase(), country: null, sorting: null },
        replaceUrl: true,
        queryParamsHandling: 'merge'
      }
    );
    
    this.setActiveCategory(categoryItem);
    this.afterChangeCategory();
  }

  private setActiveCategory(curCategory: ILocationCategories) {
    this.categoryCodes.selected = curCategory.code;
    // сначала у всех категорий убираем active:
    this.categoryCodes.list = this.categoryCodes.list.map(el => {
      delete el.active;
      return el;
    });
    // а выбранной ставим active = true:
    curCategory.active = true;
  }

  public sortDropdownState(open: boolean): void {
    // const pageWrap = document.getElementById('pageWrap');
    if (open) {
      this.hideBecauseOpenSort = true;
      this.hideScroll('noScrollInMobile');
      // pageWrap.style.overflow = 'hidden';
    } else {
      this.hideBecauseOpenSort = false;
      this.showScroll('noScrollInMobile');
      // pageWrap.style.overflow = '';
    }
  }

  public goToLocationDesc(pageName: string): void {
    if (this.isSorting() || this.isLoading()) return;

    console.log('Идем к подробностям выбранной локации')
    window.open(`/locations/${pageName || 'pageName'}`);

    // this.router.navigate(['/locations', pageName || 'pageName'])
    //   // .then(
    //   //   (success: boolean) => {
    //   //     console.log(success)
    //   //   }
    //   // )

  }

  private hideScroll(className = 'noScroll'): void {
    document.documentElement.classList.add(className);
  }

  private showScroll(className = 'noScroll'): void {
    document.documentElement.classList.remove(className);
  }

  private subscriptionList(): void {
    this.locationsSub?.unsubscribe();
    this.locationsAfterFilterSub?.unsubscribe();
    this.locationsAfterSortSub?.unsubscribe();
    this.fSub?.unsubscribe();
    this.sSub?.unsubscribe();
    this.allOptionsSub?.unsubscribe();
    clearTimeout(this.debounceTimeForFilter);
    clearTimeout(this.fakeDelayForFilter);
    clearTimeout(this.fakeDelayForSort);
  }

  public ngOnDestroy(): void {
    this.subscriptionList();

    this.pageScrollSub?.unsubscribe();

    this.destroy$.next(true);
    this.destroy$.complete();

    this.showScroll('noScrollInMobile');
  }

}
