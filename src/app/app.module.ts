import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

import * as todoStore from './todo/store/index'; 
import { TodoResolver } from './todo/resolve/todo.resolve';

const appRoutes: Routes = [
	{ path: 'todo', component: TodoComponent, resolve: { interceptor: TodoResolver } },
	{ path: '', redirectTo: 'todo', pathMatch: 'full' }
];

@NgModule({
	declarations: [
		AppComponent,
		TodoComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: false }
		),
		StoreModule.forRoot({ 
			todos: todoStore.todoReducer
		 }),
		EffectsModule.forRoot([todoStore.TodoEffects]),
		StoreDevtoolsModule.instrument()
		
	],
	providers: [TodoResolver],
	bootstrap: [AppComponent]
})
export class AppModule { }
 