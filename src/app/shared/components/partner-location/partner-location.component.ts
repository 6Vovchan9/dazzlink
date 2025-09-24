import { SlicePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal, OnInit } from '@angular/core';
import { Place, RespCityPlaceList } from '@app/shared/interfaces';
import { ThumbHashImageComponent } from '../thumb-hash-image/thumb-hash-image.component';
import { ThumbHash } from '@app/shared/helpers/classes/thumbHash.class';

@Component({
  selector: 'dz-partner-location',
  standalone: true,
  imports: [SlicePipe, ThumbHashImageComponent, NgClass],
  templateUrl: './partner-location.component.html',
  styleUrl: './partner-location.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerLocationComponent extends ThumbHash implements OnInit {
  partner: InputSignal<Place> = input(null, { alias: 'data' });
  partnerBtnText = 'Смотреть оффер';
  ngOnInit(): void {
    this.#prepareImageBase64(this.partner().imageList)
  }
  openPartner(): void {
    console.log('openPartner');
  }
  operatePriceRange(num = 1): Array<any> {
    return new Array(+num > 3 ? 3 : +num || 3);
  }
  #prepareImageBase64(imageList: any): void {
    if (imageList?.length) {
      imageList.map(imgData => {
        if (imgData.metadata?.imageReference) {
          const hash = this.base64ToThumbHash(imgData.metadata.imageReference);
          imgData.metadata.imageBase64 = this.thumbHashToDataURL(hash);
        }
        return imgData;
      })
    }
  }
}
