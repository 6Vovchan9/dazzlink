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

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,

    HomePageComponent,
    AgreementsPageComponent,
    ArticlesPageComponent,

    HeaderComponent,
    FooterComponent,
    PostComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // для [(ngModel)]
    ReactiveFormsModule, // для [formControl]
    SharedModule,
    RadiobuttonFieldModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
