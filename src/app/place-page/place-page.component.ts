import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  public isLoading = true;
  private placeId: string;
  public placeData: PlaceDetails;
  public placeEvaluation: 'like' | 'dislike';
  public additPlaceInfoItems: Array<PlaceAttributeList>;
  public additPlaceInfoTypes: Array<TypeOfPlaceDetails> = [TypeOfPlaceDetails.hours, TypeOfPlaceDetails.map, TypeOfPlaceDetails.phone];

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private locationsService: LocationsService,
    private router: Router
  ) { }

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
          // let a = place.attributeList?.find(item => item.type === 'MAP')
          // a.value = 'Балашиха\nФлервоа 4а'
          this.additPlaceInfoItems = this.additPlaceInfoTypes.map(el => place.attributeList?.find(item => item.type === el)).filter(empty => empty);
          // console.log(this.additPlaceInfoItems);
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
        }
      );
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
