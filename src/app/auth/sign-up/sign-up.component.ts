import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { emailMatcher } from '../../commons/validators/email-matcher';

@Component({
	selector: 'sign-up',
	templateUrl: './sign-up.html'
})

export class SignUpComponent implements OnInit {
	user: FormGroup;

  	constructor(public fb: FormBuilder) {}

  	ngOnInit() {
		this.user = this.fb.group({
			name: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
			email: ['', Validators.required],
			confirm: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
}

