import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

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
    private colorScheme: ThemeTypes;
    // Define prefix for clearer and more readable class names in scss files
    private colorSchemePrefix = 'color-scheme-';

    constructor(rendererFactory: RendererFactory2) {
        // Create new renderer from renderFactory, to make it possible to use renderer2 in a service
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    private _detectPrefersColorScheme() {
        // Detect if prefers-color-scheme is supported
        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
            // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
            this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeTypes.Dark : ThemeTypes.Light;
        } else {
            // If the browser does not support prefers-color-scheme, set the default to dark.
            this.colorScheme = ThemeTypes.Dark;
        }
    }

    private _setColorScheme(scheme: ThemeTypes) {
        this.colorScheme = scheme;
        // Save prefers-color-scheme to localStorage
        localStorage.setItem('prefers-color', scheme);
    }

    private _getColorScheme() {
        const localStorageColorScheme: any = localStorage.getItem('prefers-color');
        // Check if any prefers-color-scheme is stored in localStorage
        if (localStorageColorScheme) {
            // Save prefers-color-scheme from localStorage
            this.colorScheme = localStorageColorScheme;
        } else {
            // или:
            // If no prefers-color-scheme is stored in localStorage, try to detect OS default prefers-color-scheme
            // this._detectPrefersColorScheme();
            // или:
            this.colorScheme = ThemeTypes.System;
        }
    }

    load() {
        this._getColorScheme();
        this.renderer.addClass(document.documentElement, this.colorSchemePrefix + this.colorScheme);
    }

    update(scheme: ThemeTypes) {
        const schemeBefore: ThemeTypes = this.currentActive();
        this._setColorScheme(scheme);
        // Remove the old color-scheme class
        this.renderer.removeClass(document.documentElement, this.colorSchemePrefix + schemeBefore);
        // Add the new / current color-scheme class
        this.renderer.addClass(document.documentElement, this.colorSchemePrefix + scheme);
    }

    currentActive(): ThemeTypes {
        return this.colorScheme;
    }

}
