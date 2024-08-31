import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { allRatingName, locationInfoMapping } from '@app/shared/constants/all.constants';
import { IVotingService, PlaceAttributeList, PlaceDetails, TypeOfPlaceDetails } from '@app/shared/interfaces';
import { LocationsService } from '@app/shared/services/locations.service';
import { PagesService } from '@app/shared/services/pages.service';
import { ToastService } from '@app/shared/services/toast.service';
import { Subscription, of, pipe } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html',
  styleUrls: ['./place-page.component.scss']
})
export class PlacePageComponent {

  @ViewChild('inputInGalleria') inputInGalleria: ElementRef;

  private lSub: Subscription;
  private placeSub: Subscription;
  private vSub: Subscription;
  public locationInfoName = locationInfoMapping;
  public isLoading = true;
  public placeData: PlaceDetails;
  public placeEvaluation: 'like' | 'dislike';
  public votingIsLoading = false;
  public additPlaceInfoItems: Array<PlaceAttributeList> = [];
  public additPlaceInfoData: { [key: string]: PlaceAttributeList } = {};
  public additPlaceInfoTypes: Array<TypeOfPlaceDetails> = [TypeOfPlaceDetails.hours, TypeOfPlaceDetails.map, TypeOfPlaceDetails.phone];
  public descPlaceInfoTypes: Array<TypeOfPlaceDetails> = [TypeOfPlaceDetails.description, TypeOfPlaceDetails.awards, TypeOfPlaceDetails.infoSource];
  public locationRatingList: Array<{ name: string, value: number }> = [];

  // public showSpinnerUnderPhoto = true;
  // public amountLoadedPhotos = 0;

  public curPhotoInGalleria = 0;
  public showPhotoGalleria = false;

