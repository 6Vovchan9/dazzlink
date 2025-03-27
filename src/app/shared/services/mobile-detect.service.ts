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

    public mobileStoreIconSrc(darkMode = false): string {
        const uAgent = this.myWindow.navigator.userAgent.toLowerCase();
        if (this.osDevice?.toLowerCase() === 'ios') {
            return darkMode ? 'assets/images/store/linkIOSLiteDark.svg' : 'assets/images/store/linkIOSLite.svg';
        } else if (this.osDevice?.toLowerCase() === 'androidos') {
            if (/hms/.test(uAgent) && !/gms/.test(uAgent)) {
                return darkMode ? 'assets/images/store/linkAppGalleryDark.svg' : 'assets/images/store/linkAppGallery.svg';
            }
            return darkMode ? 'assets/images/store/linkAndroidDark.svg' : 'assets/images/store/linkAndroid.svg';
        } else {
            return darkMode ? 'assets/images/store/linkAppGalleryDark.svg' : 'assets/images/store/linkAppGallery.svg';
        }
    }

    public goToDeviceStore(): void {
        const uAgent = this.myWindow.navigator.userAgent.toLowerCase();
        // if (this.osDevice?.toLowerCase()) { // если это планшет или телефон
            console.log('Идем в store');
            if (this.osDevice?.toLowerCase() === 'ios') {
                // this.myWindow.location.href = 'https://www.apple.com/app-store';
                // this.myWindow.location.href = 'https://apps.apple.com';
                this.myWindow.location.href = 'https://apps.apple.com/app/dazzlink-asia/id6477790074';
            } else if (this.osDevice?.toLowerCase() === 'androidos') {
                if (/hms/.test(uAgent) && !/gms/.test(uAgent)) {
                    this.myWindow.location.href = 'https://appgallery.cloud.huawei.com/ag/n/app/C112028837';
                } else {
                    this.myWindow.open('https://play.google.com/store/apps/details?id=asia.dazzlink.dazzlink', '_blank');
                    // this.myWindow.location.href = 'https://play.google.com/store/apps/details?id=asia.dazzlink.dazzlink';
                }
            } else {
                this.myWindow.location.href = 'https://appgallery.cloud.huawei.com/ag/n/app/C112028837';
            }
        // } else { // если это комп или ноут
        //     this.myWindow.open('https://www.apple.com/app-store');
        // }
    }

    public goToTelegramChannel(): void {
        this.myWindow.location.href = 'https://t.me/DazzlinkBot?start=source-website_platform-mobile';
    }
}