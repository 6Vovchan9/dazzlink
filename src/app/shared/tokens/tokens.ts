import { InjectionToken } from "@angular/core";

export const TOKEN_FOR_USEVALUE = new InjectionToken<string>('TOKEN_FOR_USEVALUE');
export const TOKEN_FOR_USEFACTORY_1 = new InjectionToken<string>('TOKEN_FOR_USEFACTORY_1');
export const TOKEN_FOR_USEFACTORY_2 = new InjectionToken<string>('TOKEN_FOR_USEFACTORY_2');
export const USER_RANDOM_SERVICE_TOKEN = new InjectionToken<string>(
    'USER_RANDOM_SERVICE_TOKEN'
);
export const ADMIN_RANDOM_SERVICE_TOKEN = new InjectionToken<string>(
    'ADMIN_RANDOM_SERVICE_TOKEN'
);