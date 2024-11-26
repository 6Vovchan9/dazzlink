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
  public text: InputSignal<string> = input<string>('Назад');
  public mockText = 'Back';
}
