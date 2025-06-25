import { NgClass } from '@angular/common';
import { Attribute, ChangeDetectionStrategy, Component, HostAttributeToken, inject, OnInit } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';

import { ColorSchemeService, ThemeTypes } from '@app/shared/services/color-scheme.service';
import { GlobalModalService } from '@app/shared/services/global-modal.service';
import { ThemeToggleComponent } from '@app/shared/components/theme-toggle/theme-toggle.component';
import { DropdownFieldModule } from '@app/shared/fields/dropdown-field/dropdown-field.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PagesService } from '@app/shared/services/pages.service';
import { DropdownOptions } from '@app/shared/fields/dropdown-field/dropdown-field.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    ReactiveFormsModule,

    ThemeToggleComponent,
    DropdownFieldModule,
  ],
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public colorSchemeService = inject(ColorSchemeService);
  langFieldOptions: DropdownOptions;
  #pagesService = inject(PagesService);
  themeTypes = ThemeTypes;
  myLetName2 = inject(new HostAttributeToken('name'), { optional: true }); // смотри ниже для чего это
  languageControl: FormControl;

  constructor(
    private modalService: GlobalModalService,
    @Attribute('name') public myLetName1: string // если нужно передать статическое значение дочернему компоненту, то лучше сделать это таким образом, использ. этого декоратора повышает произодит-ть приложения за счет оптимизации механизма ChangeDetection. Механизм ChangeDetection проверяет эти значения только на этапе инициализации компонента. Доступ к таким значениям можно получить внутри контсруктора, а не внутри метода ЖЦ ngOnChanges(). Это же можно сделать через функцию inject (см. выше)
  ) {
    this.langFieldOptions = this.#pagesService.langFieldOptions;
  }

  ngOnInit(): void {
    this.#initLangControl();
  }

  onChangeLang(lang: string): void {
    this.#pagesService.currentLanguage.next(lang);
  }

  #initLangControl(): void {
    const initVal = this.#pagesService.currentLanguage.getValue();
    this.languageControl = new FormControl<any>({ value: initVal, disabled: this.langFieldOptions.disabled });
  }

  setColorTheme(theme: ThemeTypes): void {
    this.colorSchemeService.update(theme);
  }

  // goToAnotherTheme() {
  //   const curThemeLight = this.colorSchemeService.currentActive() === ThemeTypes.Light;
  //   const futureTheme = curThemeLight ? ThemeTypes.Dark : ThemeTypes.Light;
  //   this.colorSchemeService.update(futureTheme);
  // }

  public routerLinkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored',
    paths: 'subset'
  };

  public openNavPopup(): void {
    this.modalService.open({ component: 'appComponent', modalName: 'navigationModal' });
    // this.hideScroll(); // следует иметь в виду, что, когда навигация короткая (и, следовательно, не прокручивается как тут), а пользователь пытается прокрутить ее, тело страницы будет прокручиваться, даже если установлено свойство overscroll-behavior-y: contain, поэтому придется прибегнуть к такому решению
  }

}
