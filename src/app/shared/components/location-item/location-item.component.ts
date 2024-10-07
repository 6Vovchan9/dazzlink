import { DecimalPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { ThumbHash } from '@app/shared/helpers/classes/thumbHash.class';
import { Place } from '@app/shared/interfaces';
import { ThumbHashImageComponent } from '../thumb-hash-image/thumb-hash-image.component';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
  standalone: true,
  imports: [
    ThumbHashImageComponent,
    SlicePipe,
    DecimalPipe,
    NgIf,
    NgFor
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationItemComponent extends ThumbHash implements OnInit {

  @Input({ required: true }) placeData: Place;
  @Input({ required: true }) isLoading = false;

  // get gt(): string {
  //   console.log('-gt', this.placeData.displayName);
  //   return this.placeData.displayName;
  // }

  ngOnInit(): void {
    const imageMetadata = this.placeData?.imageList?.[0]?.metadata;
    if (imageMetadata?.imageReference) {
      const hash = this.base64ToThumbHash(imageMetadata.imageReference);
      imageMetadata.imageBase64 = this.thumbHashToDataURL(hash);
    }
    // console.log('=ngOnInit', this.placeData.displayName);
  }

  public operatePriceRange(num = 1): Array<any> {
    return new Array(+num > 3 ? 3 : +num || 3);
  }

}
