import { NgClass } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';

import {
  ColorSchemeService,
  ThemeTypes
} from '@app/shared/services/color-scheme.service';

@Component({
  selector: 'dz-theme-toggle',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  themeTypes = ThemeTypes;
  colorSchemeService = inject(ColorSchemeService);
  // #elRef = inject(ElementRef, { skipSelf: false }); // благодаря { skipSelf: true } получаем ссылка на родителя этого компонетна

  // constructor() {
  //   console.log(this.#elRef);
  // }

  goToAnotherTheme() {
    const curThemeLight = this.colorSchemeService.currentActive() === ThemeTypes.Light;
    const futureTheme = curThemeLight ? ThemeTypes.Dark : ThemeTypes.Light;
    this.colorSchemeService.update(futureTheme);
  }
}
