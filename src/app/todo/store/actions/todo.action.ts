import { Action } from '@ngrx/store';
import { Todo } from '../../model/todo';

// Server Actions: Load Todos
export const TODO_LOAD					= '[TODO] load';
export const TODO_LOAD_SUCCEEDED 		= '[TODO] load succeeded';
export const TODO_LOAD_FAILED 			= '[TODO] load failed';

// User Actions: ADD Todos
export const TODO_ADD 					= '[TODO] add';
export const TODO_ADD_SUCCEEDED			= '[TODO] add succeeded';
export const TODO_ADD_FAILED 			= '[TODO] add failed';

// User Actions: Update Todos
export const TODO_UPDATE 				= '[TODO] update';
export const TODO_UPDATE_SUCCEEDED 		= '[TODO] update succeeded';
export const TODO_UPDATE_FAILED 		= '[TODO] update failed';

// User Actions: TOGGLE Todo
export const TODO_TOGGLE 				= '[TODO] toggle toggle';
export const TODO_TOGGLE_SUCCEEDED 		= '[TODO] toggle toggle succeeded';
export const TODO_TOGGLE_FAILED 		= '[TODO] toggle toggle failed';

// User Actions: Remove Todo
export const TODO_REMOVE 				= '[TODO] remove';
export const TODO_REMOVE_SUCCEEDED 		= '[TODO] remove succeeded';
export const TODO_REMOVE_FAILED 		= '[TODO] remove failed';

// User Actions: Remove ALL Todos
export const TODO_REMOVE_ALL 			= '[TODO] remove all';
export const TODO_REMOVE_ALL_SUCCEEDED 	= '[TODO] remove all succeeded';
export const TODO_REMOVE_ALL_FAILED 	= '[TODO] remove all failed';

// Action Creators: Load Todos
export class TodoLoad implements Action {
	readonly type = TODO_LOAD;
}

export class TodoLoadSucceeded implements Action {
	readonly type = TODO_LOAD_SUCCEEDED;

	constructor(public payload: Todo[]) {}
}
 

// Action Creators: ADD Todo
export class TodoAdd implements Action {
	readonly type = TODO_ADD;

	constructor(public payload: {title: Todo['title']; status: Todo['status']}) {}
}

export class TodoAddSucceeded implements Action {
	readonly type = TODO_ADD_SUCCEEDED;

	constructor(public payload: Todo[]) {}
}
 

// Action Creators: Update Todo
export class TodoUpdate implements Action {
	readonly type = TODO_UPDATE;

	constructor(public payload: {id: Todo['id'], title: Todo['title']}) {}
}

export class TodoUpdateSucceeded implements Action {
	readonly type = TODO_UPDATE_SUCCEEDED;

	constructor(public payload: {id: Todo['id'], title: Todo['title']}) {}
}
 

// Action Creators: TOGGLE Todo
export class TodoToggle implements Action {
	readonly type = TODO_TOGGLE;

	constructor(public payload: {id: Todo['id']; status: Todo['status'], title: Todo['title']}) {}
}

export class TodoToggleSucceeded implements Action {
	readonly type = TODO_TOGGLE_SUCCEEDED;

	constructor(public payload: {id: Todo['id']; status: Todo['status']}) {}
}
 
// User Actions: Remove Todo
export class TodoRemove implements Action {
	readonly type = TODO_REMOVE;

	constructor(public payload: Todo['id']) {}
}

export class TodoRemoveSucceeded implements Action {
	readonly type = TODO_REMOVE_SUCCEEDED;

	constructor(public payload: Todo['id']) {}
}
 

// User Actions: Remove All Todos
export class TodoRemoveAll implements Action {
	readonly type = TODO_REMOVE_ALL;
}

export class TodoRemoveAllSucceeded implements Action {
	readonly type = TODO_REMOVE_ALL_SUCCEEDED;
}
 
 
export type TodoActions 
	= TodoLoad 
	| TodoLoadSucceeded

	| TodoAdd
	| TodoAddSucceeded

	| TodoUpdate
	| TodoUpdateSucceeded
	| TodoToggle
	| TodoToggleSucceeded
	| TodoRemove
	| TodoRemoveSucceeded
	| TodoRemoveAll
	| TodoRemoveAllSucceeded
