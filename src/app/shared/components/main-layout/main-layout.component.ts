import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';
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
    private pagesService: PagesService
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

}
