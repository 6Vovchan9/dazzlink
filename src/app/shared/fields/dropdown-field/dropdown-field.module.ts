import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownFieldComponent } from './dropdown-field.component';
import { ClickOutsideDirective } from '@app/shared/directives/clickOutside.directive';
import { SvgIconComponent } from '@app/shared/components/svg-icon/svg-icon.component';

@NgModule({
  declarations: [
    DropdownFieldComponent,
    ClickOutsideDirective
  ],
  imports: [
    SvgIconComponent,
    CommonModule
  ],
  exports: [
    DropdownFieldComponent
  ]
})
export class DropdownFieldModule { }
