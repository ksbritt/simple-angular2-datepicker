import {Component, OnInit, Input, EventEmitter, Self} from 'angular2/core';
import {NgClass, NgModel, ControlValueAccessor} from 'angular2/common';
import {InputTextDirective} from '../../directives/input-text/input-text.directive';

export interface TimepickerConfig {
	hourStep: number;
	minuteStep: number;
	showMeridian: boolean;
	meridians?: any[];
	readonlyInput: boolean;
	mousewheel: boolean;
	arrowkeys: boolean;
	showSpinners: boolean;
	min?: number;
	max?: number;
}


export const timepickerConfig: TimepickerConfig = {
	hourStep: 1,
	minuteStep: 15,
	showMeridian: true,
	meridians: null,
	readonlyInput: false,
	mousewheel: true,
	arrowkeys: true,
	showSpinners: true,
	min: void 0,
	max: void 0
};

function isDefined(value: any): boolean {
	return typeof value !== 'undefined';
}

function def(value: any, fn: Function, defaultValue: any) {
	return fn(value) ? value : defaultValue;
}

function addMinutes(date: any, minutes: number) {
	let dt = new Date(date.getTime() + minutes * 60000);
	let newDate = new Date(date);
	newDate.setHours(dt.getHours(), dt.getMinutes() - (dt.getMinutes()%15);
	return newDate;
}

@Component({
	selector: 'timepicker[ngModel]',
	directives: [NgClass, InputTextDirective],
	templateUrl: './app/components/datetimepicker/timepicker.component.html',
	providers: [NgModel],
	outputs: ['selectedTime']
})
export class TimepickerComponent implements ControlValueAccessor, OnInit {
	// config
	@Input() private hourStep: number;
	@Input() private minuteStep: number;
	@Input() private readonlyInput: boolean;
	@Input() private mousewheel: boolean;
	@Input() private arrowkeys: boolean;
	@Input() private showSpinners: boolean;
	@Input() private min: Date;
	@Input() private max: Date;
	@Input() private meridians: Array<string> = ['AM', 'PM'];
	@Input() value: string = '';
	private selTime: string = ' 00:00 AM/PM'

	public selectedTime = new EventEmitter();

	@Input() private get showMeridian() {
		return this._showMeridian;
	}

	private set showMeridian(value: boolean) {
		this._showMeridian = value;
		// || !this.$error.time
		if (true) {
			this.updateTemplate();
			return;
		}
		// Evaluate from template
		let hours = this.getHoursFromTemplate();
		let minutes = this.getMinutesFromTemplate();
		if (isDefined(hours) && isDefined(minutes)) {
			this.selected.setHours(hours);
			this.refresh();
		}
	}

	// result value
	private _selected: Date = new Date();

	private _showMeridian: boolean;
	private meridian: any; // ??

	// input values
	private hours: string;
	private minutes: string;

	private get selected(): Date {
		return this._selected;
	}

	private set selected(v: Date) {
		if (v) {
			this._selected = v;
			this.updateTemplate();
			this.cd.viewToModelUpdate(this.selected);
		}
	}

	// validation
	private invalidHours: any;
	private invalidMinutes: any;

	constructor( @Self() public cd: NgModel) {
		cd.valueAccessor = this;
	}

	ngOnInit() {

		this.meridians = def(this.meridians, isDefined, timepickerConfig.meridians) || ['AM', 'PM'];

		this.readonlyInput = def(this.readonlyInput, isDefined, timepickerConfig.readonlyInput);

		this.setTime();

		this.hourStep = def(this.hourStep, isDefined, timepickerConfig.hourStep);
		this.minuteStep = def(this.minuteStep, isDefined, timepickerConfig.minuteStep);
		this.min = def(this.min, isDefined, timepickerConfig.min);
		this.max = def(this.max, isDefined, timepickerConfig.max);
		// 12H / 24H mode
		this.showMeridian = def(this.showMeridian, isDefined, timepickerConfig.showMeridian);
		this.showSpinners = def(this.showSpinners, isDefined, timepickerConfig.showSpinners);
	}

	setTime() {
		if (this.hours && this.minutes){
			let time = " " + this.hours + ":" + this.minutes + " " + this.meridian
			let selTime = time;
			console.log(selTime)
			this.selectedTime.next(selTime);
		}
	}


	private refresh(type?: string) {
		this.updateTemplate();
		this.cd.viewToModelUpdate(this.selected);
	}

	private updateTemplate(keyboardChange?: any) {
		let hours = this.selected.getHours();
		let minutes = this.selected.getMinutes();

		if (this.showMeridian) {
			// Convert 24 to 12 hour system
			hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
		}

		this.hours = this.pad(hours);
		this.minutes = this.pad(minutes);
		this.meridian = this.selected.getHours() < 12 ? this.meridians[0] : this.meridians[1];
	}

	private getHoursFromTemplate() {
		let hours = parseInt(this.hours, 10);
		let minutes = parseInt(this.minutes, 10);
		minutes = (((minutes + 7.5) / 15 | 0) * 15) % 60;
		hours = ((((minutes / 105) + .5) | 0) + hours) % 24;
		let valid = this.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
		if (!valid) {
			return undefined;
		}

		if (this.showMeridian) {
			if (hours === 12) {
				hours = 0;
			}
			if (this.meridian === this.meridians[1]) {
				hours = hours + 12;
			}
		}
		return hours;
	}

	private getMinutesFromTemplate() {
		let minutes = parseInt(this.minutes, 10);
		minutes = (((minutes + 7.5) / 15 | 0) * 15) % 60;
		return (minutes >= 0 && minutes < 60) ? minutes : undefined;
	}

	private pad(value: any) {
		return (isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();

	}

	private updateHours() {
		if (this.readonlyInput) {
			return;
		}

		let hours = this.getHoursFromTemplate();
		let minutes = this.getMinutesFromTemplate();

		if (!isDefined(hours) || !isDefined(minutes)) {
			// todo: validation?
			// invalidate(true);
		}

		this.selected.setHours(hours);
		if (this.selected < this.min || this.selected > this.max) {
			// todo: validation?
			// invalidate(true);
		} else {
			this.refresh('h');
		}
	}


	private updateMinutes() {
		if (this.readonlyInput) {
			return;
		}

		let minutes = this.getMinutesFromTemplate();
		let hours = this.getHoursFromTemplate();

		if (!isDefined(minutes) || !isDefined(hours)) {
			// todo: validation
			// invalidate(undefined, true);
		}

		this.selected.setMinutes(minutes);
		if (this.selected < this.min || this.selected > this.max) {
			// todo: validation
			// invalidate(undefined, true);
		} else {
			this.refresh('m');
		}
	}



	private noIncrementHours() {
		let incrementedSelected = addMinutes(this.selected, this.hourStep * 60);
		return incrementedSelected > this.max ||
			(incrementedSelected < this.selected && incrementedSelected < this.min);
	}

	private noDecrementHours() {
		let decrementedSelected = addMinutes(this.selected, -this.hourStep * 60);
		return decrementedSelected < this.min ||
			(decrementedSelected > this.selected && decrementedSelected > this.max);
	}

	private noIncrementMinutes() {
		let incrementedSelected = addMinutes(this.selected, this.minuteStep);
		return incrementedSelected > this.max ||
			(incrementedSelected < this.selected && incrementedSelected < this.min);
	}

	private noDecrementMinutes() {
		let decrementedSelected = addMinutes(this.selected, -this.minuteStep);
		return decrementedSelected < this.min ||
			(decrementedSelected > this.selected && decrementedSelected > this.max);

	}

	private addMinutesToSelected(minutes: any) {
		this.selected = addMinutes(this.selected, minutes);
		this.refresh();
	}

	noToggleMeridian() {
		if (this.selected.getHours() < 13) {
			return addMinutes(this.selected, 12 * 60) > this.max;
		} else {
			return addMinutes(this.selected, -12 * 60) < this.min;
		}
	}

	private incrementHours() {
		if (!this.noIncrementHours()) {
			this.addMinutesToSelected(this.hourStep * 60);
		}
	}

	private decrementHours() {
		if (!this.noDecrementHours()) {
			this.addMinutesToSelected(-this.hourStep * 60);
		}
	}

	private incrementMinutes() {
		if (!this.noIncrementMinutes()) {
			this.addMinutesToSelected(this.minuteStep);
		}
	}

	private decrementMinutes() {
		if (!this.noDecrementMinutes()) {
			this.addMinutesToSelected(-this.minuteStep);
		}
	}

	private toggleMeridian() {
		if (!this.noToggleMeridian()) {
			let sign = this.selected.getHours() < 12 ? 1 : -1;
			this.addMinutesToSelected(12 * 60 * sign);
		}
	}

}

