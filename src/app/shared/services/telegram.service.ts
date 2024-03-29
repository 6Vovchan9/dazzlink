import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

interface IMainTgButton {
    show(): void,
    hide(): void,
    setText(text: string): void,
    onClick(fn: Function): void,
    offClick(fn: Function): void
}

@Injectable({ providedIn: 'root' })
export class TelegramService {

    private myWindow;
    public tg: any;

    constructor(@Inject(DOCUMENT) private _document) {
        this.myWindow = this._document.defaultView;
        this.tg = this.myWindow.Telegram?.WebApp;
    }

    get mainTgButton(): IMainTgButton {
        return this.tg?.MainButton;
    }

    get backTgButton(): IMainTgButton {
        return this.tg?.BackButton;
    }

    public sendData(data: object): void {
        this.tg?.sendData(JSON.stringify(data)); // Этот метод позволяет отправлять данные боту, далее мы можем принимать эти данные через событие WEB_APP_DATA. Но этот метод доступен только если приложение запущено через "Keyboard button"
    }

    public ready(): void {
        this.tg?.ready();
    }
}