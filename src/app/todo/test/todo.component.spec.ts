import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';

import { TodoComponent } from '../todo.component';

import { TodoResolver } from '../resolve/todo.resolve';

import * as todoStore from '../store/index'; 
import * as todoActions from '../store/actions';

import { Todo } from '../model/todo';
import { access } from 'fs';

let fixture, component, store;

describe('Todo Component: ', () => {

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TodoComponent],
			imports: [FormsModule, 
				HttpClientModule,
				StoreModule.forRoot(
					{ todos: todoStore.todoReducer }
				), 
				EffectsModule.forRoot([todoStore.TodoEffects])
			],
			providers: [Store,TodoResolver]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture		= TestBed.createComponent(TodoComponent);
		component 	= fixture.componentInstance;

		store = TestBed.get(Store);
	});

	describe('on initialization', () => {

		it('should be created', () => {
			fixture.detectChanges();

			expect(component).toBeTruthy();
		});
	
		it('should retrieve todos(state)', () => { 
			const payload: any = {id: '_334', title: 'Shopping', status: false };  
			spyOn(store, 'dispatch').and.callThrough();
	
			store.dispatch(new todoActions.TodoLoadSucceeded(payload));
	 
			fixture.detectChanges();
	
			component.todos$.subscribe(todos => {
				expect(todos).toEqual(
					{ 
						loading: false, 
						todos: [
							{ id: '_334', title: 'Shopping', status: false }
						] 
					}
				) 
			})
		}); 
	});
 
	describe('add todo', () => {

		it('should give an error', () => {
			component.newTodo = '';
			component.addTodo(); 
	
			expect(component.isEmptyWarning).toBeTruthy();
		}); 

		it('should dipatch a new todo', () => {
			spyOn(store, 'dispatch');
			component.newTodo = 'Windsurfing';
			component.addTodo();
	 
			const payload = {title: 'Windsurfing', status: false};
			const action = new todoActions.TodoAdd(payload);
	
			expect(component.isEmptyWarning).toBeFalsy();
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe('edit todo', () => {

		it('should give an error', () => {
			component.editTodoTitle = '';
			component.editTodo('asd23');

			expect(component.isEmptyEditingWarning).toBeTruthy();
		});
		
		it('should dispatch updated todo', () => {
			spyOn(store, 'dispatch');
			component.editTodoTitle = 'some new title';
			const todoIdToBeEdited = 'abc123';

			component.editTodo(todoIdToBeEdited);

			const action = new todoActions.TodoUpdate(
				{ id: todoIdToBeEdited, title: 'some new title' }
			);

			expect(component.isEmptyEditingWarning).toBeFalsy();
			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe('toggle todo', () => {
		
		it('should dispatch the toggled state: True', () => {
			const todo = { _id: '123', status: false };
			spyOn(store, 'dispatch');

			const action = new todoActions.TodoToggle({id: todo._id, status: true});

			component.checkTodo(todo);

			expect(store.dispatch).toHaveBeenCalledWith(action);
		});

		it('should dispatch the toggled state: False', () => {
			const todo = { _id: '123', status: true };
			spyOn(store, 'dispatch');

			const action = new todoActions.TodoToggle({id: todo._id, status: false});

			component.checkTodo(todo);

			expect(store.dispatch).toHaveBeenCalledWith(action);
		});
	});

	it('remove todo', () => {
		spyOn(store, 'dispatch');
		const todoId = '123asd';

		const action = new todoActions.TodoRemove('123asd');

		component.removeTodo(todoId);

		expect(store.dispatch).toHaveBeenCalledWith(action);
	});

	it('should remove all todos', () => {
		spyOn(store, 'dispatch');

		const action = new todoActions.TodoRemoveAll();

		component.clearTodos();
 
		expect(store.dispatch).toHaveBeenCalledWith(action);
	});
});
