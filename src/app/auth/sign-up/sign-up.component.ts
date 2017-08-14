import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

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
			confirm: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}
}

