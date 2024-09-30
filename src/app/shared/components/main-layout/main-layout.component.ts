import { Component, DoCheck, ElementRef, OnDestroy, OnInit, Optional, ViewChild, inject } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AbsractExample } from '@app/shared/helpers/classes/abstract.class';
import { headerHeightInDesktop } from '@app/shared/constants/all.constants';
import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';
import { MainLayoutOptions } from '@app/shared/interfaces';
import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { PagesService } from '@app/shared/services/pages.service';
import { TelegramService } from '@app/shared/services/telegram.service';
import { VisitsService } from '@app/shared/services/visits.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent extends AbsractExample implements OnInit, DoCheck, OnDestroy {

  @ViewChild('pageWrap') pageWrapEl: ElementRef;

  public showNavModal = false;
  public scrollDown = false;
  private prewScrollTop = 0;
  public myForm: UntypedFormGroup;
  public routerLinkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored',
    paths: 'subset'
  };
  public mainLayoutOpt: MainLayoutOptions = {
    header: {
      fixed: true,
      withAnimation: true
    },
    footerFixed: false
  };
  public langFieldOptions: DropdownOptions = {
    disabled: false,
    id: "language",
    required: true,
    items: [
      { value: 'RU', caption: 'RU', details: 'Русский' },
      { value: 'UZ', caption: 'UZ', details: "O'zbek" },
      { value: 'EN', caption: 'EN', details: 'English' },
      { value: 'KZ', caption: 'KZ', details: 'Қазақша' }
    ],
    // value: 'RU'
  };
  private rSub: Subscription;

  private tgService = inject(TelegramService);

  constructor(
    private visitsService: VisitsService,
    private pagesService: PagesService,
    public modalService: GlobalModalService,
    private router: Router,
    @Optional() public mobileDetectService: MobileDetectService,
  ) { super() }

  requiredMethod(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  ngDoCheck(): void {
    if (this.checkLocationsPageOrNot()) {
      this.mainLayoutOpt.header.fixed = false;
    } else {
      this.mainLayoutOpt.header.fixed = true;
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.scrollToTop();
  }

  private scrollToTop(): void {
    this.rSub = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      filter((event: NavigationEnd) => !event.url.includes('/team')) // Todo: такая фигня изза того что страница "О команде" скроллится наверх при открытии/закрытии модалки. Надо в будущем переверстать layout
    ).subscribe(
      val => {
        this.pageWrapEl.nativeElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        })
        // console.log(val);
      }
    )
  }

  public checkLocationsPageOrNot(): boolean {
    return window.location.pathname.includes('locations')
      || window.location.pathname.includes('help')
      || window.location.pathname.includes('agreements')
      || window.location.pathname.includes('legal-info');
  }

  clickByCloseModal(modalName) {
    this.modalService.close();
  }

  onScrollPage(e) {
    // console.log(e.target.scrollTop);
    const curScrollTop = e.target.scrollTop;
    if (curScrollTop > this.prewScrollTop) {
      // console.log('Листаем вниз');
      if (curScrollTop < headerHeightInDesktop) {
        this.scrollDown = false;
      } else {
        this.scrollDown = true;
      }
    } else {
      // console.log('Листаем вверх');
      this.scrollDown = false;
    }
    this.prewScrollTop = curScrollTop;
  }

  public get curYear() {
    return new Date().getFullYear();
  }

  public get webview(): boolean {
    const result = navigator.userAgent.includes('Dazzlink');
    // return true;
    return result;
  }

  private createForm(): void {

    const langFromService = this.pagesService.currentLanguage.getValue();
    this.myForm = new UntypedFormGroup({
      language: new FormControl<string | null>({ value: langFromService, disabled: this.langFieldOptions.disabled }, this.langFieldOptions.required ? [Validators.required] : []),
    });
  }

  public onChangeLang(lang, fromModal?: boolean): void {
    // console.log(lang)
    this.pagesService.currentLanguage.next(lang);
    if (fromModal) this.closeNavPopup();
  }

  goToAnotherPage(futurePath?: string): void {
    // const pathnameBeforeNav = location.pathname;
    // if (pathnameBeforeNav !== futurePath) {
      this.closeNavPopup();
    // }
  }

  getAmountOfUserVisits() {
    this.visitsService.getAmountOfVisits().subscribe(
      amount => {
        console.log(amount);
      }
    )
  }

  public openNavPopup(): void {
    this.showNavModal = true;
    this.hideScroll();
  }

  public closeNavPopup(): void {
    this.showNavModal = false;
    this.showScroll();
  }

  public qrModalOrTelegram(): void {
    if (this.mobileDetectService?.osDevice) {
      this.mobileDetectService.goToTelegramChannel();
    } else {
      this.modalService.open({ component: 'mainLayoutComponent', modalName: 'qrForTelegram' });
    }
  }

  public openQRModal(): void {
    this.modalService.open({ component: 'mainLayoutComponent' }); // на аргумент можно не обращать внимание
  }

  private clickByCompanyBlock(): void {
    if (this.tgService.mainTgButton) {
      this.tgService.mainTgButton.setText('MainButton');
      this.tgService.mainTgButton.show();
    }
  }

  ngOnDestroy(): void {
    this.rSub?.unsubscribe();
  }

}
