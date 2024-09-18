import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
// import { HomePageComponent } from './home-page/home-page.component';
import { AgreementsPageComponent } from './agreements-page/agreements-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './shared/auth.interceptor';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { RadiobuttonFieldModule } from './shared/fields/radiobutton-new-field/radiobutton-field.module';
import { DropdownFieldModule } from './shared/fields/dropdown-field/dropdown-field.module';
// import { AccoTriggerComponent } from './shared/components/acco-trigger/acco-trigger.component';
import { PostPageComponent } from './post-page/post-page.component';
import { GoBackBtnComponent } from './shared/components/go-back-btn/go-back-btn.component';
// import { YouTubePlayerModule } from '@angular/youtube-player';
import { ProgressiveImageComponent } from './shared/components/progressive-image/progressive-image.component';
// import { LocationsPageComponent } from './locations-page/locations-page.component';
import { LocationsPageWithFrontFilterComponent } from './locations-page-with-front-filter/locations-page-with-front-filter.component';
import { LocationItemComponent } from './shared/components/location-item/location-item.component';
import { CheckboxNewFieldComponent } from './shared/fields/checkbox-new-field/checkbox-new-field.component';
import { PlacePageComponent } from './place-page/place-page.component';
import { ToastService } from './shared/services/toast.service';
import { ToastComponent } from './shared/components/toast/toast.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { LegalInfoPageComponent } from './legal-info-page/legal-info-page.component';
import { ThumbHashImageComponent } from './shared/components/thumb-hash-image/thumb-hash-image.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,

    // HomePageComponent,
    AgreementsPageComponent,
    ArticlesPageComponent,
    PostPageComponent,
    PlacePageComponent,
    // LocationsPageComponent, // Фильтрация и сортировка на бэке
    LocationsPageWithFrontFilterComponent, // Фильтрация и сортировка на фронте
    TeamPageComponent,
    HelpPageComponent,
    LegalInfoPageComponent,

    ToastComponent,
    FooterComponent,
    PostComponent,
    LocationItemComponent,
    ModalComponent,
    // AccoTriggerComponent,
    GoBackBtnComponent,
    ProgressiveImageComponent,
    CheckboxNewFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // для [(ngModel)]
    ReactiveFormsModule, // для [formControl]
    ThumbHashImageComponent,
    HeaderComponent,
    // YouTubePlayerModule,

    SharedModule,

    RadiobuttonFieldModule,
    DropdownFieldModule,

    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      // autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      // trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      // traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      // connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    EffectsModule.forRoot([])
  ],
  providers: [ToastService],
  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },], // Это хороший итерсептор но он пока не нужен и лучше сейчас его отключить чтоб он не очищал localStorage
  bootstrap: [AppComponent]
})
export class AppModule { }
