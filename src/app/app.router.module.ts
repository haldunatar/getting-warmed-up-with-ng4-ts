import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router'; 
 
import { TodoComponent } from './todo/todo.component';  
import { UserAuthenticationComponent } from './auth/auth.component'; 
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component'; 

const appRoutes: Routes = [
  { 
    path: 'auth', 
    component: UserAuthenticationComponent, 
    children: [ 
      {path: '', redirectTo: 'sign-in', pathMatch: 'full'}, 
      {path: 'sign-in', component: SignInComponent}, 
      {path: 'sign-up', component: SignUpComponent}, 
    ] 
  }, 
  { path: 'todo', component: TodoComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
   
@NgModule({
  imports: [ 
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
