import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  input,
  InputSignal,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appClickOutsideNew]',
  standalone: true,
  exportAs: 'custom',
  host: {
    '[style.color]': 'appClickOutsideNewProps',
    '[style.fontSize.px]': 'inlineFontSize',
    '(click)': 'changeSize()'
  }
})
export class ClickOutsideNewDirective {

  private _el = inject(ElementRef);
  private inlineFontSize = 16;

  @Input('color') colorProps: string;
  @Input('appClickOutsideNew') appClickOutsideNewProps: string;

  @HostBinding('class.classFromDirective') mouseEnter = false;

  @HostBinding('style.background') bgColor: string;

  @HostListener('mouseenter', ['$event', '{name: "Ivan"}'])
  onMouseEnter(event: MouseEvent, mess: any) {
    // console.log('onMouseEnter', event, mess);
    this.mouseEnter = true;
    this.bgColor = this.getRandomColor();
  }
  
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    // console.log('onMouseLeave');
    this.mouseEnter = false;
    this.bgColor = null;
  }

  ngOnChanges() {
    console.log('color:', this.colorProps);
    console.log('appClickOutsideNew:', this.appClickOutsideNewProps);
  }

  private changeSize(): void {
    if (this.inlineFontSize >=28) {
      this.inlineFontSize = 16;
    } else {
      this.inlineFontSize += 1;
    }
  }

  public getRandomColor(): string {
    const newColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
    return newColor; // #2F16E3
  }

}
