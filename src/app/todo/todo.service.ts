import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
    constructor(private http: Http) { }

    getTodos() {
        return JSON.parse(localStorage.getItem('todoList'));
    }

    addTodos(listItem) {
        return localStorage.setItem('todoList', JSON.stringify(listItem));
    }

    clearList() {
        return localStorage.removeItem('todoList');
    }

    getTestData(): Observable<[{}]> {
        return this.http
            .get('https://jsonplaceholder.typicode.com/posts/1')
            .map(res => res.json())
    }
}