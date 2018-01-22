import { createSelector } from '@ngrx/store'; 
import * as fromReducers from '../reducers';

export const getTodosState = createSelector(
	fromReducers.getTodosListState, state => state.todos);

export const getAllTodos = createSelector(
	getTodosState, todos => {
		if (todos && todos.todos.length > 0) {
			return todos.todos;
		}
	}
);

export const activeTodos = createSelector(
	getTodosState, todos => {
		if (todos && todos.activeTodos.length > 0) {
			return todos.activeTodos;
		}
	} 
);

export const completedTodos = createSelector(
	getTodosState, todos => {
		if (todos && todos.completedTodos.length > 0) {
			return todos.completedTodos;
		}
	} 
);
