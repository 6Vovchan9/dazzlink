import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-acco-trigger',
  templateUrl: './acco-trigger.component.html',
  styleUrls: ['./acco-trigger.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccoTriggerComponent),
      multi: true,
    }
  ]
})
export class AccoTriggerComponent implements ControlValueAccessor {

  public active: boolean;

  private onChange = (value: any) => { }; // Когда будем вызывать этот метод "onChange" angular будет самостоятельно output-ить изм наверх
  private onTouch = () => { };

  public writeValue(value: boolean): void {
    this.active = value;
  }

  public onClick(): void {
    this.active = !this.active;
    this.onChange(this.active);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void { }

}
