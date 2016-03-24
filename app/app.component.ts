import {Component} from 'angular2/core';
import {DatePickerComponent} from './datepicker'

@Component({
    selector: 'my-app',
    template: `
    	<h3>Angular 2 DatePicker</h3>
    	<input #dateText type='text' value={{selDate}}/>
    	<date-picker 
            [minDate]="minDate" 
            [maxDate]="maxDate"
            [disableDays]="disableDays"
            [toContainPrevMonth]="toContainPrevMonth"
            [toContainNextMonth]="toContainNextMonth"
            (selectedDate)='setDate($event)'></date-picker>
    `,
	directives: [DatePickerComponent]
})
export class AppComponent {

	selDate:string='MM/DD/YYYY';
    minDate:string='01/01/2016';
    maxDate:string='12/31/2017';
    disableDays:Array<number>=[0,6];    //For Sunday and Saturday
    toContainPrevMonth:boolean = false;
    toContainNextMonth:boolean = false;
	
	setDate(date){
		this.selDate = date;
	}

}