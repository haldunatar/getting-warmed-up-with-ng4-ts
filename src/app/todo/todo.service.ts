import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
  private someVal: Array<{}>;
    constructor(private http: Http) { }

    getTodos(): Array<{}> {
      this.someVal = JSON.parse(localStorage.getItem('todoList'));
        return this.someVal;
    }

    addTodos(listItem: Array<{}>) {
        return localStorage.setItem('todoList', JSON.stringify(listItem));
    }

    // This is a sampling method
    upDateTodos(listItem: Array<{}>) {
        return localStorage.setItem('todoList', JSON.stringify(listItem));
    }

    clearList() {
        return localStorage.removeItem('todoList');
    }

    getTestData(): Observable<[{}]> {
        return this.http
            .get('http://www.mocky.io/v2/59481be91100002a12117634')
            .map(res => res.json())
    }
}
