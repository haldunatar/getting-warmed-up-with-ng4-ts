import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component'; 

const authRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent}
] 
   
@NgModule({
  imports: [
  	ReactiveFormsModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
