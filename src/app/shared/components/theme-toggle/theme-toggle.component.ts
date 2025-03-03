import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';

import {
  ColorSchemeService,
  ThemeTypes
} from '@app/shared/services/color-scheme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  themeTypes = ThemeTypes;
  public colorSchemeService = inject(ColorSchemeService);

  goToAnotherTheme() {
    const curThemeLight = this.colorSchemeService.currentActive() === ThemeTypes.Light;
    const futureTheme = curThemeLight ? ThemeTypes.Dark : ThemeTypes.Light;
    this.colorSchemeService.update(futureTheme);
  }
}
