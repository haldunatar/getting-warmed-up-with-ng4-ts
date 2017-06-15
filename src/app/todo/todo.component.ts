import { Component, OnInit} from '@angular/core';
import { TodoService } from './todo.service';

@Component({
    selector: 'todo-component',
    templateUrl: './todo-component.html',
    styleUrls: ['./todo.css']
})

export class TodoComponent implements OnInit {
    list: Array<{}>;
    newTodo: string;
    displayMessage: boolean;
    editingTodo: boolean;
    todoEditVal: string;
    testList: Object;
    testTxt: string;

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.testTxt = 'initialized!';

        this.list = this.todoService.getTodos() || [];

        // Testing purposes;)
        this.todoService
            .getTestData()
            .subscribe(testList => this.testList = testList);

    }

    addTodo() {
        if(this.newTodo !== '') {
            this.list.push({title: this.newTodo, status: 'active'});

            this.todoService.addTodos(this.list);

            this.newTodo = ''; // Clean Input field

        } else {
            this.displayMessage = true;

            setTimeout(() => this.displayMessage = false, 1000);
        }
    }

    editTodo(todo) {
        console.log(todo);
        this.editingTodo = true;
    }

    clearTodos() {
        this.todoService.clearList();
        this.list = [];
    }
}