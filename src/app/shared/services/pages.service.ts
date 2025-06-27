import { inject, Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DropdownOptions } from "../fields/dropdown-field/dropdown-field.component";
import { TranslocoService } from "@jsverse/transloco";

const langDirectory: Record<string, { value: string, caption: string }> = {
    'ru': { value: 'ru', caption: 'RU' },
    'uz': { value: 'uz', caption: 'UZ' },
    'en': { value: 'en', caption: 'EN' },
    'kz': { value: 'kz', caption: 'KZ' }
}

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    langFieldOptions: DropdownOptions = {
        disabled: false,
        id: "language",
        required: true,
        items: [{ value: 'ru', caption: 'RU' }, { value: 'uz', caption: 'UZ' }, { value: 'en', caption: 'EN' }, { value: 'kz', caption: 'KZ' }],
        // value: ['RU', 'UZ']
        // value: 'UZ'
        // value: [{ value: 'UZ', caption: 'UZ' }]
        value: 'ru'
    };

    currentLanguage: BehaviorSubject<string>;
    prevPage = signal<string>(null);
    #translocoService = inject(TranslocoService);

    constructor() {

        const currentLanguageFromSStorage = sessionStorage.getItem('currentLanguage');

        if (currentLanguageFromSStorage) {
            // console.log('Устанавливаем язык из SS');
            // this.currentLanguage.next(currentLanguageFromSStorage);
            this.currentLanguage = new BehaviorSubject<string>(currentLanguageFromSStorage);
        } else {
            // console.log('Устанавливаем дефолтный язык');
            // this.currentLanguage.next(this.#translocoService.getDefaultLang());
            this.currentLanguage = new BehaviorSubject<string>(this.#translocoService.getDefaultLang());
        }

        this.currentLanguage.subscribe(value => {
            // console.log(`Устанавливаем язык «${value}» в SS`);
            this.#translocoService.setActiveLang(value);
            sessionStorage.setItem('currentLanguage', value);
        });
    }

    matchLang() { }
}