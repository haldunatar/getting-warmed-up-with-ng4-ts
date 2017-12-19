import * as todoActions from '../actions/todo.action';
import { Todo } from '../../model/todo';
import { TodoAddSucceeded } from '../index';

export interface TodoState {
	list: Array<Todo>;
}

export const initialState: TodoState = {
	list: []
};
 
// Reducer func: Load Todos
function todoLoad(state, action) { 
	return {
		loading	: true,
		list	: state.list
	}
}

function todoLoadSucceeded(state, action) { 
	return {
		loading	: false,
		list	: [...state.list, ...action.payload]
	}
}

function todoLoadFailed(state, action) {
	return {
		loading	: false,
		error 	: 'Todo list cannot be retrieved!',		
		list	: [...state.list]
	}
}

// Reducer func: Add Todo
function todoAdd(state, action) {
	return {
		loading: true,
		list: [...state.list]
	}
}

function todoAddSucceeded(state, action) { 
	return {
		loading: false,
		list: [...state.list, ...action.payload]
	}
}

function todoAddFailed(state, action) {
	return {
		loading	: false,
		error 	: 'Todo list cannot be retrieved!',		
		list	: [...state.list]
	}
}

// Reducer func: Update Todo
function todoUpdate(state, action) {
	return {
		loading	: true,
		list	: [...state.list]
	}
}

function todoUpdateSucceeded(state, action) { 
	const list = state.list.map(todo => {  
		if(todo._id !== action.payload.id) { return todo;}
  
		return {
			...todo,
			title: action.payload.title
		}
	});
	  
	return {
		loading: false,
		list
	}
}

function todoUpdateFailed(state, action) {
	return {
		loading	: false,
		error 	: 'Todo cannot be updated!',	
		list	: [...state.list]
	}
}

// Reducer func: Toggle Todo
function todoToggle(state, action) {
	return {
		loading	: true,
		list	: [...state.list]
	}
}

function todoToggleSucceeded(state, action) {  
	const list = state.list.map(todo => {
		if (todo._id !== action.payload.id) { return todo; }
	
		return { 
			...todo,
			status: action.payload.status
		}
	});
 
	return {
		loading: false,
		list
	}
}

function todoToggleFailed(state, action) {
	return {
		loading	: false,
		data	: [...state.list]
	}
}

// Reducer func: Remove Todo
function todoRemove(state, action) {
	return {
		loading	: true,
		list	: [...state.list]
	}
}

function todoRemoveSucceeded(state, action) {
	const list = state.list.filter(todo => todo._id !== action.payload)

	return {
		loading	: false,
		list
	}
}

function todoRemoveFailed(state, action) {
	return {
		loading	: false,
		error	: 'Todo cannot be removed!',
		data	: [...state.list]
	}
}

// Reducer func: Remove All Todos
function todoRemoveAll(state, action) {
	return {
		loading	: true,
		list	: [...state.list]
	}
}

function todoRemoveAllSucceeded(state, action) { 
	const list = state.list.filter(() => false);

	return {
		loading: false,
		list
	}
}

function todoRemoveAllFailed(state, action) {
	return {
		loading	: false,
		data	: [...state]
	}
}

export function todoReducer(state = initialState, action: todoActions.TodoActions) {

	switch (action.type) {
		case todoActions.TODO_LOAD					: return todoLoad(state, action);
		case todoActions.TODO_LOAD_SUCCEEDED		: return todoLoadSucceeded(state, action);
		case todoActions.TODO_LOAD_FAILED			: return todoLoadFailed(state, action);

		case todoActions.TODO_ADD					: return  todoAdd(state, action);
		case todoActions.TODO_ADD_SUCCEEDED			: return  todoAddSucceeded(state, action);
		case todoActions.TODO_ADD					: return  todoAddFailed(state, action);

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
