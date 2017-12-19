import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { Todo } from '../model/todo';
import * as todoActions from '../store/actions';

@Injectable()
export class TodoResolver implements Resolve<any> {
	
	todoCache: Array<Todo>;

	constructor(private store: Store<any>) { }

	resolve() {
		if (this.todoCache) {
			return new todoActions.TodoLoadSucceeded(this.todoCache);
		}
		 
		this.store.dispatch(new todoActions.TodoLoad);

		// this.store.select('todoStore').subscribe(data => { 

		// 	console.log(data);
  
		// 	// if (!data.err && data.list && data.list.length > 0) {
		// 	// 	this.todoCache = data.list;
		// 	// }
		// });
	}

	clearCache() {
		this.todoCache = null;
	}
}