import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxNewFieldComponent),
  multi: true,
}

@Component({
  selector: 'app-checkbox-new-field',
  templateUrl: './checkbox-new-field.component.html',
  styleUrls: ['./checkbox-new-field.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class CheckboxNewFieldComponent implements ControlValueAccessor {

    @Input()
    public options: any;
    @Input()
    public onlyNgContent = false;
    @Input()
    private cantTurnFalse = false;
    @Input()
    private rowReverse = false;
    @Input()
    private captionClickable = false;

    @Output()
    public captionClick = new EventEmitter();

    public disabledControl = false;
    public selected: boolean;

    private onChange = (value: any) => { }; // Когда будем вызывать этот метод "onChange" angular будет самостоятельно output-ить изм наверх
    private onTouch = () => { };

    public writeValue(value: any): void {
        if (value) {
            this.selected = true;
        } else {
            this.selected = false;
        }
    }

    public onSelectValue(): void {
        if (this.selected && this.cantTurnFalse) { // если текущее сост чекбокса = true и его нельзя переводить в false сост тогда ничего не делаем

        } else {
            if (!this.disabledControl) { // если контрол не заблокирован
                this.selected = !this.selected;
                this.onChange(this.selected);
                this.onTouch();
            }
        }
    }

    public onCaptionClick(e): void {
        if (this.captionClickable) {
            e.stopPropagation();
            this.captionClick.emit();
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabledControl = isDisabled;
    }
}