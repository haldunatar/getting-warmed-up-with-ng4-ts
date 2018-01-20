import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './todo.reducer';
import { Todo } from '../../model/todo'; 

export * from './todo.reducer';

// export interface TodosState {
// 	todos: Todo[]
// }

export const reducers = {
	todos: fromReducer.todoReducer
}

export const getTodosState = createFeatureSelector
<fromReducer.TodoState>('todos');
