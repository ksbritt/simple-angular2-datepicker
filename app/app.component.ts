import {Component} from 'angular2/core';
import {DatePickerComponent} from './datepicker'

@Component({
    selector: 'my-app',
    template: `
    	<h3>Angular 2 DatePicker</h3>
    	<input #dateText type='text' value={{selDate}}/>
    	<date-picker (selectedDate)='setDate($event)'></date-picker>
    `,
	directives: [DatePickerComponent]
})
export class AppComponent {

	selDate:string='MM/DD/YYYY';
	
	setDate(date){
		this.selDate = date;
	}

}