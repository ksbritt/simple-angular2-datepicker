import {Directive, ElementRef, HostListener, Input} from 'angular2/core';

@Directive({
    selector: 'date-time-picker',
    host: {
        '[class.csg-state-hover]': 'hover',
        '[class.csg-state-focus]': 'focus',
        '[class.csg-state-disabled]': 'isDisabled()'
    }
})
export class DateTimePickerDirective {

    hover: boolean;

    focus: boolean;

    constructor(private el: ElementRef) { }

    @HostListener('mouseover', ['$event'])
    onMouseover(e) {
        this.hover = true;
    }

    @HostListener('mouseout', ['$event'])
    onMouseout(e) {
        this.hover = false;
    }

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