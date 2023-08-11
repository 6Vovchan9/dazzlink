import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    public currentLanguage = new BehaviorSubject<string>('RU');

    constructor() {
        const currentLanguageFromSStorage = sessionStorage.getItem('currentLanguage');

        if (currentLanguageFromSStorage) {
            // console.log('Устанавливаем язык из SS');
            this.currentLanguage.next(currentLanguageFromSStorage);
        }

        this.currentLanguage.subscribe(value => {
            // console.log(`Устанавливаем язык «${value}» в SS`);
            sessionStorage.setItem('currentLanguage', value);
        });
    }
}