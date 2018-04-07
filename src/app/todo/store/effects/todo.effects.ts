import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { Todo } from '../../model/todo';
import * as todoActions from '../actions';

@Injectable()
export class TodoEffects {
	constructor(
		private action$: Actions,
		private http: HttpClient
	) { }

	@Effect() todoList$: Observable<any> = this.action$
		.ofType(todoActions.TODO_LOAD)
		.switchMap(() => {
			return this.http
				.get('/todo-list')
				.map((todos: Todo[]) => new todoActions.TodoLoadSucceeded(todos))
				.catch(err => Observable.of(new todoActions.TodoLoadFailed(err)));
		});





	@Effect() addTodo$: Observable<any> = this.action$
		.ofType(todoActions.TODO_ADD)
		.switchMap((action: todoActions.TodoAdd) => {
			return this.http
				.post('todo-list', action.payload)
				.map((res: Todo[]) => new todoActions.TodoAddSucceeded(res))
				.catch(err => Observable.of(new todoActions.TodoAddFailed(err)));
		});

	@Effect() updateTodo$: Observable<any> = this.action$
		.ofType(todoActions.TODO_UPDATE)
		.switchMap((action: todoActions.TodoUpdate) => {
			return this.http
				.put(`todo-list/${action.payload.id}`, action.payload)
				.map(() => new todoActions.TodoUpdateSucceeded({ id: action.payload.id, title: action.payload.title }))
				.catch(err => Observable.of(new todoActions.TodoUpdateFailed(err)));
		});

	@Effect() toggleTodo$: Observable<any> = this.action$
		.ofType(todoActions.TODO_TOGGLE)
		.switchMap((action: todoActions.TodoToggle) => {
			return this.http
				.put(`todo-list/${action.payload.id}`, action.payload)
				.map(() => new todoActions.TodoToggleSucceeded({ id: action.payload.id, status: action.payload.status }))
				.catch(err => Observable.of(new todoActions.TodoToggleFailed(err)));
		});

	@Effect() removeTodo$: Observable<any> = this.action$
		.ofType(todoActions.TODO_REMOVE)
		.switchMap((action: todoActions.TodoRemove) => {
			return this.http
				.delete(`todo-list/${action.payload}`)
				.map(() => new todoActions.TodoRemoveSucceeded(action.payload))
				.catch(err => Observable.of(new todoActions.TodoRemoveFailed(err)));
		});

	@Effect() removeAllTodo$: Observable<any> = this.action$
		.ofType(todoActions.TODO_REMOVE_ALL)
		.switchMap((action: todoActions.TodoRemoveAll) => {
			return this.http
				.delete(`todo-list-all`)
				.map(() => new todoActions.TodoRemoveAllSucceeded())
				.catch(err => Observable.of(new todoActions.TodoRemoveAllFailed(err)));
		});
}
