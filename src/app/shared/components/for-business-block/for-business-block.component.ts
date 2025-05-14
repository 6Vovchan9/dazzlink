import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { IForBusinessBlock } from '@app/business-page/types/partnership.types';

@Component({
  selector: 'app-for-business-block',
  standalone: true,
  imports: [],
  templateUrl: './for-business-block.component.html',
  styleUrl: './for-business-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForBusinessBlockComponent {
  readonly data: InputSignal<IForBusinessBlock> = input.required();
}
