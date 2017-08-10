import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'sign-up',
	templateUrl: './sign-up.html'
})

export class SignUpComponent implements OnInit {
	user: FormGroup;

  	constructor() {}

  	ngOnInit() {

	this.user = new FormGroup({
		email: new FormControl('', Validators.required),
		confirm: new FormControl('', Validators.required),
		password: new FormControl('', [Validators.required, Validators.minLength(3)])
	});

  }
}
