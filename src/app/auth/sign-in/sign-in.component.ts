import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'sign-in',
	templateUrl: './sign-in.html'
})

export class SignInComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('sth');
  }
}
