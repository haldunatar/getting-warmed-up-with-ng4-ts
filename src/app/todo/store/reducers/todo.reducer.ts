import { ActionReducerMap, createFeatureSelector  } from '@ngrx/store';

import * as todoActions from '../actions/todo.action';
import { Todo } from '../../model/todo'; 

export interface TodoState {
	activeTodos		: Todo[];
	completedTodos	: Todo[];
	error?			: string;
	loading			: boolean;
	todos			: Todo[];
}

export const initialState: TodoState = {
	activeTodos		: [],
	completedTodos	: [],
	loading			: false,
	todos			: []
};
 
// Reducer func: Load Todos
function todoLoad(state: TodoState, action: todoActions.TodoLoad) { 
	return { ...initialState, loading: true };
}

function todoLoadSucceeded(state: TodoState, action: todoActions.TodoLoadSucceeded) {
	return {
		activeTodos		: [...state.activeTodos, ...action.payload.filter(todo => !todo.status)],
		completedTodos	: [...state.completedTodos, ...action.payload.filter(todo => todo.status)],
		loading			: false,
		todos			: [...state.todos, ...action.payload]
	}
}

function todoLoadFailed(state: TodoState, action: todoActions.TodoLoadFailed) {
	return {...initialState, error : 'Todos cannot be retrieved!' }
}

// Reducer func: Add Todo
function todoAdd(state: TodoState, action: todoActions.TodoAdd) {
	return { ...state, loading: true };
}

function todoAddSucceeded(state: TodoState, action: todoActions.TodoAddSucceeded) { 
	return {
		activeTodos		: [...state.activeTodos, ...action.payload],
		completedTodos	: state.completedTodos,
		loading			: false,
		todos			: [...state.todos, ...action.payload]
	}
}

function todoAddFailed(state: TodoState, action: todoActions.TodoAddFailed) {
	return { ...state, error : 'Add new todo action is failed' }
}

// Reducer func: Update Todo
function todoUpdate(state: TodoState, action: todoActions.TodoUpdate) {
	return { ...state, loading: true };
}

function todoUpdateSucceeded(state: TodoState, action: todoActions.TodoUpdateSucceeded) {
	function updateTodo(todo) {
		if (todo.id !== action.payload.id) { return todo; } 
		
		return {
			...todo,
			title: action.payload.title
		}
	}
 
	return {
		activeTodos		: state.activeTodos.map(updateTodo), 
		completedTodos	: state.completedTodos.map(updateTodo), 
		loading			: false,	
		todos			: state.todos.map(updateTodo)
	}
}

function todoUpdateFailed(state: TodoState, action: todoActions.TodoUpdateFailed) {
	return {...state, error	: 'Todo cannot be updated!' }
}

// Reducer func: Toggle Todo
function todoToggle(state: TodoState, action: todoActions.TodoToggle) {
	return { ...state, loading: true };
}

function todoToggleSucceeded(state: TodoState, action: todoActions.TodoToggleSucceeded) {  
	const todos = state.todos.map(todo => {
		if (todo.id !== action.payload.id) { return todo; }
	
		return { 
			...todo,
			status: action.payload.status
		}
	});
 
	return {
		activeTodos		: todos.filter(todo => !todo.status),
		completedTodos	: todos.filter(todo => todo.status),
		loading			: false,	
		todos
	}
}

function todoToggleFailed(state: TodoState, action: todoActions.TodoToggleFailed) {
	return {...state, error: 'The todo status cannot be updated!'};
}

// Reducer func: Remove Todo
function todoRemove(state: TodoState, action: todoActions.TodoRemove) {
	return { ...state, loading: true };
}

function todoRemoveSucceeded(state: TodoState, action: todoActions.TodoRemoveSucceeded) {
	const todos = state.todos.filter(todo => todo.id !== action.payload);

	return {
		activeTodos		: state.activeTodos.filter(todo => todo.id !== action.payload),
		completedTodos	: state.completedTodos.filter(todo => todo.id !== action.payload),
		loading			: false,
		todos
	}
}

function todoRemoveFailed(state: TodoState, action: todoActions.TodoRemoveFailed) {
	return {...state, error: 'Todo cannnot be removed!'};
}

// Reducer func: Remove All Todos
function todoRemoveAll(state: TodoState, action: todoActions.TodoRemoveAll) {
	return { ...state, loading: true };
}

function todoRemoveAllSucceeded(state: TodoState, action: todoActions.TodoRemoveAllSucceeded) { 
	return initialState;
}

function todoRemoveAllFailed(state: TodoState, action: todoActions.TodoRemoveAllFailed) {
	return {...state, error: 'Todos cannot be removed!'};
}

export function todoReducer(state = initialState, action: todoActions.TodoActions): TodoState {

	switch (action.type) {
		case todoActions.TODO_LOAD					: return todoLoad(state, action);
		case todoActions.TODO_LOAD_SUCCEEDED		: return todoLoadSucceeded(state, action);
		case todoActions.TODO_LOAD_FAILED			: return todoLoadFailed(state, action);

		case todoActions.TODO_ADD					: return  todoAdd(state, action);
		case todoActions.TODO_ADD_SUCCEEDED			: return  todoAddSucceeded(state, action);
		case todoActions.TODO_ADD_FAILED			: return  todoAddFailed(state, action);

		case todoActions.TODO_UPDATE				: return  todoUpdate(state, action);
		case todoActions.TODO_UPDATE_SUCCEEDED		: return  todoUpdateSucceeded(state, action);
		case todoActions.TODO_UPDATE_FAILED			: return  todoUpdateFailed(state, action);

		case todoActions.TODO_TOGGLE				: return  todoToggle(state, action);
		case todoActions.TODO_TOGGLE_SUCCEEDED		: return  todoToggleSucceeded(state, action);
		case todoActions.TODO_TOGGLE_FAILED			: return  todoToggleFailed(state, action);

		case todoActions.TODO_REMOVE				: return  todoRemove(state, action);
		case todoActions.TODO_REMOVE_SUCCEEDED		: return  todoRemoveSucceeded(state, action);
		case todoActions.TODO_REMOVE_FAILED			: return  todoRemoveFailed(state, action);

		case todoActions.TODO_REMOVE_ALL			: return  todoRemoveAll(state, action);
		case todoActions.TODO_REMOVE_ALL_SUCCEEDED	: return  todoRemoveAllSucceeded(state, action);
		case todoActions.TODO_REMOVE_ALL_FAILED		: return  todoRemoveAllFailed(state, action);

		default: state;
	} 
}