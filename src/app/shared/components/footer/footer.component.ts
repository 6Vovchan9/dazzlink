import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Optional,
  signal,
  WritableSignal
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { TelegramService } from '@app/shared/services/telegram.service';
import { SvgIconComponent } from "@app/shared/components/svg-icon/svg-icon.component";
import { DownloadAppBtnComponent } from '@app/shared/download-app-btn/download-app-btn.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    
    SvgIconComponent,
    DownloadAppBtnComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  public showQrCodeModal = signal(false);
  public exampleForModel: WritableSignal<number> = signal<number>(3);
  private qrModalChangeEffect = effect(() => {
    if (this.showQrCodeModal()) {
      this.modalService.hideScroll();
    } else {
      this.modalService.showScroll();
    }
  });

  public get curYear() {
    return new Date().getFullYear();
  }

  public get helpBtnName(): string {
    // console.log('footer component render!');
    return 'Помощь';
  }

  private tgService = inject(TelegramService);

  constructor(
    public modalService: GlobalModalService,
    @Optional() public mobileDetectService: MobileDetectService,
  ) { }

  public clickByCompanyBlock(): void {
    if (this.tgService.mainTgButton) {
      this.tgService.mainTgButton.setText('MainButton');
      this.tgService.mainTgButton.show();
    }
  }

  public openQRModal(): void {
    this.modalService.open({ component: 'appComponent', modalName: 'qrModal' });
  }

  public openQRModalAdvanced(): void {
    if (this.mobileDetectService?.osDevice) {
      this.mobileDetectService?.goToDeviceStore();
    } else {
      this.modalService.open({ component: 'appComponent', modalName: 'qrModal' });
    }
  }

  public qrModalOrTelegram(): void {
    if (this.mobileDetectService?.osDevice) {
      this.mobileDetectService.goToTelegramChannel();
    } else {
      this.modalService.open({ component: 'appComponent', modalName: 'qrForTelegram' });
    }
  }

}
