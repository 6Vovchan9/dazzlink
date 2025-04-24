import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, DOCUMENT, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, pairwise, tap } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';

import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { TelegramService } from '@app/shared/services/telegram.service';
import { CookiesAgreementService } from '@app/shared/services/cookiesAgreement.service';
import { PagesService } from '@app/shared/services/pages.service';
import { ToastComponent } from '@app/shared/components/toast/toast.component';
import { CookiesToastComponent } from '@app/shared/components/cookies-toast/cookies-toast.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { ColorSchemeService } from '@app/shared/services/color-scheme.service';
import { ThemeToggleComponent } from '@app/shared/components/theme-toggle/theme-toggle.component';
// import { LocationsService } from '@app/shared/services/locations.service';
// import { PostsService } from '@app/shared/services/posts.service';
// import { RandomService } from '@app/shared/services/random.service';
// import {
//   TOKEN_FOR_USEFACTORY_1,
//   TOKEN_FOR_USEFACTORY_2,
//   ADMIN_RANDOM_SERVICE_TOKEN,
//   COLOR,
//   USER_RANDOM_SERVICE_TOKEN
// } from '@app/shared/tokens/tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  providers: [
    TelegramService, // регистрация зависимости таким образом позволяет использовать только класс в качестве зависимости, а если нужно внедрить в качестве зависимости примитивные типы данных или объекты то придется воспользоваться другими способами регистрации зависимостей (useClass, useValue, useFactory, useExisting)
    // {
    //   provide: TelegramService,
    //   useClass: TelegramService
    // }, // этот способ аналогичный верхнему, который под капотом использует данный способ для регистрации зависимости

    // { provide: COLOR, useValue: 'red' },
    // {
    //   provide: TOKEN_FOR_USEFACTORY_1,
    //   useFactory: () => {
    //     if (Math.random() > 0.5) {
    //       return {
    //         message: 'Число больше 0,5'
    //       }
    //     } else {
    //       return {
    //         message: 'Число меньше 0,5'
    //       }
    //     }
    //   }
    // },
    // {
    //   provide: TOKEN_FOR_USEFACTORY_2,
    //   useFactory: (http: HttpClient, pagesService: PagesService) => {
    //     if (Math.random() > 0.5) {
    //       return new PostsService();
    //     } else {
    //       return new LocationsService(http, pagesService);
    //     }
    //   },
    //   deps: [HttpClient, PagesService]
    // },

    // useExisting исп. когда нужно зарег. несколько токенов для одного и того же экземпляра сервиса, потому что если бы мы ниже регистрировали зависимости через useClass то создавались бы 2 разных экземпляра зависимости
    // {
    //   provide: USER_RANDOM_SERVICE_TOKEN,
    //   useClass: RandomService
    // },
    // {
    //   provide: ADMIN_RANDOM_SERVICE_TOKEN,
    //   useExisting: USER_RANDOM_SERVICE_TOKEN
    // }
  ],
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    NgIf,

    ToastComponent,
    ModalComponent,
    CookiesToastComponent,
    ThemeToggleComponent
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  private tgService = inject(TelegramService);
  public  cookiesAgreementService = inject(CookiesAgreementService);
  private routerSub: Subscription;
  private router = inject(Router);
  private pagesService = inject(PagesService);
  private colorSchemeService = inject(ColorSchemeService);

  constructor(
    public modalService: GlobalModalService, // typeScript детает такой синтакс сахар - можем объявлять свойства данного класса прям в конструкторе, то есть нет необх писать constructor(private/public/protected/readonly name: string) { this.name = name } можно просто constructor(private name: string) { }
    // @Inject(GlobalModalService) public modalService: GlobalModalService, // это аналогичный верхнему способ внедрения зависимости, но на практике такой способ внедрения зависимости используется когда необх внедрить какие то данные регистрируемые через useValue
    
    @Inject(DOCUMENT) private readonly documentRef: Document,
    
    // @Inject(COLOR) private tokenUseValue: string,
    // @Inject(TOKEN_FOR_USEFACTORY_1) private tokenUseFactory1: string,
    // @Inject(TOKEN_FOR_USEFACTORY_2) private tokenUseFactory2: string,

    // @Inject(USER_RANDOM_SERVICE_TOKEN) private userRandomService: RandomService,
    // @Inject(ADMIN_RANDOM_SERVICE_TOKEN) private adminRandomService: RandomService,
  ) {
    // console.log('color from tokenUseValue:', tokenUseValue);
    // console.log('tokenUseFactory1:', tokenUseFactory1);
    // console.log('tokenUseFactory2:', tokenUseFactory2);

    // console.log('userRandomService:', userRandomService);
    // console.log('adminRandomService:', adminRandomService);

    this.colorSchemeService.load();
  }

  ngOnInit(): void {
    // console.log(navigator.userAgent);
    this.tgService.ready(); // Это для телеги

    // 2-ой способ как перекрасить страницу для темной/светлой темы:
    // const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // console.log(isDarkMode ? 'Тёмный режим включен.' : 'Тёмный режим выключен.');

    // 2-ой способ как перекрасить страницу для темной/светлой темы:
    // const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // schemeQuery.addEventListener('change', this.updateScheme);

    setTimeout(() => {
      this.cookiesAgreementService.getCookiesAgreement();
    }, 2000);
    // this.cookiesAgreementService.removeCookiesAgreement();

    this.checkRouterEvents();
  }

  // 2-ой способ как перекрасить страницу для темной/светлой темы:
  // private updateScheme(event): void {
  //   const newScheme = event.matches ? "тёмная" : "светлая";
  //   console.log(`Цветовая схема системы обновлена на ${newScheme}.`);
  //   // Время адаптировать интерфейс 🌓
  // } // воспроизвести можно в хроме в dev tools во вкладке "Rendering"

  public get appWebview(): boolean {
    const myNavigator = this.documentRef.defaultView.navigator; // почему нежелательно просто обратиться к navigator.userAgent читай в notes.md
    const result = myNavigator.userAgent.includes('Dazzlink');
    // return true;
    return result;
  }

  private checkRouterEvents(): void {
    this.routerSub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        pairwise()
      ).subscribe(
        // previous => {
        //   console.log(previous);
        // }
        ([previous, current]: [NavigationEnd, NavigationEnd]) => {
          // console.log('appComponent:', previous.url);
          this.pagesService.prevPage.set(previous.url);
          // console.log('appComponent:', current.url);
        }
      )
  }

  buttonInModalClick(modalDesc) {
    if (!this[modalDesc.methodName]) {
      console.log(`В компоненте "${modalDesc.componentName}" нет метода "${modalDesc.methodName}"`);
      return;
    }
    this[modalDesc.methodName]();
  }

  public clickByCloseModal(): void {
    this.modalService.close();
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
