import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import {
    // HTTP_INTERCEPTORS,
    provideHttpClient,
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
// import { loggingInterceptor } from "./shared/interceptors/logging.interceptor";
// import { AuthInterceptor } from "./shared/auth.interceptor";

const scrollConfig: InMemoryScrollingOptions = {
    // anchorScrolling: 'enabled',
    // scrollPositionRestoration: 'enabled',
    get scrollPositionRestoration() {
        const params: any = new URLSearchParams(window.location.search);
        const pathname = window.location.pathname;
        // if (params.get('name')) {
        if (pathname.startsWith('/company') || pathname.startsWith('/help')) {
            return 'disabled' as const;
        }
        return 'top' as const;
    }
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(),
        provideRouter(routes, withPreloading(PreloadAllModules), inMemoryScrollingFeature),

        provideHttpClient(
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
            useFactory: () => {
                console.log('%cApp start', 'color: tomato');
            },
            // deps: [],
            // multi: true
        },

        ToastService
    ],
};
