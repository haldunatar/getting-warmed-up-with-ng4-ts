import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { Todo } from '../model/todo';
import * as todoStore from '../store/';

@Injectable()
export class TodoResolver implements Resolve<any> {
	
	todoCache: Array<Todo>;

	constructor(private store: Store<any>) { }

	resolve() {
		if (this.todoCache) {
			return new todoStore.TodoLoadSucceeded(this.todoCache);
		}
		 
		this.store.dispatch(new todoStore.TodoLoad);

		this.store.select('todosStore')
			.subscribe((data: any) => { 
			 
			if (data && !data.error && data.todos && data.todos.length > 0) {
				this.todoCache = data.todos;
			}
		});
	}

	clearCache() {
		this.todoCache = null;
	}
}