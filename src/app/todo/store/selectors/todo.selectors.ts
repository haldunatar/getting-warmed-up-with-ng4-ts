import { createSelector } from '@ngrx/store';

import * as fromReducers from '../reducers/';

export const getTodosState = createSelector(
	fromReducers.getTodosState, (state: fromReducers.TodoState) => {
		return state;
});

export const getCompletedTodos = createSelector(
	getTodosState, fromReducers.getTodos
)