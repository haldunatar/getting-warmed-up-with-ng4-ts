import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';  
import { FormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
	declarations: [
	    SignUpComponent,
	    SignInComponent,
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	exports: [SignUpComponent, SignInComponent]
}) 
export class AuthModule { }  