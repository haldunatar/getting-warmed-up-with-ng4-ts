import * as todoActions from '../actions/todo.action';
import { Todo } from '../../model/todo';
import { TodoAddSucceeded } from '../index';

export interface TodoState {
	todos	: Todo[];
	loading?: boolean;
	error?	: string;
}

export const initialState: TodoState = {
	todos: []
};
 
// Reducer func: Load Todos
function todoLoad(state, action) { 
	return {
		loading	: true,
		todos	: state.todos
	}
}

function todoLoadSucceeded(state, action) { 
	return {
		loading	: false,
		todos	: [...state.todos, ...action.payload]
	}
}

function todoLoadFailed(state, action) {
	return {
		loading	: false,
		error 	: 'Todo todos cannot be retrieved!',		
		todos	: [...state.todos]
	}
}

// Reducer func: Add Todo
function todoAdd(state, action) {
	return {
		loading: true,
		todos: [...state.todos]
	}
}

function todoAddSucceeded(state, action) { 
	return {
		loading: false,
		todos: [...state.todos, ...action.payload]
	}
}

function todoAddFailed(state, action) {
	return {
		loading	: false,
		error 	: 'Todo todos cannot be retrieved!',		
		todos	: [...state.todos]
	}
}

// Reducer func: Update Todo
function todoUpdate(state, action) {
	return {
		loading	: true,
		todos	: [...state.todos]
	}
}

function todoUpdateSucceeded(state, action) { 
	const todos = state.todos.map(todo => {  
		if(todo._id !== action.payload.id) { return todo;}
  
		return {
			...todo,
			title: action.payload.title
		}
	});
	  
	return {
		loading: false,
		todos
	}
}

function todoUpdateFailed(state, action) {
	return {
		loading	: false,
		error 	: 'Todo cannot be updated!',	
		todos	: [...state.todos]
	}
}

// Reducer func: Toggle Todo
function todoToggle(state, action) {
	return {
		loading	: true,
		todos	: [...state.todos]
	}
}

function todoToggleSucceeded(state, action) {  
	const todos = state.todos.map(todo => {
		if (todo._id !== action.payload.id) { return todo; }
	
		return { 
			...todo,
			status: action.payload.status
		}
	});
 
	return {
		loading: false,
		todos
	}
}

function todoToggleFailed(state, action) {
	return {
		loading	: false,
		todos	: [...state.todos]
	}
}

// Reducer func: Remove Todo
function todoRemove(state, action) {
	return {
		loading	: true,
		todos	: [...state.todos]
	}
}

function todoRemoveSucceeded(state, action) {
	const todos = state.todos.filter(todo => todo._id !== action.payload)

	return {
		loading	: false,
		todos
	}
}

function todoRemoveFailed(state, action) {
	return {
		loading	: false,
		error	: 'Todo cannot be removed!',
		todos	: [...state.todos]
	}
}

// Reducer func: Remove All Todos
function todoRemoveAll(state, action) {
	return {
		loading	: true,
		todos	: [...state.todos]
	}
}

function todoRemoveAllSucceeded(state, action) { 
	const todos = state.todos.filter(() => false);

	return {
		loading: false,
		todos
	}
}

function todoRemoveAllFailed(state, action) {
	return {
		loading	: false,
		todos	: [...state]
	}
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
