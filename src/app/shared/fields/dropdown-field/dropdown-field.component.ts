import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type DropdownOptions = {
  id: string;
  items: Array<DropdownItem>;
  value?: DropdownItem | Array<DropdownItem> | Array<string> | string;
  disabled?: boolean;
  required?: boolean;
};

export type DropdownItem = {
  caption: string;
  value: string;
  selected?: boolean;
  details?: string;
};

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownFieldComponent),
      multi: true,
    }
  ],
  // encapsulation: ViewEncapsulation.None,
})
export class DropdownFieldComponent implements OnInit, ControlValueAccessor {

  @Input()
  public options: DropdownOptions;
  @Input()
  public multiple = false;
  @Input()
  public optionLabel: string;
  @Input()
  public arrowIcon: string;
  @Input()
  public listOnTop = false;
  @Output()
  public clickByItemDesc = new EventEmitter<string>();

  public disabledControl = false;
  public selectedItems: any;
  public closedState = true;

  ngOnInit(): void { }

  public writeValue(value: any): void {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(item => {
          const curVal = (item.value || item).toLowerCase();
          this.options.items.map(radioButtonItem => {
            if (radioButtonItem.value.toLowerCase() === curVal) {
              radioButtonItem.selected = true;
            }
            // else {
            //   delete item.selected;
            // } // Скорее всего это нужно будет
            return radioButtonItem;
          });
        });
      } else {
        const curVal = (value.value || value).toLowerCase();
        this.options.items.map(item => {
          if (item.value.toLowerCase() === curVal) {
            item.selected = true;
          } else {
            delete item.selected;
          }
          return item;
        });
      }
    } else {
      this.options.items.map(item => {
        delete item.selected;
        return item;
      });
    }

    this.selectedItems = this.createSelectedItemsForScreen(this.options.items.filter(item => item.selected));
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabledControl = isDisabled;
  }

  public selectValue(radioItem: DropdownItem): void {
    if (!this.disabledControl) {
      if (!radioItem.selected) { // Если item еще не выбран
        if (!this.multiple) { // Если не возможен множественный выбор тогда сначала отключим все варианты
          this.options.items.map((item) => {
            delete item.selected;
            return item;
          });
          let res = radioItem;
          if (this.optionLabel) {
            res = radioItem[this.optionLabel] || radioItem;
          }
          // console.log('1', res);
          this.selectedItems = this.createSelectedItemsForScreen(res);
          this.closedState = true; // закрываем выпадающий список
          this.onChange(res);
        }
        radioItem.selected = true;
        if (this.multiple) {
          let res = this.options.items.filter(item => item.selected);
          if (this.optionLabel && radioItem[this.optionLabel]) {
            res = res.map(el => el[this.optionLabel]);
          }
          // console.log('2', res)
          this.selectedItems = this.createSelectedItemsForScreen(res);
          this.onChange(res);
        }
      } else if (this.multiple && radioItem.selected) {
        delete radioItem.selected;
        let res = this.options.items.filter(item => item.selected);
        if (this.optionLabel && radioItem[this.optionLabel] && res.length) {
          res = res.map(el => el[this.optionLabel]);
        }
        // console.log('3', res)
        this.selectedItems = this.createSelectedItemsForScreen(res);
        this.onChange(res.length ? res : null);
      }
      this.onTouch();
    }
  }

  createSelectedItemsForScreen(res) {
    if (Array.isArray(res)) {
      return res.map(item => item[this.optionLabel] || item['value'] || item).join(', ');
    } else {
      return res[this.optionLabel] || res['value'] || res;
    }
  }

  clickOutside(clickByBackground = false) {
    if (document.documentElement.clientWidth >= 768 || clickByBackground ) {
      this.closedState = true;
    }
  }

  public toggleState(e): void {
    e.stopPropagation();
    if (!this.disabledControl) {
      this.closedState = !this.closedState;
    }
  }

  public generateIconPath(IconHref: string): string {
    return `url(${IconHref})`;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private onChange = (value: any) => { }; // Когда будем вызывать этот метод "onChange" angular будет самостоятельно output-ить изм наверх
  private onTouch = () => { };
}
