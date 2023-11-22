import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlaceDetails } from '@app/shared/interfaces';
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

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private locationsService: LocationsService
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
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
        }
      );
  }

  public ngOnDestroy(): void {
    this.lSub?.unsubscribe();
  }
}
