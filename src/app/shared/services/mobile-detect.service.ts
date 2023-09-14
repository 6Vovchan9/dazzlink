import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MobileDetectService {

    public mobileOrTabletDevice = false;
    public osDevice: string;

    constructor() {
        this.operateUserAgent();
    }

    private operateUserAgent(): void {
        const mdClass = window['MobileDetect']; // Этот класс берется из скрипта в index.html
        const mbInstance = new mdClass(window.navigator.userAgent);
        console.log("Mobile: " + mbInstance.mobile() + "; Phone: " + mbInstance.phone() + "; Tablet: " + mbInstance.tablet() + "; OS: " + mbInstance.os() + "; userAgent: " + mbInstance.userAgent());
        
        this.mobileOrTabletDevice = Boolean(mbInstance.mobile());
        this.osDevice = mbInstance.os();
    }

    public goToDeviceStore(): void {
        // if (this.osDevice?.toLowerCase()) { // если это планшет или телефон
            if (this.osDevice?.toLowerCase() === 'ios') {
                // window.location.href = 'https://www.apple.com/app-store';
                window.location.href = 'https://apps.apple.com/ru';
            } else if (this.osDevice?.toLowerCase() === 'androidos') {
                // window.open('https://play.google.com', '_blank');
                // window.location.href = 'https://play.google.com';
                window.open('https://play.google.com');
            } else {
                // window.location.href = 'https://appgallery.huawei.com';
                window.open('https://appgallery.huawei.com');
            }
        // } else { // если это комп или ноут
        //     window.open('https://www.apple.com/app-store');
        // }
    }
}