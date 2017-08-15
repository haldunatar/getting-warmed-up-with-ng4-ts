import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { emailMatcher } from '../../commons/validators/email-matcher';

@Component({
	selector: 'sign-up',
	templateUrl: './sign-up.html'
})

export class SignUpComponent implements OnInit {
	user: FormGroup; 

  	constructor(public fb: FormBuilder) {}

  	ngOnInit() {
		this.user = this.fb.group({ 
			email: ['', [Validators.required, Validators.email]],
			confirm: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(3)]],
		}, { validator: emailMatcher });

		console.log(this.user)
	} 
}

