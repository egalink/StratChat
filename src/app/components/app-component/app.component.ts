import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/services/http/signup.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	title:string = "Strat Chat";

	constructor (public signup: SignupService) {
		//
	}
	
	async ngOnInit () {
		//
		//await this.signup.request();
	}
}
