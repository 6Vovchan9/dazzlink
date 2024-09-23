import { DatePipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal
} from '@angular/core';

import { Post } from '@app/shared/interfaces';
import { TImageState } from '@app/shared/types/image.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [NgClass, DatePipe, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {

  @Input() postData: Post;
  @Input({ required: true }) isLoading = false;
  public state = signal<TImageState>(TImageState.Load);

  constructor() { }

  get imageStateTypes() {
    return TImageState;
  }

  // get ht() {
  //   console.log(this.postData.title);
  //   return 'Hello';
  // }

  public onImageLoad() {
    this.state.set(this.imageStateTypes.Success);
  }

  public onImageError() {
    this.state.set(this.imageStateTypes.Error);
  }

  ngOnInit(): void { }

  public buildViewCount(val?: number): string {
    const name =
      `${val}`.endsWith('1') && +val !== 11 ? ' просмотр' :
      `${val}`.endsWith('2') && +val !== 12 ||
      `${val}`.endsWith('3') && +val !== 13 ||
      `${val}`.endsWith('4') && +val !== 14 ? ' просмотра' : ' просмотров';

    return name;
  }

}
