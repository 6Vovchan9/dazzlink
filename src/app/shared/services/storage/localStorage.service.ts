import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@app/shared/tokens/tokens';

// service для обращения к localStorage на стороне сервера при SSR
@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private storage = inject(LOCAL_STORAGE);
    setItem(key: string, value: any): void {
        this.storage.setItem(
            key,
            typeof value === 'string' ? value : JSON.stringify(value)
        );
    }
    getItem<T>(key: string): T | null {
        const savedValue = this.storage.getItem(key);
        if (savedValue) {
            if (typeof savedValue === 'string') {
                return savedValue as T;
            } else {
                return JSON.parse(savedValue) as T;
            }
        } else {
            return null;
        }
    }
    removeItem(key: string): void {
        this.storage.removeItem(key);
    }
}