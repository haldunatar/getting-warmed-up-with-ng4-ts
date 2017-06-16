import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { TodoComponent } from '../todo.component';
import { TodoService } from '../../todo/todo.service';

let TodoServiceStub,
    todoService,
    testDataFromService,
    todoList = [];

describe('Todo Component', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                TodoComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule
            ],
            providers: [
                {provide: TodoService, useValue: TodoServiceStub}
            ],
        }).compileComponents();

        TodoServiceStub = {
            getTodos: function () {
                return todoList;
            },
            addTodos: function (todo) {
                todoList.push(todo);
            },
            clearList: function () {
                return [{title: 'windsurfing', status: 'active'}];
            },
            getTestData: function() {
                return {};
            }
        };

        testDataFromService = {
            "someKey": "some Val"
        }


    }));

    const createCompInstance = () => {
        const fixture = TestBed.createComponent(TodoComponent);
        todoService = fixture.debugElement.injector.get(TodoService);
        return fixture.debugElement.componentInstance;
    };

    it('should create the component', async(() => {
        const comp = createCompInstance();

        expect(comp).toBeTruthy();
    }));

    it('should initialize the todo component', async(() => {
        const comp = createCompInstance();
        spyOn(todoService, 'getTestData').and.returnValue({ subscribe: () => {} });

        comp.ngOnInit();

        expect(comp.testTxt).toEqual('initialized!');
    }));

    it('should get todo list', async(() => {
        const comp = createCompInstance();
        spyOn(todoService, 'getTestData').and.returnValue({ subscribe: () => {} });

        comp.ngOnInit();

        expect(comp.list).toEqual(todoList);
    }));
});