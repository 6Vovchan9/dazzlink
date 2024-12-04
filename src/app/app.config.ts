import { ApplicationConfig } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
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
        provideHttpClient(),
        provideRouter(routes, withPreloading(PreloadAllModules), inMemoryScrollingFeature),

        ToastService
    ],
};
