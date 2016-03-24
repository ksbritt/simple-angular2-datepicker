import {Component} from 'angular2/core';
import {DatePickerComponent} from './datepicker'

@Component({
    selector: 'my-app',
    template: `
    	<h3>Angular 2 DatePicker</h3>
    	<input #dateText type='text' value={{selDate}}/>
    	<date-picker 
            [disableBefore]="disableBefore" 
            [disableAfter]="disableAfter"
            (selectedDate)='setDate($event)'></date-picker>
    `,
	directives: [DatePickerComponent]
})
export class AppComponent {

	selDate:string='MM/DD/YYYY';
    disableBefore:string='03/15/2016';
    disableAfter:string='04/20/2016';
	
	setDate(date){
		this.selDate = date;
	}

}