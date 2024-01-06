import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MobileDetectService {

    public mobileOrTabletDevice = false;
    public osDevice: string;
    private window: Window;

    constructor(
        @Inject(DOCUMENT) private _document
    ) {
        this.window = this._document.defaultView;
        this.operateUserAgent();
    }

    private operateUserAgent(): void {
        const mdClass = this.window['MobileDetect']; // Этот класс берется из скрипта в index.html
        if (mdClass) {
            const mbInstance = new mdClass(this.window.navigator.userAgent);
            console.log("Mobile: " + mbInstance.mobile() + "; Phone: " + mbInstance.phone() + "; Tablet: " + mbInstance.tablet() + "; OS: " + mbInstance.os() + "; userAgent: " + mbInstance.userAgent());
            
            this.mobileOrTabletDevice = Boolean(mbInstance.mobile());
            this.osDevice = mbInstance.os();
        }
    }

    public goToDeviceStore(): void {
        // if (this.osDevice?.toLowerCase()) { // если это планшет или телефон
            if (this.osDevice?.toLowerCase() === 'ios') {
                // window.location.href = 'https://www.apple.com/app-store';
                this.window.location.href = 'https://apps.apple.com/ru';
            } else if (this.osDevice?.toLowerCase() === 'androidos') {
                // window.open('https://play.google.com', '_blank');
                // window.location.href = 'https://play.google.com';
                this.window.open('https://play.google.com');
            } else {
                // window.location.href = 'https://appgallery.huawei.com';
                this.window.open('https://appgallery.huawei.com');
            }
        // } else { // если это комп или ноут
        //     window.open('https://www.apple.com/app-store');
        // }
    }
}