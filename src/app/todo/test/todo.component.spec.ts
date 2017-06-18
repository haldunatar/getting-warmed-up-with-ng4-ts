import { TestBed, async} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { TodoComponent } from '../todo.component';
import { TodoService } from '../../todo/todo.service';

let todoService,
    fixture,
    comp,
    todoList = [],
    TodoServiceStub = {
    getTodos: function () {
        return todoList;
    },
    addTodos: function (todo) {
        todoList.push(todo);
    },
    clearList: function () {
        // clear todoList
    },
    getTestData: function() {
        return {
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: `quia et suscipit
                    suscipit recusandae consequuntur expedita et cum
                    reprehenderit molestiae ut ut quas totam
                    nostrum rerum est autem sunt rem eveniet architecto`
        }
    }
},
    testDataFromService = [{
        "someKey": "some Val"
    }];

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
                {
                    provide: TodoService, useValue: TodoServiceStub
                },
            ],
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(TodoComponent);
            comp = fixture.debugElement.componentInstance;

            todoService = fixture.debugElement.injector.get(TodoService);

            spyOn(todoService, 'getTestData').and.returnValue(
                Observable.of(testDataFromService)
            );
        });
    }));

    it('should create the component', async(() => {
        expect(comp).toBeTruthy();
    }));

    it('should initialize the todo component', async(() => {
        comp.ngOnInit();

        expect(comp.testTxt).toEqual('initialized!');
    }));

    it('should get todo list', async(() => {
        comp.ngOnInit();

        expect(comp.list).toEqual(todoList);
    }));

    it('should get data from the http call', async(() => {
        comp.ngOnInit();

        expect(comp.testList).toBe(testDataFromService);
    }))
});