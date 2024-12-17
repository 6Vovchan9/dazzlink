import { ChangeDetectionStrategy, Component, input, Input, InputSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-back-btn',
  templateUrl: './go-back-btn.component.html',
  styleUrls: ['./go-back-btn.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoBackBtnComponent {
  // @Input() public text = 'Назад';
  public textVal: InputSignal<string> = input('Назад', {
    alias: 'text',
    transform: (value: string) => {
      const example = 1;
      if (example) {
        return value;
      } else {
        return 'Back';
      }
    }
  });
  public mockText = 'Back';
}
