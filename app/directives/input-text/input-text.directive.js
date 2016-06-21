System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var InputTextDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            InputTextDirective = (function () {
                function InputTextDirective(el) {
                    this.el = el;
                }
                InputTextDirective.prototype.onFocus = function (e) {
                    this.focus = true;
                };
                InputTextDirective.prototype.onBlur = function (e) {
                    this.focus = false;
                };
                InputTextDirective.prototype.isDisabled = function () {
                    return this.el.nativeElement.disabled;
                };
                __decorate([
                    core_1.HostListener('focus', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], InputTextDirective.prototype, "onFocus", null);
                __decorate([
                    core_1.HostListener('blur', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], InputTextDirective.prototype, "onBlur", null);
                InputTextDirective = __decorate([
                    core_1.Directive({
                        selector: '[input-text]',
                        host: {
                            '[class.csg-inputtext]': 'true',
                            '[class.csg-state-focus]': 'focus',
                            '[class.csg-state-disabled]': 'isDisabled()'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], InputTextDirective);
                return InputTextDirective;
            }());
            exports_1("InputTextDirective", InputTextDirective);
        }
    }
});
//# sourceMappingURL=input-text.directive.js.map