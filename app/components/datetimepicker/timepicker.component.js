System.register(['angular2/core', 'angular2/common', '../../directives/input-text/input-text.directive'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, input_text_directive_1;
    var timepickerConfig, TimepickerComponent;
    function isDefined(value) {
        return typeof value !== 'undefined';
    }
    function def(value, fn, defaultValue) {
        return fn(value) ? value : defaultValue;
    }
    function addMinutes(date, minutes) {
        var dt = new Date(date.getTime() + minutes * 60000);
        var newDate = new Date(date);
        newDate.setHours(dt.getHours(), dt.getMinutes());
        return newDate;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (input_text_directive_1_1) {
                input_text_directive_1 = input_text_directive_1_1;
            }],
        execute: function() {
            exports_1("timepickerConfig", timepickerConfig = {
                hourStep: 1,
                minuteStep: 1,
                showMeridian: true,
                meridians: null,
                readonlyInput: false,
                mousewheel: true,
                arrowkeys: true,
                showSpinners: true,
                min: void 0,
                max: void 0
            });
            TimepickerComponent = (function () {
                function TimepickerComponent(cd) {
                    this.cd = cd;
                    this.meridians = ['AM', 'PM'];
                    // result value
                    this._selected = new Date();
                    this.onChange = function (_) {
                    };
                    this.onTouched = function () {
                    };
                    cd.valueAccessor = this;
                }
                Object.defineProperty(TimepickerComponent.prototype, "showMeridian", {
                    get: function () {
                        return this._showMeridian;
                    },
                    set: function (value) {
                        this._showMeridian = value;
                        // || !this.$error.time
                        if (true) {
                            this.updateTemplate();
                            return;
                        }
                        // Evaluate from template
                        var hours = this.getHoursFromTemplate();
                        var minutes = this.getMinutesFromTemplate();
                        if (isDefined(hours) && isDefined(minutes)) {
                            this.selected.setHours(hours);
                            this.refresh();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimepickerComponent.prototype, "selected", {
                    get: function () {
                        return this._selected;
                    },
                    set: function (v) {
                        if (v) {
                            this._selected = v;
                            this.updateTemplate();
                            this.cd.viewToModelUpdate(this.selected);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                // todo: add formatter value to Date object
                TimepickerComponent.prototype.ngOnInit = function () {
                    // todo: take in account $locale.DATETIME_FORMATS.AMPMS;
                    this.meridians = def(this.meridians, isDefined, timepickerConfig.meridians) || ['AM', 'PM'];
                    this.mousewheel = def(this.mousewheel, isDefined, timepickerConfig.mousewheel);
                    if (this.mousewheel) {
                        this.setupMousewheelEvents();
                    }
                    this.arrowkeys = def(this.arrowkeys, isDefined, timepickerConfig.arrowkeys);
                    if (this.arrowkeys) {
                        this.setupArrowkeyEvents();
                    }
                    this.readonlyInput = def(this.readonlyInput, isDefined, timepickerConfig.readonlyInput);
                    this.setupInputEvents();
                    this.hourStep = def(this.hourStep, isDefined, timepickerConfig.hourStep);
                    this.minuteStep = def(this.minuteStep, isDefined, timepickerConfig.minuteStep);
                    this.min = def(this.min, isDefined, timepickerConfig.min);
                    this.max = def(this.max, isDefined, timepickerConfig.max);
                    // 12H / 24H mode
                    this.showMeridian = def(this.showMeridian, isDefined, timepickerConfig.showMeridian);
                    this.showSpinners = def(this.showSpinners, isDefined, timepickerConfig.showSpinners);
                };
                TimepickerComponent.prototype.writeValue = function (v) {
                    if (v === this.selected) {
                        return;
                    }
                    if (v && v instanceof Date) {
                        this.selected = v;
                        return;
                    }
                    this.selected = v ? new Date(v) : null;
                };
                TimepickerComponent.prototype.refresh = function (type) {
                    // this.makeValid();
                    this.updateTemplate();
                    this.cd.viewToModelUpdate(this.selected);
                };
                TimepickerComponent.prototype.updateTemplate = function (keyboardChange) {
                    var hours = this.selected.getHours();
                    var minutes = this.selected.getMinutes();
                    if (this.showMeridian) {
                        // Convert 24 to 12 hour system
                        hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
                    }
                    // this.hours = keyboardChange === 'h' ? hours : this.pad(hours);
                    // if (keyboardChange !== 'm') {
                    //  this.minutes = this.pad(minutes);
                    // }
                    this.hours = this.pad(hours);
                    this.minutes = this.pad(minutes);
                    this.meridian = this.selected.getHours() < 12 ? this.meridians[0] : this.meridians[1];
                };
                TimepickerComponent.prototype.getHoursFromTemplate = function () {
                    var hours = parseInt(this.hours, 10);
                    var valid = this.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
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
                };
                TimepickerComponent.prototype.getMinutesFromTemplate = function () {
                    var minutes = parseInt(this.minutes, 10);
                    return (minutes >= 0 && minutes < 60) ? minutes : undefined;
                };
                TimepickerComponent.prototype.pad = function (value) {
                    return (isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();
                };
                TimepickerComponent.prototype.setupMousewheelEvents = function () {
                };
                TimepickerComponent.prototype.setupArrowkeyEvents = function () {
                };
                TimepickerComponent.prototype.setupInputEvents = function () {
                };
                TimepickerComponent.prototype.updateHours = function () {
                    if (this.readonlyInput) {
                        return;
                    }
                    var hours = this.getHoursFromTemplate();
                    var minutes = this.getMinutesFromTemplate();
                    if (!isDefined(hours) || !isDefined(minutes)) {
                    }
                    this.selected.setHours(hours);
                    if (this.selected < this.min || this.selected > this.max) {
                    }
                    else {
                        this.refresh('h');
                    }
                };
                TimepickerComponent.prototype.hoursOnBlur = function (event) {
                    if (this.readonlyInput) {
                        return;
                    }
                    // todo: binded with validation
                    if (!this.invalidHours && parseInt(this.hours, 10) < 10) {
                        this.hours = this.pad(this.hours);
                    }
                };
                TimepickerComponent.prototype.updateMinutes = function () {
                    if (this.readonlyInput) {
                        return;
                    }
                    var minutes = this.getMinutesFromTemplate();
                    var hours = this.getHoursFromTemplate();
                    if (!isDefined(minutes) || !isDefined(hours)) {
                    }
                    this.selected.setMinutes(minutes);
                    if (this.selected < this.min || this.selected > this.max) {
                    }
                    else {
                        this.refresh('m');
                    }
                };
                TimepickerComponent.prototype.minutesOnBlur = function (event) {
                    if (this.readonlyInput) {
                        return;
                    }
                    if (!this.invalidMinutes && parseInt(this.minutes, 10) < 10) {
                        this.minutes = this.pad(this.minutes);
                    }
                };
                TimepickerComponent.prototype.noIncrementHours = function () {
                    var incrementedSelected = addMinutes(this.selected, this.hourStep * 60);
                    return incrementedSelected > this.max ||
                        (incrementedSelected < this.selected && incrementedSelected < this.min);
                };
                TimepickerComponent.prototype.noDecrementHours = function () {
                    var decrementedSelected = addMinutes(this.selected, -this.hourStep * 60);
                    return decrementedSelected < this.min ||
                        (decrementedSelected > this.selected && decrementedSelected > this.max);
                };
                TimepickerComponent.prototype.noIncrementMinutes = function () {
                    var incrementedSelected = addMinutes(this.selected, this.minuteStep);
                    return incrementedSelected > this.max ||
                        (incrementedSelected < this.selected && incrementedSelected < this.min);
                };
                TimepickerComponent.prototype.noDecrementMinutes = function () {
                    var decrementedSelected = addMinutes(this.selected, -this.minuteStep);
                    return decrementedSelected < this.min ||
                        (decrementedSelected > this.selected && decrementedSelected > this.max);
                };
                TimepickerComponent.prototype.addMinutesToSelected = function (minutes) {
                    this.selected = addMinutes(this.selected, minutes);
                    this.refresh();
                };
                TimepickerComponent.prototype.noToggleMeridian = function () {
                    if (this.selected.getHours() < 13) {
                        return addMinutes(this.selected, 12 * 60) > this.max;
                    }
                    else {
                        return addMinutes(this.selected, -12 * 60) < this.min;
                    }
                };
                TimepickerComponent.prototype.incrementHours = function () {
                    if (!this.noIncrementHours()) {
                        this.addMinutesToSelected(this.hourStep * 60);
                    }
                };
                TimepickerComponent.prototype.decrementHours = function () {
                    if (!this.noDecrementHours()) {
                        this.addMinutesToSelected(-this.hourStep * 60);
                    }
                };
                TimepickerComponent.prototype.incrementMinutes = function () {
                    if (!this.noIncrementMinutes()) {
                        this.addMinutesToSelected(this.minuteStep);
                    }
                };
                TimepickerComponent.prototype.decrementMinutes = function () {
                    if (!this.noDecrementMinutes()) {
                        this.addMinutesToSelected(-this.minuteStep);
                    }
                };
                TimepickerComponent.prototype.toggleMeridian = function () {
                    if (!this.noToggleMeridian()) {
                        var sign = this.selected.getHours() < 12 ? 1 : -1;
                        this.addMinutesToSelected(12 * 60 * sign);
                    }
                };
                TimepickerComponent.prototype.registerOnChange = function (fn) {
                    this.onChange = fn;
                };
                TimepickerComponent.prototype.registerOnTouched = function (fn) {
                    this.onTouched = fn;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], TimepickerComponent.prototype, "hourStep", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], TimepickerComponent.prototype, "minuteStep", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], TimepickerComponent.prototype, "readonlyInput", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], TimepickerComponent.prototype, "mousewheel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], TimepickerComponent.prototype, "arrowkeys", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], TimepickerComponent.prototype, "showSpinners", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Date)
                ], TimepickerComponent.prototype, "min", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Date)
                ], TimepickerComponent.prototype, "max", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], TimepickerComponent.prototype, "meridians", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TimepickerComponent.prototype, "showMeridian", null);
                TimepickerComponent = __decorate([
                    core_1.Component({
                        selector: 'timepicker[ngModel]',
                        directives: [common_1.NgClass, input_text_directive_1.InputTextDirective],
                        templateUrl: './app/components/datetimepicker/timepicker.component.html',
                        providers: [common_1.NgModel]
                    }),
                    __param(0, core_1.Self()), 
                    __metadata('design:paramtypes', [common_1.NgModel])
                ], TimepickerComponent);
                return TimepickerComponent;
            }());
            exports_1("TimepickerComponent", TimepickerComponent);
        }
    }
});
//# sourceMappingURL=timepicker.component.js.map