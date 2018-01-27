
import * as todoStore from '../';
import { Todo } from '../../model/todo';

let initialState;

describe('Todo Reducer', () => {

	beforeEach(() => {
		initialState = {
			activeTodos		: [],
			completedTodos	: [],
			loading			: false,
			todos			: []
		};
	});

	describe('Load', () => {
		it('should start loading todos', () => {
			const action = new todoStore.TodoLoad();

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({
				activeTodos		: [],
				completedTodos	: [],
				loading			: true,
				todos			: []
		});
		});

		it('should load todos', () => {
			const todoList = [{_id: '123sed', title: 'windsurfing', status: false}];
			const action = new todoStore.TodoLoadSucceeded(todoList);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({
				activeTodos		: [{_id: '123sed', title: 'windsurfing', status: false}],
				completedTodos	: [],
				loading			: false,
				todos			: [{_id: '123sed', title: 'windsurfing', status: false}]
		});
		});

		it('should filter active and completed todos correctly', () => {
			const todoList = [
				{_id: 'aaa', title: 'windsurfing', status: false},
				{_id: 'bbb', title: 'partying', status: false},
				{_id: 'ccc', title: 'shopping', status: true},
				{_id: 'ddd', title: 'studying', status: true}
			];
			const action = new todoStore.TodoLoadSucceeded(todoList);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({
				activeTodos		: [
					{_id: 'aaa', title: 'windsurfing', status: false},
					{_id: 'bbb', title: 'partying', status: false},
				],
				completedTodos	: [
					{_id: 'ccc', title: 'shopping', status: true},
					{_id: 'ddd', title: 'studying', status: true}
				],
				loading			: false,
				todos			: [
					{_id: 'aaa', title: 'windsurfing', status: false},
					{_id: 'bbb', title: 'partying', status: false},
					{_id: 'ccc', title: 'shopping', status: true},
					{_id: 'ddd', title: 'studying', status: true}
				]
			});
		});

		it('should give an error message on loading todos', () => {
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoLoadFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					activeTodos		: [],
					completedTodos	: [],
					error 			: 'Todos cannot be retrieved!',
					loading			: false,
					todos			: []
				});
		});
	});

	describe('Add', () => {
		it('should start add todo', () => {
			const newTodo = {title: 'meeting', status: false};
			const action = new todoStore.TodoAdd(newTodo);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({
				activeTodos		: [],
				completedTodos	: [],
				loading			: true,
				todos			: []
		});
		});

		it('should return state with new todo', () => {
			const newTodo: Todo[] = [{title: 'meeting', status: false, _id: 'someId'}];
			const action = new todoStore.TodoAddSucceeded(newTodo);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual({
					activeTodos		: [{title: 'meeting', status: false, _id: 'someId'}],
					completedTodos	: [],
					loading			: false,
					todos			: [{title: 'meeting', status: false, _id: 'someId'}]
		});
		});

		it('should give an error message on adding a todo', () => {
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoAddFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					activeTodos		: [],
					completedTodos	: [],
					error 			: 'Add new todo action is failed',
					loading			: false,
					todos			: []
				}
			);
		});
	});

	describe('Update', () => {
		it('should start updating a todo', () => {
			initialState = { 
				todos: [{_id: "123", title: 'todo title', status:false }],
				activeTodos		: [{_id: "123", title: 'todo title', status:false }],
				completedTodos	: [],
				loading			: true
			}; 
			const payload = {_id: "123", title: 'new title'};
			const action = new todoStore.TodoUpdate(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(initialState);
		});

		it('should return updated todos state', () => {
			initialState = { 
				todos: [
					{_id: "123", title: 'todo title', status:false},
					{_id: "asd43", title: 'other todo title', status: true},
				],
				activeTodos		: [{_id: "123", title: 'todo title', status:false}],
				completedTodos	: [{_id: "asd43", title: 'other todo title', status: true}],
				loading			: false
			}; 
			const payload = {_id: "123", title: 'new title'};
			const action = new todoStore.TodoUpdateSucceeded(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					todos: [
						{_id: "123", title: 'new title', status:false},
						{_id: "asd43", title: 'other todo title', status: true},
					],
					activeTodos		: [{_id: "123", title: 'new title', status:false}],
					completedTodos	: [{_id: "asd43", title: 'other todo title', status: true}],
					loading			: false
				}
			);
		});

		it('should give an error message on toggling a todo', () => {
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoUpdateFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					activeTodos		: [],
					completedTodos	: [],
					error 			: 'Todo cannot be updated!',
					loading			: false,
					todos			: []
				}
			);
		});
	});

	describe('Toggle', () => {
		it('should start toggling a todo', () => {
			initialState = { 
				todos: [{_id: "123", title: 'todo title', status:false }],
				activeTodos		: [{_id: "123", title: 'todo title', status:false}],
				completedTodos	: [],
				loading			: true
			}; 
			const payload = {_id: "123", status: true};
			const action = new todoStore.TodoToggle(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(initialState);
		});

		it('should return toggled state', () => {
			initialState = { 
				todos: [{_id: "123", title: 'todo title', status: false }],
				activeTodos		: [{_id: "123", title: 'todo title', status: false }],
				completedTodos	: [],
				loading			: false
			}; 
			const payload = {_id: "123", status: true};
			const action = new todoStore.TodoToggleSucceeded(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					todos: [{_id: "123", title: 'todo title', status: true }],
					activeTodos		: [],
					completedTodos	: [{_id: "123", title: 'todo title', status: true }],
					loading			: false
				}
			);
		});

		it('should give an error message on toggling a todo', () => {
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoToggleFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					todos			: [],
					activeTodos		: [],
					completedTodos	: [],
					error			: 'The todo status cannot be updated!',
					loading			: false
				}
			);
		});
	});

	describe('Remove', () => {
		it('should start removing state', () => {
			initialState = {
				todos: [{_id: "123", title: 'todo title', status:false }],
				activeTodos		: [{_id: "123", title: 'todo title', status:false }],
				completedTodos	: [],
				loading			: true
			}; 
			const payload = "123";
			const action = new todoStore.TodoRemove(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(initialState);
		});

		it('should update state with removed todo', () => {
			initialState = {
				loading: false, 
				todos: [
				{_id: "asdas23", title: 'nice todo', status: false },
				{_id: "wewe23", title: 'boring todo', status: true },
				{_id: "gdgd34", title: 'scary todo', status: false }
				],
				activeTodos		: [
					{_id: "asdas23", title: 'nice todo', status: false },
					{_id: "gdgd34", title: 'scary todo', status: false }
				],
				completedTodos	: [	{_id: "wewe23", title: 'boring todo', status: true }]
			}; 

			const payload = "gdgd34";
			const action = new todoStore.TodoRemoveSucceeded(payload);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
				loading: false,
				todos: [
					{_id: "asdas23", title: 'nice todo', status: false },
					{_id: "wewe23", title: 'boring todo', status: true }
					],
					activeTodos		: [
						{_id: "asdas23", title: 'nice todo', status: false }
					],
					completedTodos	: [	{_id: "wewe23", title: 'boring todo', status: true }]
				}
			);
		});

		it('should give an error message on removing a todo', () => {
			initialState = {
				loading: false, 
				todos: [
					{_id: "asdas23", title: 'nice todo', status: false }
				],
				activeTodos		: [
				{_id: "asdas23", title: 'nice todo', status: false }
				],
				completedTodos	: []
			}; 
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoRemoveFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading: false, 
					todos: [
						{_id: "asdas23", title: 'nice todo', status: false }
					],
					activeTodos		: [
						{_id: "asdas23", title: 'nice todo', status: false }
					],
					completedTodos	: [],
					error: 'Todo cannnot be removed!'
				}
			);
		});
	});

	describe('Remove All', () => {
		it('should start removing all todos', () => {
			initialState = {
				loading: true, 
				todos: [
				{_id: "asdas23", title: 'nice todo', status: false },
				{_id: "wewe23", title: 'boring todo', status: true },
				{_id: "gdgd34", title: 'scary todo', status: false }
				],
				activeTodos		: [
					{_id: "asdas23", title: 'nice todo', status: false },
					{_id: "gdgd34", title: 'scary todo', status: false }
				],
				completedTodos	: [{_id: "wewe23", title: 'boring todo', status: true }]
				
			}; 
			const action = new todoStore.TodoRemoveAll();

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(initialState);
		});

		it('should clear all todos', () => {
			initialState = {
				loading: false, 
				todos: [
				{_id: "asdas23", title: 'nice todo', status: false },
				{_id: "wewe23", title: 'boring todo', status: true },
				{_id: "gdgd34", title: 'scary todo', status: false }
				],
				activeTodos		: [
					{_id: "asdas23", title: 'nice todo', status: false },
					{_id: "gdgd34", title: 'scary todo', status: false }
				],
				completedTodos	: [{_id: "wewe23", title: 'boring todo', status: true }]
			}; 
			const action = new todoStore.TodoRemoveAllSucceeded();

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading			: false, 
					todos			: [],
					activeTodos		: [],
					completedTodos	: []
				}
			);
		});

		it('should give an error message on removin all todo', () => {
			const err = { err: '500', statusText: 'server error'};
			const action = new todoStore.TodoRemoveAllFailed(err);

			const state = todoStore.todoReducer(initialState, action);

			expect(state).toEqual(
				{
					loading			: false, 
					todos			: [],
					error			: 'Todos cannot be removed',
					activeTodos		: [],
					completedTodos	: []
				}
			);
		});
	});
});