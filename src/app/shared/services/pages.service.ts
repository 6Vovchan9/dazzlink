import { inject, Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SessionStorageService } from "./storage/sessionStorage.service";

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    public currentLanguage = new BehaviorSubject<string>('RU');
    public prevPage = signal<string>(null);
    private sessionStorageService = inject(SessionStorageService);

    constructor() {
        const currentLanguageFromSStorage: string | null = this.sessionStorageService.getItem<string>('currentLanguage');

        if (currentLanguageFromSStorage) {
            // console.log('Устанавливаем язык из SS');
            this.currentLanguage.next(currentLanguageFromSStorage);
        }

        this.currentLanguage.subscribe(value => {
            // console.log(`Устанавливаем язык «${value}» в SS`);
            this.sessionStorageService.setItem('currentLanguage', value);
        });
    }
}