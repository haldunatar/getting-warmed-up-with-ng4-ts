import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as todoStore from './store/';

import { Todo } from './model/todo';

@Component({
	selector: 'todo-component',
	templateUrl: './todo-component.html',
	styleUrls: ['./todo.scss']
})

export class TodoComponent implements OnInit {
 
	todos$	: Observable<Todo[]>;
	todos	: any; 
	newTodo	: string;
	isEmptyWarning: boolean;
	isEmptyEditingWarning: boolean;
	editTodoTitle: string; 
	completedTodos$: Observable<any>;
 
	constructor(private store: Store<todoStore.TodoState>) { }

	ngOnInit() {  
		this.todos$ = this.store.select(todoStore.getAllTodos);
	}
 
	addTodo() { 
		if (this.newTodo === undefined || this.newTodo === '') {

			this.isEmptyWarning = true;
			setTimeout(() => this.isEmptyWarning = false, 2000);
		} else {
			this.store.dispatch(new todoStore.TodoAdd({ title: this.newTodo, status: false }))
			this.newTodo = '';
		}
	}
 
	editTodo(_id) { 
		if (this.editTodoTitle === undefined || this.editTodoTitle === '') {
			this.isEmptyEditingWarning = true;
			setTimeout(() => this.isEmptyEditingWarning = false, 2000);
		} else {
			this.store.dispatch(new todoStore.TodoUpdate({_id, title: this.editTodoTitle}));
			this.editTodoTitle = '';
		}
	}

	checkTodo(item) {
		const status = !item.status; 
		this.store.dispatch(new todoStore.TodoToggle({_id: item._id, status}));
	}

	removeTodo(todoId) { 
		this.store.dispatch(new todoStore.TodoRemove(todoId));
	}

	clearTodos() {
		this.store.dispatch(new todoStore.TodoRemoveAll);
	}

	watchTodos(index, item) { 
		return item.id;
	}
}
