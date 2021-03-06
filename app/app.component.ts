import {Component} from 'angular2/core';
import {DateTimePickerComponent} from './components/datetimepicker/datetimepicker.component';
import {DateTimePickerDirective} from './directives/datetimepicker/datetimepicker.directive';
import {InputTextComponent} from './components/input-text/input-text.component';
import {InputTextDirective} from './directives/input-text/input-text.directive';
import {TimepickerComponent} from './components/datetimepicker/timepicker.component';
declare var moment: any;

@Component({
    selector: 'my-app',
    template: `
    	<h3>Angular 2 Date and Time Picker</h3>
    	<input class="input-calendar" input-text type='text' value={{selDate}}{{selTime}} (change)="setInput($event)"/>
        <i class="fa fa-calendar fa-lg" (click)='openDatePicker()'></i>
        <div class="arrowbox" [style.display]="showDp">
        <date-time-picker 
            [value]="value"
            [minDate]="minDate" 
            [maxDate]="maxDate"
            [disableDays]="disableDays"
            [toContainPrevMonth]="toContainPrevMonth"
            [toContainNextMonth]="toContainNextMonth"
            (selectedDate)='setDate($event)'
            ></date-time-picker>
            <timepicker [ngModel] (selectedTime)='setTime($event)'></timepicker>
            </div>
    `,
    directives: [DateTimePickerComponent, DateTimePickerDirective, InputTextComponent, InputTextDirective, TimepickerComponent]
})
export class AppComponent {
 
    private selDate: string = 'MM/DD/YYYY ';
    private selTime: string = ' 00:00 AM/PM'
    private minDate = moment();
    private maxDate: string = '12/31/2035';
    private disableDays: Array<number> = [0, 6];    //For Sunday and Saturday
    private toContainPrevMonth: boolean = false;
    private toContainNextMonth: boolean = false;
    private value: string = '';
    private showDp = 'none';
	

    openDatePicker() {
        if (this.showDp == 'none')
            this.showDp = 'block';
        else
            this.showDp = 'none';
    }
    
    setInput(event) {
        this.value = event.target.value;
    }
    
    setDate(date) {
        this.selDate = date;
    }

    setTime(time) {
        this.selTime = time;
    }

}