
import * as todoStore from '../';
import { Todo } from '../../model/todo';

describe('Todo Reducer', () => {

	describe('Load', () => {
		it('should start loading todos', () => {
			const initialState = { todos: [] };
			const action = new todoStore.TodoLoad();

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({loading: true, todos: initialState.todos});
		});

		it('should load todos', () => {
			const initialState = { todos: [] };
			const todoList = [{_id: '123sed', title: 'windsurfing', status: false}];
			const action = new todoStore.TodoLoadSucceeded(todoList);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({loading: false, todos: todoList});
		});

		it('should give an error message on loading todos', () => {
			const initialState = { todos: [] };
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoLoadFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading: false, 
					todos: initialState.todos, 
					error: 'Todo cannot be retrieved!'
				});
		});
	});

	describe('Add', () => {
		it('should start add todo', () => {
			const initialState = { todos: [] };
			const newTodo = {title: 'meeting', status: false};
			const action = new todoStore.TodoAdd(newTodo);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({loading: true, todos: initialState.todos});
		});

		it('should return state with new todo', () => {
			const initialState = { todos: [] };
			const newTodo: Todo = {title: 'meeting', status: false, _id: '3434ssd'};
			const action = new todoStore.TodoAddSucceeded(newTodo);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading: false,  
					todos: [
						{ title: 'meeting', status: false, _id: '3434ssd'}
					]
				}
			);
		});

		it('should give an error message on adding a todo', () => {
			const initialState = { todos: [] };
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoAddFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading: false, 
					todos: initialState.todos, 
					error: 'Add new todo action is failed'
				}
			);
		});
	});

	describe('Update', () => {
		it('should start updating a todo', () => {
			const initialState = { todos: [{_id: "123", title: 'todo title', status:false}] }; 
			const payload = {_id: "123", title: 'new title'};
			const action = new todoStore.TodoUpdate(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading	: true,
					todos	: initialState.todos
				}
			);
		});

		it('should return updated todos state', () => {
			const initialState = { 
				todos: [
					{_id: "123", title: 'todo title', status:false},
					{_id: "asd43", title: 'other todo title', status: true},
				] 
			}; 
			const payload = {_id: "123", title: 'new title'};
			const action = new todoStore.TodoUpdateSucceeded(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading	: false,
					todos	: [
						{_id: "123", title: 'new title', status: false},
						{_id: "asd43", title: 'other todo title', status: true}
					]
				}
			);
		});

		it('should give an error message on toggling a todo', () => {
			const initialState = { todos: [] };
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoUpdateFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading: false, 
					todos: initialState.todos, 
					error: 'Todo cannot be updated!'
				}
			);
		});
	});

	describe('Toggle', () => {
		it('should start toggling a todo', () => {
			const initialState = { todos: [{_id: "123", title: 'todo title', status:false }] }; 
			const payload = {_id: "123", status: true};
			const action = new todoStore.TodoToggle(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading	: true,
					todos	: initialState.todos
				}
			);
		});

		it('should return toggled state', () => {
			const initialState = { todos: [{_id: "123", title: 'todo title', status: false }] }; 
			const payload = {_id: "123", status: true};
			const action = new todoStore.TodoToggleSucceeded(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading	: false,
					todos	: [
						{_id: "123", title: 'todo title', status: true }
					]
				}
			);
		});

		it('should give an error message on toggling a todo', () => {
			const initialState = { todos: [] };
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoToggleFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading: false, 
					todos: initialState.todos, 
					error: 'Todo status cannot be updated!'
				}
			);
		});
	});

	describe('Remove', () => {
		it('should start removing state', () => {
			const initialState = {loading: true, todos: [{_id: "123", title: 'todo title', status:false }] }; 
			const payload = "123";
			const action = new todoStore.TodoRemove(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(initialState);
		});

		it('should state with removed todo', () => {
			const initialState = {loading: true, todos: [
				{_id: "asdas23", title: 'nice todo', status: false },
				{_id: "wewe23", title: 'boring todo', status: true },
				{_id: "gdgd34", title: 'scary todo', status: false }
			]}; 

			const payload = "gdgd34";
			const action = new todoStore.TodoRemoveSucceeded(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({
				loading: false,
				todos: [
					{_id: "asdas23", title: 'nice todo', status: false },
					{_id: "wewe23", title: 'boring todo', status: true }
				]
			});
		});

		it('should give an error message on removing a todo', () => {
			const initialState = {loading: false, todos: [
				{_id: "asdas23", title: 'nice todo', status: false }
			]}; 
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoRemoveFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading: false, 
					todos: initialState.todos, 
					error: 'Todo cannot be removed!'
				}
			);
		});
	});

	describe('Remove All', () => {
		it('should start removing all todos', () => {
			const initialState = {loading: true, todos: [
				{_id: "asdas23", title: 'nice todo', status: false },
				{_id: "wewe23", title: 'boring todo', status: true },
				{_id: "gdgd34", title: 'scary todo', status: false }
			] }; 
			const action = new todoStore.TodoRemoveAll();

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(initialState);
		});

		it('should return an empty todos state', () => {
			const initialState = {loading: true, todos: [
				{_id: "asdas23", title: 'nice todo', status: false },
				{_id: "wewe23", title: 'boring todo', status: true },
				{_id: "gdgd34", title: 'scary todo', status: false }
			] }; 
			const action = new todoStore.TodoRemoveAllSucceeded();

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({loading: false, todos: []});
		});

		it('should give an error message on removin all todo', () => {
			const initialState = { todos: [] };
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoRemoveAllFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading: false, 
					todos: initialState.todos, 
					error: 'Todos cannot be removed!'
				}
			);
		});
	});
});