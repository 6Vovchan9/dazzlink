import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type FieldOptions = {
  id: string;
  items: Array<RadioButtonItem>;
  value?: RadioButtonItem | string;
  disabled?: boolean;
  required?: boolean;
};

export type RadioButtonItem = {
  id?: string; // Нужен для clickByItemDesc.emit(id) для того чтоб понять на какой именно question-circle нажали, описание какого именно элемента radiobutton хотим получить
  caption: string;
  value: string;
  showItemDesc?: boolean; // Чтоб появился question-circle около элемента radiobutton, но также важно чтоб был заполнен id
  iconSrc?: string;
  selected?: boolean
};

@Component({
  selector: 'app-radiobutton-field',
  templateUrl: './radiobutton-field.component.html',
  styleUrls: ['./radiobutton-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiobuttonFieldComponent),
      multi: true,
    }
  ],
  // encapsulation: ViewEncapsulation.None,
})
export class RadiobuttonFieldComponent implements ControlValueAccessor {
  
  @Input()
  public options: FieldOptions;
  @Input()
  public multiple = false;
  @Input()
  public buttonStyle = false;
  @Input()
  public optionLabel: string;
  @Output()
  public clickByItemDesc = new EventEmitter<string>();

  public disabledControl = false;

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
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabledControl = isDisabled;
  }

  public selectValue(radioItem: RadioButtonItem): void {
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
          this.onChange(res);
        }
        radioItem.selected = true;
        if (this.multiple) {
          let res = this.options.items.filter(item => item.selected);
          if (this.optionLabel && radioItem[this.optionLabel]) {
            res = res.map(el => el[this.optionLabel]);
          }
          this.onChange(res);
        }
      } else if (this.multiple && radioItem.selected) {
        delete radioItem.selected;
        let res = this.options.items.filter(item => item.selected);
        if (this.optionLabel && radioItem[this.optionLabel] && res.length) {
          res = res.map(el => el[this.optionLabel]);
        }
        this.onChange(res.length ? res : null);
      }
      this.onTouch();
    }
  }

  public clickByCheckboxDesc(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.clickByItemDesc.emit(id);
  }

  public generateIconPath(IconHref: string): string {
    return `url(${IconHref})`;
  }

  private onChange = (value: any) => { }; // Когда будем вызывать этот метод "onChange" angular будет самостоятельно output-ить изм наверх
  private onTouch = () => { };
}
