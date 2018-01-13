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

	constructor(public payload: Array<Todo>) {}
}

export class TodoLoadFailed implements Action {
	readonly type = TODO_LOAD_FAILED;

	constructor(public payload: any) {}
}

// Action Creators: ADD Todo
export class TodoAdd implements Action {
	readonly type = TODO_ADD;

	constructor(public payload: {title: Todo['title']; status: Todo['status']}) {}
}

export class TodoAddSucceeded implements Action {
	readonly type = TODO_ADD_SUCCEEDED;

	constructor(public payload: {title: Todo['title']}) {}
}

export class TodoAddFailed implements Action {
	readonly type = TODO_ADD_FAILED;

	constructor(public payload: any) {}
}

// Action Creators: Update Todo
export class TodoUpdate implements Action {
	readonly type = TODO_UPDATE;

	constructor(public payload: {_id: Todo['_id'], title: Todo['title']}) {}
}

export class TodoUpdateSucceeded implements Action {
	readonly type = TODO_UPDATE_SUCCEEDED;

	constructor(public payload: {_id: Todo['_id'], title: Todo['title']}) {}
}

export class TodoUpdateFailed implements Action {
	readonly type = TODO_UPDATE_FAILED;

	constructor(public payload: any) {}
}

// Action Creators: TOGGLE Todo
export class TodoToggle implements Action {
	readonly type = TODO_TOGGLE;

	constructor(public payload: {_id: Todo['_id']; status: Todo['status']}) {}
}

export class TodoToggleSucceeded implements Action {
	readonly type = TODO_TOGGLE_SUCCEEDED;

	constructor(public payload: {_id: Todo['_id']; status: Todo['status']}) {}
}

export class TodoToggleFailed implements Action {
	readonly type = TODO_TOGGLE_FAILED;

	constructor(public payload: any) {}
}

// User Actions: Remove Todo
export class TodoRemove implements Action {
	readonly type = TODO_REMOVE;

	constructor(public payload: Todo['_id']) {}
}

export class TodoRemoveSucceeded implements Action {
	readonly type = TODO_REMOVE_SUCCEEDED;

	constructor(public payload: Todo['_id']) {}
}

export class TodoRemoveFailed implements Action {
	readonly type = TODO_REMOVE_FAILED;

	constructor(public payload: any) {}
}

// User Actions: Remove All Todos
export class TodoRemoveAll implements Action {
	readonly type = TODO_REMOVE_ALL;
}

export class TodoRemoveAllSucceeded implements Action {
	readonly type = TODO_REMOVE_ALL_SUCCEEDED;
}

export class TodoRemoveAllFailed implements Action {
	readonly type = TODO_REMOVE_ALL_FAILED;

	constructor(public payload: any) {}
}
 
export type TodoActions 
	= TodoLoad 
	| TodoLoadSucceeded
	| TodoLoadFailed
	| TodoAdd
	| TodoAddSucceeded
	| TodoAddFailed
	| TodoUpdate
	| TodoUpdateSucceeded
	| TodoUpdateFailed
	| TodoToggle
	| TodoToggleSucceeded
	| TodoToggleFailed
	| TodoRemove
	| TodoRemoveSucceeded
	| TodoRemoveFailed
	| TodoRemoveAll
	| TodoRemoveAllSucceeded
	| TodoRemoveAllFailed
