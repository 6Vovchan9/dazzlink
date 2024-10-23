import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CookiesAgreementService {

    private cookiesAgreementName = 'cookiesAccepted';
    private _hideCookiesAgreement = true;

    public get hideCookiesAgreement(): boolean {
        return this._hideCookiesAgreement;
    }

    public getCookiesAgreement(): boolean {
        return this._hideCookiesAgreement = Boolean(this.getFromLS(this.cookiesAgreementName));
    }

    public setCookiesAgreement(value: any): boolean {
        this.setToLS(this.cookiesAgreementName, value);
        return this._hideCookiesAgreement = Boolean(value);
    }

    public removeCookiesAgreement(): boolean {
        localStorage.removeItem(this.cookiesAgreementName);
        return this._hideCookiesAgreement = false;
    }

    private setToLS(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    }

    private getFromLS(key: string): any {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
        }
    }
}