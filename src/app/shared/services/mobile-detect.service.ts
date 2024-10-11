import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MobileDetectService {

    public mobileOrTabletDevice = false;
    public osDevice: string;
    private myWindow: Window;

    constructor(
        @Inject(DOCUMENT) private _document
    ) {
        this.myWindow = this._document.defaultView;
        this.operateUserAgent();
    }

    private operateUserAgent(): void {
        const mdClass = this.myWindow['MobileDetect']; // Этот класс берется из скрипта в index.html
        if (mdClass) {
            const mbInstance = new mdClass(this.myWindow.navigator.userAgent);
            console.log("Mobile: " + mbInstance.mobile() + "; Phone: " + mbInstance.phone() + "; Tablet: " + mbInstance.tablet() + "; OS: " + mbInstance.os() + "; userAgent: " + mbInstance.userAgent());
            
            this.mobileOrTabletDevice = Boolean(mbInstance.mobile());
            this.osDevice = mbInstance.os();
        }
    }

    public mobileStoreIconSrc(): string {
        const uAgent = this.myWindow.navigator.userAgent.toLowerCase();
        if (this.osDevice?.toLowerCase() === 'ios') {
            return 'assets/images/store/linkIOSLite.svg';
        } else if (this.osDevice?.toLowerCase() === 'androidos') {
            if (/hms/.test(uAgent) && !/gms/.test(uAgent)) {
                return 'assets/images/store/linkAppGallery.svg';
            }
            return 'assets/images/store/linkAndroid.svg';
        } else {
            return 'assets/images/store/linkAppGallery.svg';
        }
    }

    public goToDeviceStore(): void {
        const uAgent = this.myWindow.navigator.userAgent.toLowerCase();
        // if (this.osDevice?.toLowerCase()) { // если это планшет или телефон
            console.log('Идем в store');
            if (this.osDevice?.toLowerCase() === 'ios') {
                // myWindow.location.href = 'https://www.apple.com/app-store';
                this.myWindow.location.href = 'https://apps.apple.com/ru';
            } else if (this.osDevice?.toLowerCase() === 'androidos') {
                if (/hms/.test(uAgent) && !/gms/.test(uAgent)) {
                    this.myWindow.open('https://appgallery.huawei.com');
                } else {
                    // myWindow.open('https://play.google.com', '_blank');
                    // myWindow.location.href = 'https://play.google.com';
                    this.myWindow.open('https://play.google.com');
                }
            } else {
                // myWindow.location.href = 'https://appgallery.huawei.com';
                this.myWindow.open('https://appgallery.huawei.com');
            }
        // } else { // если это комп или ноут
        //     myWindow.open('https://www.apple.com/app-store');
        // }
    }

    public goToTelegramChannel(): void {
        this.myWindow.location.href = 'https://t.me/DazzlinkBot?start=source-website_platform-mobile';
    }
}