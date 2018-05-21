import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDecimal]'
})
export class DecimalDirective {

  private regexp: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
  private allowedKeys: Array<string> = ['Backspace', 'Delete', 'Tab', 'End', "Del", 'Home', 'ArrowLeft', 'ArrowRight', "Left", "Right", 'ArrowUp', 'ArrowDown'];

  constructor(private elemRef: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.allowedKeys.indexOf(event.key) !== -1) {
      return;
    }

    let value: string = this.elemRef.nativeElement.value;
    if ((value.indexOf('.') != -1) &&
      (value.substring(value.indexOf('.')).length > 2) &&
      (event.which != 0 && event.which != 8)) {
      event.preventDefault();
    }

    let output: string = value.concat(event.key);
    if (output && !String(output).match(this.regexp)) {
      event.preventDefault();
    }
  }

}
