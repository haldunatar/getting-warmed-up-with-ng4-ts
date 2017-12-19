import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as todoActions from './store/actions';

import { Todo } from './model/todo';

@Component({
	selector: 'todo-component',
	templateUrl: './todo-component.html',
	styleUrls: ['./todo.scss']
})

export class TodoComponent implements OnInit {
 
	todos$	: Observable<any>;
	newTodo	: string;
	isEmptyWarning: boolean;
	isEmptyEditingWarning: boolean;
	editTodoTitle: string;
 
	constructor(private store: Store<any>) { }

	ngOnInit() { 
		this.todos$ = this.store.select('todoStore'); 
	}
 
	addTodo() {
		if (this.newTodo === undefined || this.newTodo === '') {

			this.isEmptyWarning = true;
			setTimeout(() => this.isEmptyWarning = false, 2000);
		} else {
			this.store.dispatch(new todoActions.TodoAdd({ title: this.newTodo, status: false }))
			this.newTodo = '';
		}
	}
 
	editTodo(id, title) { 
		if (this.editTodoTitle === undefined || this.editTodoTitle === '') {
			this.isEmptyEditingWarning = true;
			setTimeout(() => this.isEmptyEditingWarning = false, 2000);
		} else {
			this.store.dispatch(new todoActions.TodoUpdate({id, title: this.editTodoTitle}));
			this.editTodoTitle = '';
		}
	}

	checkTodo(item) {
		const status = !item.status;  
		this.store.dispatch(new todoActions.TodoToggle({id: item._id, status}));
	}

	removeTodo(todoId) { 
		this.store.dispatch(new todoActions.TodoRemove(todoId));
	}

	clearTodos() {
		this.store.dispatch(new todoActions.TodoRemoveAll);
	}

	watchTodos(index, item) { 
		return item.id;
	}
}
