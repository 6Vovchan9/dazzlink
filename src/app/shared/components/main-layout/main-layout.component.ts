import { Component, DoCheck, OnInit, Optional, inject } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

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
export class MainLayoutComponent implements OnInit, DoCheck {

  public showNavModal = false;
  public scrollDown = false;
  private prewScrollTop = 0;
  public myForm: UntypedFormGroup;
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

  private tgService = inject(TelegramService);

  constructor(
    private visitsService: VisitsService,
    private pagesService: PagesService,
    public modalService: GlobalModalService,
    @Optional() public mobileDetectService: MobileDetectService,
  ) { }

  ngDoCheck(): void {
    if (this.checkLocationsPageOrNot()) {
      this.mainLayoutOpt.header.fixed = false;
    } else {
      this.mainLayoutOpt.header.fixed = true;
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  public checkLocationsPageOrNot(): boolean {
    return window.location.pathname.includes('locations') || window.location.pathname.includes('help') || window.location.pathname.includes('agreements');
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

  private hideScroll(): void {
    document.body.classList.add('no-scroll');
  }

  private showScroll(): void {
    document.body.classList.remove('no-scroll');
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

}
