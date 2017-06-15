import {TestBed, async} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from '../../main/main.component';
import {TodoComponent} from '../../todo/todo.component';
import {TodoService} from '../../todo/todo.service';

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
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render title in a h2 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Todo App');
    }));
});
