import { Component, Input, signal } from '@angular/core';

import { ThumbHash } from '@app/shared/helpers/classes/thumbHash.class';
import { IImageInfo } from '@app/shared/types/image.interface';

@Component({
  selector: 'app-thumb-hash-image',
  standalone: true,
  imports: [],
  templateUrl: './thumb-hash-image.component.html',
  styleUrl: './thumb-hash-image.component.scss'
})
export class ThumbHashImageComponent extends ThumbHash {

  @Input() imageData: IImageInfo;

  public mainImageLoad = signal<boolean>(false);

}
