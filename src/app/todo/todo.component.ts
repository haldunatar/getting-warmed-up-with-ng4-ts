import { Component, OnInit} from '@angular/core';
import { TodoService } from './todo.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'todo-component',
    templateUrl: './todo-component.html',
    styleUrls: ['./todo.css']
})

export class TodoComponent implements OnInit {
    list: Array<{}>;
    newTodo: string;
    editingTodo: boolean;
    isEmptyWarning: boolean;
    isSameWarning: boolean;
    testList: Object;
    testTxt: string;

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.testTxt = 'initialized!';

        this.list = this.todoService.getTodos() || [];

        this.todoService
            .getTestData()
            .subscribe((testList)  => {
                this.testList = testList;
            });
    }

    addTodo() {
        const isExist = this.list.filter((item: any) => item.title === this.newTodo);

        if(isExist.length > 0) {
            this.isSameWarning = true;

            setTimeout(() => this.isSameWarning = false, 1000);
        } else if(this.newTodo !== '') {
            this.list.push({title: this.newTodo, status: 'active'});

            this.todoService.addTodos(this.list);

            this.newTodo = ''; // Clean Input field

        } else {
            this.isEmptyWarning = true;

            setTimeout(() => this.isEmptyWarning = false, 1000);
        }
    }

    checkTodo() {
        return;
    }

    removeTodo(todoToRemove: String) {
        this.list.forEach((todo: any, i:number) => {
            if(todo.title === todoToRemove) {
                this.list.splice(i, 1);

                this.todoService.upDateTodos(this.list); // updateList
            }
        });
    }

    clearTodos() {
        this.list = [];
        this.todoService.clearList();
    }
}