// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { registerLocaleData } from "@angular/common";
import localeRu from '@angular/common/locales/ru';
// import localeFr from '@angular/common/locales/fr';

// было:
// if (environment.production) {
//   enableProdMode();
// }
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
  
// стало:
// registerLocaleData(localeFr, 'fr');
registerLocaleData(localeRu, 'ru');

bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
);
