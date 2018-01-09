import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { Todo } from '../model/todo';
import * as todoActions from '../store/actions';
import { TodoState } from '../store/reducers'; 

@Injectable()
export class TodoResolver implements Resolve<any> {
	
	todoCache: Array<Todo>;

	constructor(private store: Store<any>) { }

	resolve() {
		if (this.todoCache) {
			return new todoActions.TodoLoadSucceeded(this.todoCache);
		}
		 
		this.store.dispatch(new todoActions.TodoLoad);

		this.store.select('todoStore').subscribe((data: TodoState) => {
			 
			if (data && !data.error && data.todos && data.todos.length > 0) {
				this.todoCache = data.todos;
			}
		});
	}

	clearCache() {
		this.todoCache = null;
	}
}