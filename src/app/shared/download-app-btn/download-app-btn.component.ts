import { Component, inject } from '@angular/core';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { GlobalModalService } from '@app/shared/services/global-modal.service';

@Component({
  selector: 'dz-download-app-btn',
  standalone: true,
  imports: [],
  templateUrl: './download-app-btn.component.html',
  styleUrl: './download-app-btn.component.scss',
})
export class DownloadAppBtnComponent {
  public mobileDetectService = inject(MobileDetectService);
  private modalService = inject(GlobalModalService);
  openQRModalAdvanced(): void {
    if (this.mobileDetectService?.osDevice) {
      this.mobileDetectService?.goToDeviceStore();
    } else {
      this.modalService.open({
        component: 'appComponent',
        modalName: 'qrModal',
      });
    }
  }
}
