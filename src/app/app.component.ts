import { Component } from '@angular/core';
import { GlobalModalService, ModalData } from '@app/shared/services/global-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myProject';

  constructor(
    public modalService: GlobalModalService
  ) { }

  buttonInModalClick(modalDesc) {
    if (!this[modalDesc.methodName]) {
      console.log(`В компоненте "${modalDesc.componentName}" нет метода "${modalDesc.methodName}"`);
      return;
    }
    this[modalDesc.methodName]();
  }

  closeModal() {
    console.log('вызвали метод closeModal');
    this.modalService.close();
  }
}
