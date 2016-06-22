System.register(['angular2/core', './components/datetimepicker/datetimepicker.component', './directives/datetimepicker/datetimepicker.directive', './components/input-text/input-text.component', './directives/input-text/input-text.directive', './components/datetimepicker/timepicker.component'], function(exports_1, context_1) {
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
    var core_1, datetimepicker_component_1, datetimepicker_directive_1, input_text_component_1, input_text_directive_1, timepicker_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (datetimepicker_component_1_1) {
                datetimepicker_component_1 = datetimepicker_component_1_1;
            },
            function (datetimepicker_directive_1_1) {
                datetimepicker_directive_1 = datetimepicker_directive_1_1;
            },
            function (input_text_component_1_1) {
                input_text_component_1 = input_text_component_1_1;
            },
            function (input_text_directive_1_1) {
                input_text_directive_1 = input_text_directive_1_1;
            },
            function (timepicker_component_1_1) {
                timepicker_component_1 = timepicker_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.selDate = 'MM/DD/YYYY ';
                    this.selTime = ' 00:00 AM/PM';
                    this.minDate = moment();
                    this.maxDate = '12/31/2035';
                    this.disableDays = [0, 6]; //For Sunday and Saturday
                    this.toContainPrevMonth = false;
                    this.toContainNextMonth = false;
                    this.value = '';
                }
                AppComponent.prototype.setInput = function (event) {
                    this.value = event.target.value;
                };
                AppComponent.prototype.setDate = function (date) {
                    this.selDate = date;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    \t<h3>Angular 2 Date and Time Picker</h3>\n    \t<input class=\"input-calendar\" input-text type='text' value={{selDate}}{{selTime}} (change)=\"setInput($event)\"/>\n        <date-time-picker \n            [value]=\"value\"\n            [minDate]=\"minDate\" \n            [maxDate]=\"maxDate\"\n            [disableDays]=\"disableDays\"\n            [toContainPrevMonth]=\"toContainPrevMonth\"\n            [toContainNextMonth]=\"toContainNextMonth\"\n            (selectedDate)='setDate($event)'></date-time-picker>\n    ",
                        directives: [datetimepicker_component_1.DateTimePickerComponent, datetimepicker_directive_1.DateTimePickerDirective, input_text_component_1.InputTextComponent, input_text_directive_1.InputTextDirective, timepicker_component_1.TimepickerComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map