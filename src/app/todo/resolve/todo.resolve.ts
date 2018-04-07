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
		this.store.dispatch(new todoStore.TodoLoad);

	 
	}
 
}