import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DropdownOptions } from "../fields/dropdown-field/dropdown-field.component";

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    langFieldOptions: DropdownOptions = {
        disabled: false,
        id: "language",
        required: true,
        items: [{ value: 'RU', caption: 'RU' }, { value: 'UZ', caption: 'UZ' }, { value: 'EN', caption: 'EN' }, { value: 'KZ', caption: 'KZ' }],
        // value: ['RU', 'UZ']
        // value: 'UZ'
        // value: [{ value: 'UZ', caption: 'UZ' }]
        value: 'RU'
    };

    public currentLanguage = new BehaviorSubject<string>('RU');
    public prevPage = signal<string>(null);

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