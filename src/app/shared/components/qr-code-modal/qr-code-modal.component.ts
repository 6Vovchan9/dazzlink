import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
  selector: 'app-qr-code-modal',
  standalone: true,
  imports: [],
  templateUrl: './qr-code-modal.component.html',
  styleUrl: './qr-code-modal.component.scss'
})
export class QrCodeModalComponent {

  readonly count$$ = model.required<number>({ alias: 'count'});

  @Input() show = false;
  @Output() showChange = new EventEmitter<boolean>();

  public get productName(): string {
    // console.log('qrCode component render!');
    return 'приложение';
  }

  increment(): void {
    this.count$$.update(value => value + 1);
  }
  
  public closeModal() {
    this.show = false;
    this.showChange.emit(false);
  }
}
