import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';
import { MobileDetectService } from '@app/shared/services/mobile-detect.service';
import { PagesService } from '@app/shared/services/pages.service';
import { VisitsService } from '@app/shared/services/visits.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public showNavModal = false;
  public myForm: FormGroup;
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

  constructor(
    private visitsService: VisitsService,
    private pagesService: PagesService,
    public mobileDetectService: MobileDetectService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public get curYear() {
    return new Date().getFullYear();
  }

  public get webview(): boolean {
    const result = navigator.userAgent.includes('Dazzlink');
    return navigator.userAgent.includes('Dazzlink');
  }

  private createForm(): void {

    const langFromService = this.pagesService.currentLanguage.getValue();

    this.myForm = new FormGroup({
      language: new FormControl({value: langFromService, disabled: this.langFieldOptions.disabled}, this.langFieldOptions.required ? [Validators.required] : []),
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

  public mobileStoreSrc(): string {
    const osDevice = this.mobileDetectService.osDevice;

    if (osDevice?.toLowerCase() === 'ios') {
      return 'assets/images/linkIOSShort.svg';
    } else if (osDevice?.toLowerCase() === 'androidos') {
      return 'assets/images/linkAndroidShort.svg';
    } else {
      return 'assets/images/linkAppGallery.svg';
    }
  }

  public goToStore(): void {
    const osDevice = this.mobileDetectService.osDevice;
    console.log('Идем в store');
    if (osDevice?.toLowerCase() === 'ios') {
      // window.location.href = 'https://www.apple.com/app-store';
      window.location.href = 'https://apps.apple.com/ru';
    } else if (osDevice?.toLowerCase() === 'androidos') {
      // window.open('https://play.google.com', '_blank');
      // window.location.href = 'https://play.google.com';
      window.open('https://play.google.com');
    } else {
      // window.location.href = 'https://appgallery.huawei.com';
      window.open('https://appgallery.huawei.com');
    }
  }

}
