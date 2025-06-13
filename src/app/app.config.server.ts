import { mergeApplicationConfig, ApplicationConfig, APP_INITIALIZER, PLATFORM_ID } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LOCAL_STORAGE, SESSION_STORAGE } from './shared/tokens/tokens';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),

    // для обращения к localStorage на стороне сервера при SSR
    {
      provide: LOCAL_STORAGE,
      useFactory: () => ({
        getItem: () => { },
        setItem: () => { },
        removeItem: () => { },
      }),
    },
    // для обращения к sessionStorage на стороне сервера при SSR
    {
      provide: SESSION_STORAGE,
      useFactory: () => ({
        getItem: () => { },
        setItem: () => { },
        removeItem: () => { },
      }),
    },

    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (platformId: string) => {
    //     console.log(`App start on ${platformId}`);
    //   },
    //   deps: [PLATFORM_ID]
    // },
    
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
