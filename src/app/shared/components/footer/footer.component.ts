import { ChangeDetectionStrategy, Component, inject, OnInit, Optional } from '@angular/core';

import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { TelegramService } from '@app/shared/services/telegram.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  public get curYear() {
    return new Date().getFullYear();
  }

  public get helpBtnName(): string {
    // console.log('get btn name');
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
    this.modalService.open({ component: 'mainLayoutComponent' }); // на аргумент можно не обращать внимание
  }

}
