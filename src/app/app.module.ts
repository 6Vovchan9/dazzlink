import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
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
import { AccoTriggerComponent } from './shared/components/acco-trigger/acco-trigger.component';
import { PostPageComponent } from './post-page/post-page.component';
import { GoBackBtnComponent } from './shared/components/go-back-btn/go-back-btn.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ProgressiveImageComponent } from './shared/components/progressive-image/progressive-image.component';
import { LocationsPageComponent } from './locations-page/locations-page.component';
import { LocationItemComponent } from './shared/components/location-item/location-item.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,

    HomePageComponent,
    AgreementsPageComponent,
    ArticlesPageComponent,
    PostPageComponent,
    LocationsPageComponent,

    HeaderComponent,
    FooterComponent,
    PostComponent,
    LocationItemComponent,
    ModalComponent,
    AccoTriggerComponent,
    GoBackBtnComponent,
    ProgressiveImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // для [(ngModel)]
    ReactiveFormsModule, // для [formControl]
    YouTubePlayerModule,

    SharedModule,

    RadiobuttonFieldModule,
    DropdownFieldModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
