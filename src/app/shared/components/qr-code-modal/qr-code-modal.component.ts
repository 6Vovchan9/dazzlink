import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-qr-code-modal',
  standalone: true,
  imports: [],
  templateUrl: './qr-code-modal.component.html',
  styleUrl: './qr-code-modal.component.scss'
})
export class QrCodeModalComponent {

  @Input() show = false;
  @Output() showChange = new EventEmitter<boolean>();

  public get productName(): string {
    // console.log('qrCode component render!');
    return 'приложение';
  }
  
  public closeModal() {
    this.show = false;
    this.showChange.emit(false);
  }
}
