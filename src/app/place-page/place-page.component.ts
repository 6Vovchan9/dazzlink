import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { locationInfoMapping } from '@app/shared/constants/all.constants';
import { PlaceAttributeList, PlaceDetails, TypeOfPlaceDetails } from '@app/shared/interfaces';
import { LocationsService } from '@app/shared/services/locations.service';
import { PagesService } from '@app/shared/services/pages.service';
import { Subscription, of } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html',
  styleUrls: ['./place-page.component.scss']
})
export class PlacePageComponent {

  private lSub: Subscription;
  public locationInfoName = locationInfoMapping;
  public isLoading = true;
  private placeId: string;
  public placeData: PlaceDetails;
  public placeEvaluation: 'like' | 'dislike';
  public additPlaceInfoItems: Array<PlaceAttributeList> = [];
  public additPlaceInfoData: {[key: string]: PlaceAttributeList} = {};
  public additPlaceInfoTypes: Array<TypeOfPlaceDetails> = [TypeOfPlaceDetails.hours, TypeOfPlaceDetails.map, TypeOfPlaceDetails.phone];

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private locationsService: LocationsService,
    private router: Router
  ) { }

  public get getAdditInfoKeys(): Array<string> {
    return Object.keys(this.additPlaceInfoData);
  }

  ngOnInit(): void {

    this.lSub = this.pagesService.currentLanguage.subscribe(
      lang => {
        if (!this.isLoading) {
          this.isLoading = true;
          this.locationsService.getById(this.placeId)
            .subscribe(
              (place: PlaceDetails) => {
                this.placeData = place;
                this.isLoading = false;
              }
            );
        }
      }
    );

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            this.placeId = params['id'];
            return this.locationsService.getById(params['id']);
          }
        ),
        // delay(8000),
        catchError(err => {
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe(
        (place: PlaceDetails) => {
          this.placeData = place;
          place.attributeList = [
            {
              "group": 20,
              "type": TypeOfPlaceDetails.phone,
              "value": null,
              "href": null
            },
            {
              "group": 20,
              "type": TypeOfPlaceDetails.phone,
              "value": "8 963 752 34 89",
              "href": null
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
              "type": TypeOfPlaceDetails.site,
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
              "value": "8 968 001 66 22",
              "href": null
            },
            {
              "group": 20,
              "type": TypeOfPlaceDetails.site,
              "value": "https://ya.ru ",
              "href": null
            },
            {
              "group": 30,
              "type": TypeOfPlaceDetails.awards,
              "value": "–",
              "href": null
            },
            {
              "group": 30,
              "type": TypeOfPlaceDetails.infoSource,
              "value": "https://testo.uz;https://www.tripadvisor.com;https://www.google.ru/maps;https://yandex.kz/maps;https://2gis.uz",
              "href": null
            }
          ];
          this.prepareAdditPlaceData(place.attributeList);
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
        }
      );
  }

  private prepareAdditPlaceData(data: Array<PlaceAttributeList>): void {
    // let a = data?.find(item => item.type === 'MAP');
    // a.value = 'Балашиха\nФлервоа 4а';
    // this.additPlaceInfoItems = this.additPlaceInfoTypes.map(el => data?.find(item => item.type === el)).filter(empty => empty);

    for (let infoItem of data) {

      if (infoItem.value) infoItem.value = infoItem.value.replace('\n', '\n');

      if (infoItem.type in this.additPlaceInfoData) { // Если такое свойство уже есть тогда добавляем значение в его value
        if (infoItem.value) {
          const innerData = this.additPlaceInfoData[infoItem.type];
          innerData.value = (innerData.value ? innerData.value + '\n' : '') + infoItem.value;
        }
      } else {
        if (this.additPlaceInfoTypes.includes(infoItem.type) || infoItem.type === TypeOfPlaceDetails.site) {
          if (infoItem.value) {
            this.additPlaceInfoData[infoItem.type] = infoItem;
          }
        }
      }
    }

    if (TypeOfPlaceDetails.site in this.additPlaceInfoData) {
      let phoneData = this.additPlaceInfoData[TypeOfPlaceDetails.phone];
      const site = this.additPlaceInfoData[TypeOfPlaceDetails.site];

      if (!phoneData?.value) {
        phoneData = this.additPlaceInfoData[TypeOfPlaceDetails.phone] = {
          type: TypeOfPlaceDetails.phone,
          value: ''
        }
      }

      phoneData.value = (phoneData.value ? phoneData.value + '\n' : '') + site.value;

      delete this.additPlaceInfoData[TypeOfPlaceDetails.site];
    }
    console.log(this.additPlaceInfoData)
  }

  public goToAllPlaces(): void {
    this.router.navigate(['/locations']);
  }

  public onVoting(val: 'like' | 'dislike'): void {

  }

  public operatePriceRange(num = 1): Array<any> {
    return new Array(+num > 3 ? 3 : +num || 3);
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }
}
