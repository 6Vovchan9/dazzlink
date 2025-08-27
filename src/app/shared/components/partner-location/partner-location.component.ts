import { SlicePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { RespCityPlaceList } from '@app/shared/interfaces';
import { ThumbHashImageComponent } from '../thumb-hash-image/thumb-hash-image.component';

@Component({
  selector: 'dz-partner-location',
  standalone: true,
  imports: [SlicePipe, ThumbHashImageComponent, NgClass],
  templateUrl: './partner-location.component.html',
  styleUrl: './partner-location.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerLocationComponent {
  partner: InputSignal<RespCityPlaceList> = input(null, { alias: 'data' });
  partnerBtnText = 'Смотреть оффер';
  openPartner(): void {
    console.log('openPartner');
  }
  operatePriceRange(num = 1): Array<any> {
    return new Array(+num > 3 ? 3 : +num || 3);
  }
}
