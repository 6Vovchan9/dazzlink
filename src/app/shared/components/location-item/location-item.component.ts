import { Component, Input } from '@angular/core';
import { Place } from '@app/shared/interfaces';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent {

  @Input({ required: true }) placeData: Place;
  @Input({ required: true }) isLoading = false;

  public operatePriceRange(num = 1): Array<any> {
    return new Array(+num > 3 ? 3 : +num || 3);
  }

}
