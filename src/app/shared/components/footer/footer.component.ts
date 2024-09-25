import { ChangeDetectionStrategy, Component, inject, OnInit, Optional } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { TelegramService } from '@app/shared/services/telegram.service';
import { QrCodeModalComponent } from '@app/shared/components/qr-code-modal/qr-code-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [QrCodeModalComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  public showQrCodeModal = false;

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

}
