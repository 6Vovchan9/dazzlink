import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownFieldComponent } from './dropdown-field.component';
import { ClickOutsideDirective } from '@app/shared/directives/clickOutside.directive';

@NgModule({
  declarations: [
    DropdownFieldComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownFieldComponent,
    ClickOutsideDirective
  ]
})
export class DropdownFieldModule { }
