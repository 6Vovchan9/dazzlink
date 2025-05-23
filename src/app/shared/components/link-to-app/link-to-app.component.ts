import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DownloadAppBtnComponent } from '@app/shared/download-app-btn/download-app-btn.component';

import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';

@Component({
  selector: 'dz-link-to-app',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DownloadAppBtnComponent
  ],
  templateUrl: './link-to-app.component.html',
  styleUrl: './link-to-app.component.scss'
})
export class LinkToAppComponent {

  protected mobileDetectService = inject(MobileDetectService);
  protected modalService = inject(GlobalModalService);

  // public qrModalOrTelegram(): void {
  //   if (this.mobileDetectService?.osDevice) {
  //     this.mobileDetectService.goToTelegramChannel();
  //   } else {
  //     this.modalService.open({ component: 'appComponent', modalName: 'qrForTelegram' });
  //   }
  // }

  openQRModal(): void {
    this.modalService.open({ component: 'appComponent', modalName: 'qrModal' });
  }

}
