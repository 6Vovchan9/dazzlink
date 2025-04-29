import { InjectionToken } from "@angular/core";

export const COLOR = new InjectionToken<string>('It is border color', {
    providedIn: 'root', // это, и фабрика ниже, нужны для генерации значения по умолчанию для InjectionToken-а
    factory: () => 'blue'
});
export const TOKEN_FOR_USEFACTORY_1 = new InjectionToken<string>('TOKEN_FOR_USEFACTORY_1');
export const TOKEN_FOR_USEFACTORY_2 = new InjectionToken<string>('TOKEN_FOR_USEFACTORY_2');
export const USER_RANDOM_SERVICE_TOKEN = new InjectionToken<string>(
    'USER_RANDOM_SERVICE_TOKEN'
);
export const ADMIN_RANDOM_SERVICE_TOKEN = new InjectionToken<string>(
    'ADMIN_RANDOM_SERVICE_TOKEN'
);

// token для обращения к localStorage на стороне сервера при SSR
export const LOCAL_STORAGE = new InjectionToken<Storage>('Local Storage');
// token для обращения к sessionStorage на стороне сервера при SSR
export const SESSION_STORAGE = new InjectionToken<Storage>('Session Storage');