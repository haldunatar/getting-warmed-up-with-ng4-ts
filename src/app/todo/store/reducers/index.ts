import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './todo.reducer';
import { Todo } from '../../model/todo'; 

export * from './todo.reducer';

export interface TodoListState {
	todos: fromReducer.TodoState
}
 
export const reducers: ActionReducerMap<TodoListState> = {
	todos: fromReducer.todoReducer
}

export const getTodosListState = createFeatureSelector<TodoListState>('todosStore');
