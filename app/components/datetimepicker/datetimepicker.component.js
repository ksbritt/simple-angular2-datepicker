System.register(['angular2/core', '../datetimepicker/timepicker.component', '../../directives/datetimepicker/datetimepicker.directive'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, timepicker_component_1, datetimepicker_directive_1;
    var DateTimePickerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (timepicker_component_1_1) {
                timepicker_component_1 = timepicker_component_1_1;
            },
            function (datetimepicker_directive_1_1) {
                datetimepicker_directive_1 = datetimepicker_directive_1_1;
            }],
        execute: function() {
            DateTimePickerComponent = (function () {
                function DateTimePickerComponent() {
                    this.value = '';
                    this.dates = [];
                    this.showDp = 'none';
                    this.selectedDate = new core_1.EventEmitter();
                    this.selectedTime = new core_1.EventEmitter();
                }
                DateTimePickerComponent.prototype.ngOnChanges = function () {
                    this.daysofWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    this.currMonth = this.months[new Date().getMonth()].toString();
                    this.currYear = new Date().getFullYear().toString();
                    //Set previous and next months
                    this.prevMonth = this.months[new Date().getMonth() - 1].toString();
                    this.nextMonth = this.months[new Date().getMonth() + 1].toString();
                    this.prevYear = (parseInt(this.currYear) - 1).toString();
                    this.nextYear = (parseInt(this.currYear) + 1).toString();
                    //Set Date Array
                    if (this.value != '') {
                        var givenDate = moment(this.value, "MM/DD/YYYY", true);
                        this.currMonth = this.months[givenDate.month()].toString();
                        this.currYear = givenDate.year();
                        this.dates = this.setDateArray(this.currMonth, this.currYear, givenDate.date());
                    }
                    else {
                        this.dates = this.setDateArray(this.currMonth, this.currYear, '');
                    }
                };
                DateTimePickerComponent.prototype.setPrevMonth = function () {
                    this.nextMonth = this.currMonth;
                    this.currMonth = this.prevMonth;
                    //Set new previous month
                    var tempDate = new Date(this.currMonth + '/' + '1' + '/' + this.currYear);
                    if (this.currMonth == 'Jan') {
                        //Set previous month to December
                        this.prevMonth = this.months[11].toString();
                    }
                    else
                        this.prevMonth = this.months[tempDate.getMonth() - 1].toString();
                    if (this.currMonth == 'Dec') {
                        //Set current year to previous year
                        this.currYear = this.prevYear;
                        this.prevYear = (parseInt(this.currYear) - 1).toString();
                        this.nextYear = (parseInt(this.currYear) + 1).toString();
                    }
                    //Set Date Array to previous month
                    this.dates = this.setDateArray(this.currMonth, this.currYear, '');
                };
                DateTimePickerComponent.prototype.setNextMonth = function () {
                    this.prevMonth = this.currMonth;
                    this.currMonth = this.nextMonth;
                    //Set new next month
                    var tempDate = new Date(this.currMonth + '/' + '1' + '/' + this.currYear);
                    if (this.currMonth == 'Dec') {
                        //Set next month to January
                        this.nextMonth = this.months[0].toString();
                    }
                    else
                        this.nextMonth = this.months[tempDate.getMonth() + 1].toString();
                    if (this.currMonth == 'Jan') {
                        //Set current year to previous year
                        this.currYear = this.nextYear;
                        this.prevYear = (parseInt(this.currYear) - 1).toString();
                        this.nextYear = (parseInt(this.currYear) + 1).toString();
                    }
                    //Set Date Array to next month
                    this.dates = this.setDateArray(this.currMonth, this.currYear, '');
                };
                DateTimePickerComponent.prototype.setDateArray = function (month, year, date) {
                    var tempLastDate = this.decideDate(month, year);
                    var temp = [];
                    for (var i = 1; i <= tempLastDate; i++) {
                        var currentDate = moment().year(year).month(month).date(i);
                        var pastDate = moment(this.minDate, "MM/DD/YYYY");
                        var futureDate = moment(this.maxDate, "MM/DD/YYYY").add(1, 'd');
                        var dbld = false;
                        var today = false;
                        //To disable Days - Index based 0-6
                        for (var dayIndex = 0; dayIndex < this.disableDays.length; dayIndex++) {
                            if (currentDate.day() == this.disableDays[dayIndex]) {
                                dbld = true;
                            }
                        }
                        if ((this.months.indexOf(month) + 1 === moment().month() + 1 && i === moment().date())) {
                            today = true;
                        }
                        if (currentDate.isBefore(this.minDate, true) || currentDate.isAfter(futureDate, true)) {
                            dbld = true;
                        }
                        if (i != date)
                            temp.push({ 'month': this.months.indexOf(month) + 1, 'date': i, 'disabled': dbld, 'selected': false, 'today': today, 'empty': false });
                        else
                            temp.push({ 'month': this.months.indexOf(month) + 1, 'date': i, 'disabled': dbld, 'selected': true, 'today': today, 'empty': false });
                    }
                    this.completeDates = temp;
                    //Determine Date of First of the Month
                    var firstDate = new Date(month + '/' + '1' + '/' + year);
                    var lastDate = new Date(month + '/' + tempLastDate + '/' + year);
                    //Prepend Prev Month Dates
                    var spaceArray = [];
                    if (firstDate.getDay() != 0) {
                        //Not Sunday
                        var pMonth = this.months.indexOf(month) - 1;
                        var prevLast = this.decideDate(this.months[pMonth], year);
                        //Fix it to display last date last
                        for (var i = 0; i < firstDate.getDay(); i++) {
                            if (this.toContainPrevMonth) {
                                spaceArray.push({ 'month': firstDate.getMonth() - 1, 'date': prevLast, 'disabled': true, 'selected': false, 'empty': false });
                            }
                            else {
                                spaceArray.push({ 'month': '', 'date': '', 'disabled': false, 'selected': false, 'empty': true });
                            }
                            prevLast--;
                        }
                    }
                    this.tempArray = spaceArray.reverse().concat(this.completeDates);
                    //Append Next Month Dates
                    if (lastDate.getDay() != 6) {
                        //Not Saturday
                        var nIndex = 1;
                        for (var i = 6; i > lastDate.getDay(); i--) {
                            if (this.toContainNextMonth) {
                                this.tempArray.push({ 'month': firstDate.getMonth() + 1, 'date': nIndex, disabled: true, 'selected': false, 'empty': false });
                            }
                            else {
                                this.tempArray.push({ 'month': '', 'date': '', disabled: false, 'selected': false, 'empty': true });
                            }
                            nIndex++;
                        }
                    }
                    var tempDateChild = [];
                    var tempDateMain = [];
                    for (var date_1 in this.tempArray) {
                        if ((parseInt(date_1) + 1) % 7 == 0) {
                            tempDateChild.push(this.tempArray[date_1]);
                            tempDateMain.push(tempDateChild);
                            tempDateChild = [];
                        }
                        else {
                            tempDateChild.push(this.tempArray[date_1]);
                        }
                    }
                    return tempDateMain;
                };
                DateTimePickerComponent.prototype.decideDate = function (month, year) {
                    var last = 31;
                    switch (month) {
                        case 'Feb':
                            {
                                //Feb
                                last = 28;
                                if ((parseInt(year) % 4) == 0)
                                    last = last + 1;
                            }
                            break;
                        case 'Apr':
                        case 'Jun':
                        case 'Sep':
                        case 'Nov':
                            {
                                //April, June, September, November 
                                last = 30;
                            }
                            break;
                        default: break;
                    }
                    return last;
                };
                DateTimePickerComponent.prototype.setDate = function (sDate) {
                    if (!sDate.disabled) {
                        if (sDate.date != '') {
                            //Set the new date array with active date
                            this.dates = this.setDateArray(this.currMonth, this.currYear, sDate.date);
                            var selDate = moment().year(this.currYear).month(this.currMonth).date(sDate.date).format('MM/DD/YYYY', true);
                            this.selectedDate.next(selDate);
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DateTimePickerComponent.prototype, "minDate", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DateTimePickerComponent.prototype, "maxDate", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DateTimePickerComponent.prototype, "disableDays", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], DateTimePickerComponent.prototype, "toContainPrevMonth", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], DateTimePickerComponent.prototype, "toContainNextMonth", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DateTimePickerComponent.prototype, "value", void 0);
                DateTimePickerComponent = __decorate([
                    core_1.Component({
                        selector: 'date-time-picker',
                        templateUrl: 'app/components/datetimepicker/datetimepicker.component.html',
                        outputs: ['selectedDate', 'selectedTime'],
                        directives: [timepicker_component_1.TimepickerComponent, datetimepicker_directive_1.DateTimePickerDirective]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DateTimePickerComponent);
                return DateTimePickerComponent;
            }());
            exports_1("DateTimePickerComponent", DateTimePickerComponent);
        }
    }
});
//# sourceMappingURL=datetimepicker.component.js.map