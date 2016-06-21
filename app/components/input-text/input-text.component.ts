import {Component} from 'angular2/core';
import {InputTextDirective} from '../../directives/input-text/input-text.directive';

@Component({
	templateUrl: './app/components/input-text/input-text.component.html',
	directives: [InputTextDirective]
})

export class InputTextComponent {
	text = '';

}