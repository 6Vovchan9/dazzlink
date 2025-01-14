import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutsideNew]',
  standalone: true
})
export class ClickOutsideNewDirective {

  @HostBinding('class.classFromDirective')
  mouseEnter = false; 

  @HostListener('mouseenter', ['$event', '{name: "Ivan"}'])
  onMouseEnter(event: MouseEvent, mess: any) {
    console.log('onMouseEnter', event, mess);
    this.mouseEnter = true;
  }
  
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.mouseEnter = false;
    console.log('onMouseLeave');
  }

}
