import {Directive, ElementRef, HostListener, Input} from 'angular2/core';

@Directive({
    selector: '[input-text]',
    host: {
        '[class.csg-inputtext]': 'true',
        '[class.csg-state-focus]': 'focus',
        '[class.csg-state-disabled]': 'isDisabled()'
    }
})
export class InputTextDirective {

    focus: boolean;

    constructor(private el: ElementRef) { }

    @HostListener('focus', ['$event'])
    onFocus(e) {
        this.focus = true;
    }

    @HostListener('blur', ['$event'])
    onBlur(e) {
        this.focus = false;
    }

    isDisabled() {
        return this.el.nativeElement.disabled;
    }

}