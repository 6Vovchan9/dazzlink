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
    // const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // console.log(isDarkMode ? 'Тёмный режим включен.' : 'Тёмный режим выключен.');

    // const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // schemeQuery.addEventListener('change', this.updateScheme);
  }

  // private updateScheme(event): void {
  //   const newScheme = event.matches ? "тёмная" : "светлая";
  //   console.log(`Цветовая схема системы обновлена на ${newScheme}.`);
  //   // Время адаптировать интерфейс 🌓
  // } // воспроизвести можно в хроме в dev tools во вкладке "Rendering"

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
