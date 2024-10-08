import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface ModalData {
  closeButton?: boolean;
  smallSize?: boolean;
  modalName?: string;
  headerText?: string;
  withShadow?: boolean;
  titleText?: string;
  mainText?: Array<MainTextBlock>;
  additContent?: Array<MainTextBlock>;
  component: 'appComponent' | 'mainLayoutComponent'; // Компонент в котором будет исп модалка
  buttons?: AboutModalButtons;
}

export type AlertType = 'success' | 'warning' | 'danger';

export interface MessageToAnotherComp {
  toComponent: string;
  methodName: string;
  arguments: Array<string | boolean>;
}

export interface AboutModalButtons {
  items: Array<AboutModalButtonItem>;
  classes?: string;
}

export interface AboutModalButtonItem {
  name: string;
  emitterMethodName: string; // Метод который должен быть реализован в "component", который будет вызван при нажатии на кнопку
  classes?: string;
  disabled?: boolean;
  id?: string;
}

export interface MainTextBlock {
  type: ContentType;
  text?: string;
  items?: Array<string>;
  content?: string;
  id?: string;
  link?: any; // Ссылка на объект с состоянием аккордеона. Устанавливается на MainTextBlock с type = accordion и на контент который будет относится к этому аккордеону
}

export type ContentType = 'text' | 'list' | 'disclaimer' | 'ngContent' | 'accordion';

@Injectable({
  providedIn: 'root'
})
export class GlobalModalService {

  constructor() { }

  modalData$ = new BehaviorSubject<ModalData>(null);
  messToAnotherComp$ = new Subject<MessageToAnotherComp>();

  open(modalData: ModalData) {
    this.modalData$.next(modalData);
    this.hideScroll();
  }

  close() {
    this.modalData$.next(null);
    this.showScroll();
  }

  sendMessage(message: MessageToAnotherComp) {
    this.messToAnotherComp$.next(message);
  }

  hideScroll() {
    document.documentElement.classList.add('noScroll');
  }

  showScroll() {
    document.documentElement.classList.remove('noScroll');
  }
}