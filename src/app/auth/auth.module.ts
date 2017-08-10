import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth.router.module';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserAuthenticationComponent } from './auth.component';

@NgModule({
	declarations: [
	    SignUpComponent,
	    SignInComponent,
	    UserAuthenticationComponent
	],
	imports: [ 
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AuthRoutingModule
	],
	exports: [UserAuthenticationComponent]
}) 
export class AuthModule { }  