  private initSwipePoint: Touch;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private locationsService: LocationsService,
    private router: Router,
    private toastService: ToastService
  ) { }

  public get getAdditInfoKeys(): Array<string> {
    return Object.keys(this.additPlaceInfoData);
  }

  get curPageScale(): number {
    return window.visualViewport.scale; // масштаб страницы
  }

  ngOnInit(): void {

    this.lSub = this.pagesService.currentLanguage.subscribe(
      lang => {
        if (!this.isLoading) {
          this.isLoading = true;
          this.locationsService.getByPageName(this.placeData.pageName)
            .subscribe(
              (place: PlaceDetails) => {
                this.placeData = place;
                this.isLoading = false;
              }
            );
        }
      }
    );

    this.placeSub = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            // return this.locationsService.getById(params['title']);
            return this.locationsService.getByPageName(params['title']);
          }
        ),
        // delay(8000),
        // catchError(err => {
        //   this.isLoading = false;
        //   return of(null);
        // })
      )
      .subscribe(
        (place: PlaceDetails) => {
          this.placeData = place;
          if (place) this.getEvaluation();
          // delete place.imageList;
          // place.imageList = null;
          // place.imageList = [];
          // place.imageList[0].href = null;
          // place.imageList.splice(3);
          // delete place.rating2GIS;
          if (false) {
            place.attributeList = [
              {
                "group": 10,
                "type": TypeOfPlaceDetails.hours,
                "value": "Без перерыва",
                "href": null
              },
              {
                "group": 20,
                "type": TypeOfPlaceDetails.phone,
                "value": null,
                "href": null
              },
              {
                "group": 20,
                "type": TypeOfPlaceDetails.phone,
                "value": "+7(905)786-14-94 ",
                "href": { phone: 'tel:+79057861494' }
              },
              {
                "group": 10,
                "type": TypeOfPlaceDetails.cuisine,
                "value": "Грузинская",
                "href": null
              },
              {
                "group": 10,
                "type": TypeOfPlaceDetails.hours,
                "value": "Пн – пт: с 08:00 до 23:00\nСб, вс: с 09:00 до 23:00",
                "href": null
              },
              {
                "group": 10,
                "type": TypeOfPlaceDetails.description,
                "value": "Пельменная нового формата. Заведение излучает ауру доброты и уюта. Даже городские кошки нас любят, и гуляют у нас во дворе. А кошки плохого не посоветуют.",
                "href": null
              },
              {
                "group": 10,
                "type": TypeOfPlaceDetails.description,
                "value": "И вообще тут очень клёво",
                "href": null
              },
              {
                "group": 20,
                "type": TypeOfPlaceDetails.map,
                "value": "Узбекистан, Ташкент, ул. Шота Руставели, 18",
                "href": {
                  "coordinates": {
                    "lat": 41.293721,
                    "lon": 69.264205
                  }
                }
              },
              {
                "group": 20,
                "type": TypeOfPlaceDetails.map,
                "value": "Узбекистан, Ташкент, ул. Абдуллы Каххара, 22",
                "href": {
                  "coordinates": {
                    "lat": 41.285158,
                    "lon": 69.257761
                  },
                  yandexOrgId: 163533281445
                }
              },
              {
                "group": 20,
                "type": TypeOfPlaceDetails.site,
                "value": "testo.uz",
                "href": { link: "https://testo.uz" }
              },
              {
                "group": 30,
                "type": TypeOfPlaceDetails.infoSource,
                "value": "https://testo.uz ",
                "href": null
              },
              {
                "group": 20,
                "type": TypeOfPlaceDetails.phone,
                "value": null,
                "href": null
              },
              {
                "group": 20,
                "type": TypeOfPlaceDetails.phone,
                "value": " +7(968)001-66-22",
                "href": { phone: 'tel:+79680016622' }
              },
              {
                "group": 20,
                "type": TypeOfPlaceDetails.site,
                "value": "caravangroup.uz ",
                "href": { link: "https://caravangroup.uz" }
              },
              {
                "group": 30,
                "type": TypeOfPlaceDetails.awards,
                "value": "Топ-10 лучших ресторанов Ташкента по версии Tripadvisor",
                "href": null
              },
              {
                "group": 30,
                "type": TypeOfPlaceDetails.infoSource,
                "value": "https://www.tripadvisor.com",
                "href": null
              },
              {
                "group": 30,
                "type": TypeOfPlaceDetails.infoSource,
                "value": "https://www.google.ru/maps",
                "href": null
              },
              {
                "group": 30,
                "type": TypeOfPlaceDetails.awards,
                "value": "И есть звезда мишлен",
                "href": null
              }
            ];
          }
          this.prepareLocationRating();
          this.prepareAdditPlaceData(place?.attributeList);
          this.isLoading = false;
        },
        () => {
          this.goToAllPlaces(true);
        }
      );
  }

  public getAddressCoordinates(href: { coordinates: { lat: number, lon: number }, yandexOrgId: number }): string {
    if (href.yandexOrgId) { // Если есть oid организации, то можем открыть ее карточку:
      return 'https://yandex.com/maps/org/' + (href.yandexOrgId || '1738816284');
    } else {
      return 'https://yandex.com/maps?whatshere[zoom]=17&whatshere[point]='
        + (href?.coordinates?.lat ? (href.coordinates.lon + ',' + href.coordinates.lat) : '37.617698,55.755864')
      ;
    }
    // return 'https://maps.yandex.com/?whatshere[zoom]=17&whatshere[point]='
    //   + (href?.coordinates?.lat ? (href.coordinates.lon + ',' + href.coordinates.lat) : '37.617698,55.755864');
  }

  private getEvaluation() {
    const placesRating = JSON.parse(localStorage.getItem('placeEvaluation')) || [];
    const aboutThisPlace = placesRating.find(about => about.placeId === this.placeData.id);
    if (aboutThisPlace) {
      this.placeEvaluation = aboutThisPlace.choice;
    }
  }

  public onTouchmove(touchmoveEvent): void {
    // console.log('onTouchmove', touchmoveEvent);
    // touchmoveEvent.preventDefault();
  }

  public onTouchstart(e): void {
    this.initSwipePoint = e.changedTouches[0]; // Запоминаем коррдинаты пальца user-а в начале свайпа чтоб понимать куда он потом поведет свой палец

    // 1) Touches это список точек (координат точек куда клиент приложил пальцы) на экране, эта проверка нужна для того чтобы избежать переключения картинок когда user попытается приблизить фотку путем раздвижения 2-х пальцев на экране
    // 2) curPageScale - это масштаб страницы. Если масштаб страницы увеличен то мы не должны позволять переключать фотки свайпом
    if (e.touches.length > 1 || this.curPageScale !== 1) {
      this.initSwipePoint = null;
    }
  }

  public onTouchend(touchendEvent): void {

    if (this.initSwipePoint) {

      const finalPoint: Touch = touchendEvent.changedTouches[0];
      // console.log('х до:', +this.initSwipePoint.pageX.toFixed(), ' ,после:', +finalPoint.pageX.toFixed())
      // console.log('y до:', +this.initSwipePoint.pageY.toFixed(), ' ,после:', +finalPoint.pageY.toFixed())
      const xAbs: number = Math.abs(this.initSwipePoint.pageX - finalPoint.pageX);
      const yAbs: number = Math.abs(this.initSwipePoint.pageY - finalPoint.pageY);

      if (xAbs > 15 || yAbs > 100) {
        if (xAbs > yAbs) {
          if (finalPoint.pageX < this.initSwipePoint.pageX) {
            /*СВАЙП ВЛЕВО*/
            console.log('свайп влево');
            this.switchPhotoInGalleria('next');
          } else {
            /*СВАЙП ВПРАВО*/
            console.log('свайп вправо');
            this.switchPhotoInGalleria('prev');
          }
        } else {
          if (finalPoint.pageY < this.initSwipePoint.pageY) {
            console.log('свайп вверх');
          } else {
            console.log('свайп вниз');
            this.closePhotoGalleria()
          }
        }
      }
    }
  }

  public ondDblclick(e) {
    // e.preventDefault();
    // console.log('dblclick');
  }

  public clickByPhotoInGallery(): void {
    const mobileWidth = document.documentElement.clientWidth < 768;
    if (!mobileWidth) this.switchPhotoInGalleria('next');
  }

  // public isLoadPlacePhoto(): void {
  //   this.amountLoadedPhotos += 1;
  //   const amountAllPlacePhoto = +this.placeData.imageList.length;
  //   if (this.amountLoadedPhotos === amountAllPlacePhoto) {
  //     this.showSpinnerUnderPhoto = false;
  //   }
  // }

  public openPhotoGalleria(imgNum: number): void {
    this.curPhotoInGalleria = imgNum;
    this.showPhotoGalleria = true;
    this.hideScroll();
    setTimeout(() => this.inputInGalleria.nativeElement.focus());
  }

  public closePhotoGalleria(): void {
    this.showPhotoGalleria = false;
    this.showScroll();
  }

  public keydownPhotoGalleria(e): void {
    if (e.code === 'ArrowRight') {
      this.switchPhotoInGalleria('next');
    } else if (e.code === 'ArrowLeft') {
      this.switchPhotoInGalleria('prev');
    } else if (e.code === 'Escape') {
      this.closePhotoGalleria();
    }
  }

  public forStopPropagation(e): void {
    e.stopPropagation();
  }

  public switchPhotoInGalleria(direction: 'next' | 'prev') {
    if (direction === 'next') {
      if (this.curPhotoInGalleria === this.placeData.imageList.length - 1) {
        this.curPhotoInGalleria = 0;
      } else {
        this.curPhotoInGalleria += 1;
      }
    } else {
      if (this.curPhotoInGalleria === 0) {
        this.curPhotoInGalleria = this.placeData.imageList.length - 1;
      } else {
        this.curPhotoInGalleria -= 1;
      }
    }
  }

  hideScroll() {
    document.body.classList.add('no-scroll');
  }

  showScroll() {
    document.body.classList.remove('no-scroll');
  }

  private prepareLocationRating(): void {

    // this.locationRatingList = [
    //   { name: 'rating2GIS', value: 4.1 },
    //   { name: 'ratingGoogle', value: 4.7 },
    //   { name: 'ratingTripadvisor', value: 3.9 },
    //   { name: 'ratingYandex', value: 5 }
    // ];

    for (let rating of allRatingName) {
      let value = +this.placeData[rating];
      if (value) {
        this.locationRatingList.push({ value, name: rating });
      }
    }

    this.locationRatingList.sort((a, b) => b.value - a.value);
  }

  private prepareAdditPlaceData(data: Array<PlaceAttributeList> = []): void {
    // let a = data?.find(item => item.type === 'MAP');
    // a.value = 'Балашиха\nФлервоа 4а';
    // this.additPlaceInfoItems = this.additPlaceInfoTypes.map(el => data?.find(item => item.type === el)).filter(empty => empty);

    for (let infoItem of data) {

      // if (infoItem.value) infoItem.value = infoItem.value.replace('\n', '\n');

      if (infoItem.type in this.additPlaceInfoData) { // Если такое свойство уже есть тогда добавляем значение в его value
        if (infoItem.value) {
          const innerData = this.additPlaceInfoData[infoItem.type];

          // if (infoItem.type === TypeOfPlaceDetails.site || infoItem.type === TypeOfPlaceDetails.phone) {
            innerData.value.push(infoItem);
          // } else {
          //   innerData.value = (innerData.value ? innerData.value.trim() + '\n' : '') + infoItem.value.trim();
          // }
        }
      } else {
        if (infoItem.value) {
          this.additPlaceInfoData[infoItem.type] = infoItem;

          // if (infoItem.type === TypeOfPlaceDetails.site || infoItem.type === TypeOfPlaceDetails.phone) {
            this.additPlaceInfoData[infoItem.type].value = [{ ...infoItem }];
            delete this.additPlaceInfoData[infoItem.type].href; // Это не обязательно, просто для красоты
          // }
        }
      }
    }

    // Раньше клали в свойство "PHONE" данные из свойства "SITE",
    // а теперь если с бэка не пришел телефон тогда создаем обертку "PHONE"
    if (TypeOfPlaceDetails.site in this.additPlaceInfoData) {
      let phoneData = this.additPlaceInfoData[TypeOfPlaceDetails.phone];
      // const site = this.additPlaceInfoData[TypeOfPlaceDetails.site];

      if (!phoneData?.value) {
        phoneData = this.additPlaceInfoData[TypeOfPlaceDetails.phone] = {
          type: TypeOfPlaceDetails.phone,
          value: []
        }
      }

      // phoneData.value = (phoneData.value ? phoneData.value + '\n' : '') + site.value;

      // delete this.additPlaceInfoData[TypeOfPlaceDetails.site];
    }

    // Тут ниже превращаем value у "PHONE" в массив
    // const phoneVal = this.additPlaceInfoData[TypeOfPlaceDetails.phone]?.value;
    // if (phoneVal) {
    //   this.additPlaceInfoData[TypeOfPlaceDetails.phone].value = phoneVal.split('\n');
    // }

    // // Тут ниже превращаем value у "SITE" в массив
    // const siteVal = this.additPlaceInfoData[TypeOfPlaceDetails.site]?.value;
    // if (siteVal) {
    //   this.additPlaceInfoData[TypeOfPlaceDetails.site].value = siteVal.split('\n');
    // }

    // Тут ниже превращаем value у "INFO_SOURCE" в массив
    // const infoSourceVal = this.additPlaceInfoData[TypeOfPlaceDetails.infoSource]?.value;
    // if (infoSourceVal) {
    //   this.additPlaceInfoData[TypeOfPlaceDetails.infoSource].value = infoSourceVal.split('\n');
    // }

    // console.log(this.additPlaceInfoData);
  }

  public goToAllPlaces(withMessage = false): void {
    this.router.navigate(
      ['/locations'],
      {
        queryParams: { category: this.placeData?.categoryCode }
      }
    );
    if (withMessage) this.toastService.warning('Не удается открыть локацию :(');
  }

  public onVoting(val: 'like' | 'dislike'): void {
    if (!this.placeEvaluation && !this.votingIsLoading) {
      console.log(`Фиксируем ваш ${val}`);
      this.votingIsLoading = true;
      this.vSub = this.locationsService.setPlaceVotingProd(this.placeData.id, val)
        // .pipe(delay(10000))
        .subscribe(
          (resp: IVotingService) => {
            this.placeData['likeCount'] = resp['likeCount'];
            this.placeData['dislikeCount'] = resp['dislikeCount'];
            this.votingIsLoading = false;
            this.placeEvaluation = val;
            this.setPlaceEvaluationToLS(val);
            console.log(`Зафиксировали ваш выбор!`, this.placeEvaluation);
          },
          () => {
            this.votingIsLoading = false;
          }
        );
      // Тут есть момент как можно обойти LS и наделать много лайков (нужно лайкнуть и быстро обновить страницу, нужно успеть перед тем как сервер ответит),
      // решить это можно если вынести setArticleEvaluationToSSWithChoice из subscribe и в случае если фиксация реакиции
      // завершится с ошибкой тогда нкжно будет удалить реакцию из LS

      // this.placeEvaluation = val;
      // this.setArticleEvaluationToSSWithChoice(val);
    }
  }

  private setPlaceEvaluationToLS(choice?: 'like' | 'dislike'): void {
    const curVal = JSON.parse(localStorage.getItem('placeEvaluation')) || [];

    const aboutThisPlace = curVal.find(about => about.placeId === this.placeData.id);
    // Возможно id-шник статьи уже есть в LS потому что она была ранее просмотрена, теперь для этой записи надо установить признак like/dislike
    if (aboutThisPlace) {
      aboutThisPlace.choice = choice;
      localStorage.setItem('placeEvaluation', JSON.stringify(curVal));
    } else {
      const val: { placeId: string, choice?: string } = { placeId: this.placeData.id };
      if (choice) {
        val.choice = choice;
      }
      curVal.push(val);
      localStorage.setItem('placeEvaluation', JSON.stringify(curVal));
    }
  }

  public operatePriceRange(num = 1): Array<any> {
    return new Array(+num > 3 ? 3 : +num || 3);
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
    this.placeSub?.unsubscribe();
  }
}
