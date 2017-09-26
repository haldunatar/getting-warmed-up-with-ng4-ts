import {Component, Input, OnInit} from '@angular/core';
import { TodoService } from './todo.service';

@Component({
    selector: 'todo-component',
    templateUrl: './todo-component.html',
    styleUrls: ['./todo.css']
})

export class TodoComponent implements OnInit { 

    @Input() testBinding: number;

    list: Array<{}>;
    newTodo: string;
    editingTodo: boolean;
    isEmptyWarning: boolean;
    isSameWarning: boolean;
    testList: Object; 
    clearWarning: boolean;
    buttonInitialLabel: string = 'Clear The List';
    buttonWarningLabel: string = 'Yes! I am sure to lose everything!';
    buttonLabel: string = this.buttonInitialLabel;
    timer: any = null; 

    constructor(private todoService: TodoService) { }

    ngOnInit() { 
        this.list = this.todoService.getTodos() || [];

        this.todoService
            .getTestData()
            .subscribe(testList => this.testList = testList);
    }
    
    addTodo() {
        const isExist = this.list.filter((item: {title?:string}) => item.title === this.newTodo);

        if(isExist.length > 0) {
            this.isSameWarning = true;

            setTimeout(() => this.isSameWarning = false, 1000);
        } else if(this.newTodo && this.newTodo !== '') {
            this.list.push({title: this.newTodo, status: false});

            this.todoService.addTodos(this.list);

            this.newTodo = ''; // Clean Input field

        } else {
            this.isEmptyWarning = true;

            setTimeout(() => this.isEmptyWarning = false, 1000);
        }
    }

    checkTodo() { 
        setTimeout(() => this.todoService.upDateTodos(this.list));
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

        if(this.clearWarning) { 
           this.removeList();
        } else {
            this.displayWarning();
        }
    }

    removeList() {
        this.list = [];
        this.todoService.clearList();

        this.revertWarning();
    }

    displayWarning() {
        this.clearWarning = true; 
        this.buttonLabel = this.buttonWarningLabel;

        this.timer = setTimeout(() => {
            this.revertWarning();
        }, 3000);
    }

    revertWarning() {
        this.clearWarning = false;
        this.buttonLabel = this.buttonInitialLabel;
    }
}
