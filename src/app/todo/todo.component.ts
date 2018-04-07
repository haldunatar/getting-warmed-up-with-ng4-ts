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
	newTodo	: string;
	editTodoTitle: string;
 
	constructor(private store: Store<todoStore.TodoState>) { }

	ngOnInit() {  
		this.todos$ = this.store.select(todoStore.getAllTodos);
	}
 
	addTodo() { 
		this.store.dispatch(new todoStore.TodoAdd({ title: this.newTodo, status: false })); 
	}
 
	editTodo(id, title) { // TODO: pass whole todo to update only title // json-server issue
		this.store.dispatch(new todoStore.TodoUpdate({id, title}));
	}

	checkTodo(todo) {
		this.store.dispatch(new todoStore.TodoToggle({id: todo.id, title: todo.title, status: !todo.status}));
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
