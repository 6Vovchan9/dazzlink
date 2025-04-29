import { inject, Injectable, signal } from "@angular/core";
import { LocalStorageService } from "./storage/localStorage.service";

@Injectable({ providedIn: 'root' })
export class CookiesAgreementService {

    private storageService = inject(LocalStorageService);

    private cookiesAgreementName = 'cookiesAccepted';
    public hiddenCookiesAgreement = signal(true);

    public getCookiesAgreement(): boolean {
        const value = Boolean(this.getFromLS(this.cookiesAgreementName));
        this.hiddenCookiesAgreement.set(value);
        return value;
    }

    public setCookiesAgreement(value: any): boolean {
        this.setToLS(this.cookiesAgreementName, value);
        this.hiddenCookiesAgreement.set(Boolean(value));
        return Boolean(value);
    }

    public removeCookiesAgreement(): boolean {
        this.storageService.removeItem(this.cookiesAgreementName);
        this.hiddenCookiesAgreement.set(false);
        return false;
    }

    private setToLS(key: string, data: any): void {
        try {
            this.storageService.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    }

    private getFromLS(key: string): any {
        try {
            return JSON.parse(this.storageService.getItem(key));
        } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
        }
    }
}