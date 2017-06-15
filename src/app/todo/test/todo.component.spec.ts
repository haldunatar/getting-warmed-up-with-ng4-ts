import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { TodoComponent } from '../todo.component';
import { TodoService } from '../../todo/todo.service';

let TodoServiceStub;

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
                return [{title: 'windsurfing', status: 'active'}];
            },
            addTodos: function () {
                return [{title: 'windsurfing', status: 'active'}];
            },
            clearList: function () {
                return [{title: 'windsurfing', status: 'active'}];
            },
            getTestData: function() {
                return '';
            }
        };
    }));

    const createCompInstance = () => {
        const fixture = TestBed.createComponent(TodoComponent);
        return fixture.debugElement.componentInstance;
    };

    it('should create the component', async(() => {
        const comp = createCompInstance();

        expect(comp).toBeTruthy();
    }));

    it('should initialize the todo component', async(() => {
        const comp = createCompInstance();

        comp.ngOnInit();

        expect(comp.testTxt).toEqual('initialized!');
    }));
});