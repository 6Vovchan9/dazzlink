import { JsonPipe, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal, OnInit } from '@angular/core';
import { RespCityPlaceList } from '@app/shared/interfaces';
import { ThumbHashImageComponent } from '../thumb-hash-image/thumb-hash-image.component';

@Component({
  selector: 'dz-partner-location',
  standalone: true,
  imports: [SlicePipe, ThumbHashImageComponent],
  templateUrl: './partner-location.component.html',
  styleUrl: './partner-location.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerLocationComponent {
  partner: InputSignal<RespCityPlaceList> = input(null, { alias: 'data' });

  operatePriceRange(num = 1): Array<any> {
    return new Array(+num > 3 ? 3 : +num || 3);
  }
}
