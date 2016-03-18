import {Component,OnInit,Input,EventEmitter} from 'angular2/core';

@Component({
    selector: 'date-picker',
    templateUrl: 'app/datepicker.html',
	styleUrls: ['app/datepicker.css'],
	outputs: ['selectedDate']
})

export class DatePickerComponent implements OnInit{

	//@Input('inputDate') inputDate:string;
	
	daysofWeek:Array<String>;
	currMonth:string;
	currYear:string;
	months:Array<String>;
	dates:any=[];
	completeDates:any;
	tempArray:any;
	prevMonth:string;
	nextMonth:string;
	prevYear:string;
	nextYear:string;
	showDp = 'none';
	selectedDate = new EventEmitter();
		
	
	ngOnInit() {
		//console.log('inputDate - '+this.inputDate);
		this.daysofWeek = ['Su','Mo','Tu','We','Th','Fr','Sa'];
		this.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		this.currMonth = this.months[new Date().getMonth()].toString();
		this.currYear = new Date().getFullYear().toString();
		//Set previous and next months
		this.prevMonth = this.months[new Date().getMonth()-1].toString();
		this.nextMonth = this.months[new Date().getMonth()+1].toString();
		this.prevYear = (parseInt(this.currYear) - 1).toString();
		this.nextYear = (parseInt(this.currYear) + 1).toString();
		//Set Date Array
		this.dates = this.setDateArray(this.currMonth,this.currYear,'');		
	}

	openDatePicker() {
		if (this.showDp=='none')
			this.showDp = 'block';
		else
			this.showDp = 'none';	
	}

	setPrevMonth() {
		this.nextMonth = this.currMonth;
		this.currMonth = this.prevMonth;
		//Set new previous month
		let tempDate = new Date(this.currMonth+'/'+'1'+'/'+this.currYear);
		if (this.currMonth=='Jan'){
			//Set previous month to December
			this.prevMonth = this.months[11].toString();
		}
		else
			this.prevMonth = this.months[tempDate.getMonth() - 1].toString();
		if (this.currMonth=='Dec') {
			//Set current year to previous year
			this.currYear = this.prevYear;
			this.prevYear = (parseInt(this.currYear) - 1).toString();
			this.nextYear = (parseInt(this.currYear) + 1).toString();
		}	
		//Set Date Array to previous month
		this.dates = this.setDateArray(this.currMonth,this.currYear,'');
	}

	setNextMonth() {
		this.prevMonth = this.currMonth;
		this.currMonth = this.nextMonth;
		//Set new next month
		let tempDate = new Date(this.currMonth+'/'+'1'+'/'+this.currYear);
		if (this.currMonth=='Dec'){
			//Set next month to January
			this.nextMonth = this.months[0].toString();
		}
		else
			this.nextMonth = this.months[tempDate.getMonth() + 1].toString();
		if (this.currMonth=='Jan') {
			//Set current year to previous year
			this.currYear = this.nextYear;
			this.prevYear = (parseInt(this.currYear) - 1).toString();
			this.nextYear = (parseInt(this.currYear) + 1).toString();
		}	
		//Set Date Array to next month
		this.dates = this.setDateArray(this.currMonth,this.currYear,'');
	}

	setDateArray(month,year,date):any{
		
		let tempLastDate = this.decideDate(month,year);
		let temp = [];
		for (let i=1;i<=tempLastDate;i++){
			if (i!=date)
				temp.push({'month':this.months.indexOf(month)+1,'date':i,'disabled':false,'selected':false});	
			else
				temp.push({'month':this.months.indexOf(month)+1,'date':i,'disabled':false,'selected':true});	
		}
		this.completeDates = temp;	

		//Determine Date of First of the Month
		let firstDate = new Date(month+'/'+'1'+'/'+year);
		let lastDate = new Date(month+'/'+tempLastDate+'/'+year);
		
		//Prepend Prev Month Dates
		let spaceArray=[];
		if (firstDate.getDay()!=0){
			//Not Sunday
			let pMonth = this.months.indexOf(month)-1;
			let prevLast = this.decideDate(this.months[pMonth],year);
			//Fix it to display last date last
			for (let i=0;i<firstDate.getDay();i++)
			{
				spaceArray.push({'month':firstDate.getMonth()-1,'date':prevLast,'disabled':true,'selected':false});
				prevLast--;
			}
		}
		this.tempArray = spaceArray.reverse().concat(this.completeDates);
		//Append Next Month Dates
		if (lastDate.getDay()!=6){
			//Not Saturday
			let nIndex = 1;
			for (let i=6;i>lastDate.getDay();i--){
				this.tempArray.push({'month':firstDate.getMonth()+1,'date':nIndex,disabled:true,'selected':false});
				nIndex++;
			}
		}
		
		let tempDateChild=[];
		let tempDateMain=[];
		for (let date in this.tempArray){
			if ((parseInt(date)+1)%7 == 0){
				tempDateChild.push(this.tempArray[date]);
				tempDateMain.push(tempDateChild);
				tempDateChild=[];
			}
			else{
				tempDateChild.push(this.tempArray[date]);
			}
		}
		return tempDateMain;

	}

	decideDate(month,year):number{
		let last = 31;
		switch (month){
			case 'Feb':{
				//Feb
				last = 28;
				if ((parseInt(year)%4) == 0)
					last = last + 1;
			} 
			break;
			case 'Apr' : 
			case 'Jun' :
			case 'Sep' :
			case 'Nov' :{
				//April, June, September, November 
				last = 30;
			} 
			break;
			default : break;
		}
		return last;
	}

	setDate(sDate) {
		if (!sDate.disabled){
			if (sDate.date!=''){
				//Set the new date array with active date
				this.dates = this.setDateArray(this.currMonth,this.currYear,sDate.date);

				let tempDate = new Date(this.currMonth+'/'+sDate.date+'/'+this.currYear);
				let month = (tempDate.getMonth()+1).toString();
				let date = (tempDate.getDate()).toString();
				if (tempDate.getMonth()<10)
					month = '0'+month;
				if (tempDate.getDate()<10)
					date = '0'+date;	
				let selDate = month+'/'+date+'/'+tempDate.getFullYear();
				this.selectedDate.next(selDate);
			}
		}
	}

}