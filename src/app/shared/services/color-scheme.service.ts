import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2, signal } from '@angular/core';
import { LocalStorageService } from './storage/localStorage.service';
import { DOCUMENT, isPlatformServer } from '@angular/common';

export enum ThemeTypes {
    Dark = 'dark',
    Light = 'light',
    System = 'system'
}

@Injectable({
    providedIn: 'root'
})
export class ColorSchemeService {

    private renderer: Renderer2;
    private colorScheme = signal<ThemeTypes>(ThemeTypes.Dark);
    // Define prefix for clearer and more readable class names in scss files
    private colorSchemePrefix = 'color-scheme-';

    private storageService = inject(LocalStorageService);

    constructor(
        rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private readonly myDocument: Document
    ) {
        // Create new renderer from renderFactory, to make it possible to use renderer2 in a service
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    private _detectPrefersColorScheme() {
        // if (isPlatformServer(PLATFORM_ID)) {
        // такая проверка нужна потому что на сервере в объекте Window не функции matchMedia()
        const myWindow: Window = this.myDocument.defaultView as Window;
        // Detect if prefers-color-scheme is supported
        if (myWindow.matchMedia?.('(prefers-color-scheme)').media !== 'not all') {
            // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
            this.colorScheme.set(myWindow.matchMedia?.('(prefers-color-scheme: dark)').matches ? ThemeTypes.Dark : ThemeTypes.Light);
        } else {
            // If the browser does not support prefers-color-scheme, set the default to dark.
            this.colorScheme.set(ThemeTypes.Dark);
        }
        // } else {
        //     this.colorScheme.set(ThemeTypes.Light);
        // }
    }

    private _setColorScheme(scheme: ThemeTypes) {
        this.colorScheme.set(scheme);
        // Save prefers-color-scheme to localStorage
        this.storageService.setItem('prefers-color', scheme);
    }

    private _getColorScheme() {
        const localStorageColorScheme: any = this.storageService.getItem('prefers-color');
        // Check if any prefers-color-scheme is stored in localStorage
        if (localStorageColorScheme) {
            // Save prefers-color-scheme from localStorage
            this.colorScheme.set(localStorageColorScheme);
        } else {
            // или:
            // If no prefers-color-scheme is stored in localStorage, try to detect OS default prefers-color-scheme
            this._detectPrefersColorScheme();
            // или:
            // this.colorScheme.set(ThemeTypes.System);
        }
    }

    load() {
        this._getColorScheme();
        this.renderer.addClass(this.myDocument.documentElement, this.colorSchemePrefix + this.colorScheme());
    }

    update(scheme: ThemeTypes) {
        const schemeBefore: ThemeTypes = this.currentActive();
        this._setColorScheme(scheme);
        // Remove the old color-scheme class
        this.renderer.removeClass(this.myDocument.documentElement, this.colorSchemePrefix + schemeBefore);
        // Add the new / current color-scheme class
        this.renderer.addClass(this.myDocument.documentElement, this.colorSchemePrefix + scheme);
    }

    currentActive(): ThemeTypes {
        return this.colorScheme();
    }

}
