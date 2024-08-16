import { Component, Input, signal } from '@angular/core';

import { ThumbHash } from '@app/shared/helpers/classes/thumbHash.class';
import { ICity } from '@app/shared/types/cities.interface';

@Component({
  selector: 'app-city-carousel-image',
  standalone: true,
  imports: [],
  templateUrl: './city-carousel-image.component.html',
  styleUrl: './city-carousel-image.component.scss'
})
export class CityCarouselImageComponent extends ThumbHash {

  @Input() cityInfo: ICity;

  public mainImageLoad = signal<boolean>(false);

}
