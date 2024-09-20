import { Component, OnInit, inject } from '@angular/core';
import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { TelegramService } from '@app/shared/services/telegram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private tgService = inject(TelegramService);

  constructor(
    public modalService: GlobalModalService
  ) { }

  ngOnInit(): void {
    // console.log(navigator.userAgent);
    this.tgService.ready(); // Это для телеги
  }

  buttonInModalClick(modalDesc) {
    if (!this[modalDesc.methodName]) {
      console.log(`В компоненте "${modalDesc.componentName}" нет метода "${modalDesc.methodName}"`);
      return;
    }
    this[modalDesc.methodName]();
  }
}
