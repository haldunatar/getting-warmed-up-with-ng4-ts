import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router'; 
 
import { TodoComponent } from './todo/todo.component';  
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

const appRoutes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'todo', component: TodoComponent },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
];
   
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
