import { APP_INITIALIZER, ApplicationConfig, PLATFORM_ID, provideZoneChangeDetection } from "@angular/core";
import {
    // HTTP_INTERCEPTORS,
    provideHttpClient,
    withFetch,
    // withInterceptors,
    // withInterceptorsFromDi
} from "@angular/common/http";
import {
    InMemoryScrollingFeature,
    InMemoryScrollingOptions,
    PreloadAllModules,
    provideRouter,
    withInMemoryScrolling,
    withPreloading
} from "@angular/router";

import { routes } from "./app.routes";
import { ToastService } from "./shared/services/toast.service";
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { LOCAL_STORAGE, SESSION_STORAGE } from "./shared/tokens/tokens";
import { isPlatformServer } from "@angular/common";
// import { loggingInterceptor } from "./shared/interceptors/logging.interceptor";
// import { AuthInterceptor } from "./shared/auth.interceptor";

let platformIdGlobal: string;

const scrollConfig: InMemoryScrollingOptions = {
    // anchorScrolling: 'enabled',
    // scrollPositionRestoration: 'enabled',
    get scrollPositionRestoration() {
        if (isPlatformServer(platformIdGlobal)) {
            return 'disabled';
        } else {
            const params: any = new URLSearchParams(window.location.search);
            const pathname = window.location.pathname;
            // if (params.get('name')) {
            if (pathname.startsWith('/company') || pathname.startsWith('/help')) {
                return 'disabled' as const;
            }
            return 'top' as const;
        }
    }
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withPreloading(PreloadAllModules), inMemoryScrollingFeature),

        provideHttpClient(
            withFetch()
            // withInterceptors([loggingInterceptor]), // Interceptors: так правильно
            // withInterceptorsFromDi(), // Interceptors: или можно так но это старый вариант
        ),
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Interceptors: или можно так но это старый вариант

        // NgRx так:
        // importProvidersFrom(
        //     StoreModule.forRoot({}),
        //     StoreModule.forFeature('login', reducers),
        //     // StoreModule.forFeature('basket', basketItemsReducer), // это для примера
        //     EffectsModule.forRoot([]),
        //     EffectsModule.forFeature([LoginEffect]),
        //     // EffectsModule.forFeature(BasketEffects), // это для примера
        //     StoreDevtoolsModule.instrument({
        //         maxAge: 25,
        //         logOnly: false,
        //     }),
        // ),

        // NgRx или лучше так:
        // provideStore({
        //     login: reducers,
        //     // basket: basketItemsReducer, // это для примера
        // }),
        // provideEffects([
        //     LoginEffect,
        //     // BasketEffects // это для примера
        // ]),
        // provideStoreDevtools({ maxAge: 25, logOnly: false }),

        {
            provide: APP_INITIALIZER,
            useFactory: (platformId: string) => {
                platformIdGlobal = platformId;
                console.log(`%cApp start in ${platformId}`, 'color: tomato');
            },
            deps: [PLATFORM_ID],
            // multi: true
        },

        // для обращения к localStorage на стороне сервера при SSR
        {
            provide: LOCAL_STORAGE,
            useFactory: (platformId: string) => {
                // console.log('ls platformId:', platformId) ;
                if (isPlatformServer(platformId)) {
                    return {}; // Возвращаем пустой объект на сервере
                }
                return localStorage; // Используем localStorage браузера
            },
            deps: [PLATFORM_ID],
        },
        // для обращения к sessionStorage на стороне сервера при SSR
        {
            provide: SESSION_STORAGE,
            useFactory: (platformId: string) => {
                // console.log('ss platformId:', platformId);
                if (isPlatformServer(platformId)) {
                    return {}; // Возвращаем пустой объект на сервере
                }
                return sessionStorage; // Используем sessionStorage браузера
            },
            deps: [PLATFORM_ID],
        },

        ToastService,
        provideClientHydration()
    ],
};
