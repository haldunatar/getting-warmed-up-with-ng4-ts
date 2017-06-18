import {TestBed, async} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from '../../main/main.component';
import {TodoComponent} from '../../todo/todo.component';
import {TodoService} from '../../todo/todo.service';

let fixture,
    compiled,
    app;

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                TodoComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule
            ],
            providers: [
                TodoService
            ],
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(AppComponent);
            app = fixture.debugElement.componentInstance;
            compiled = fixture.debugElement.nativeElement;
        });
    }));

    it('should create the app', async(() => {
        expect(app).toBeTruthy();
    }));

    it('should render title in a h2 tag', async(() => {
        fixture.detectChanges();

        expect(compiled.querySelector('h2').textContent).toContain('Todo App');
    }));
});
