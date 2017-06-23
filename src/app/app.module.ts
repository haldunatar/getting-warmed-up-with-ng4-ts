import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './main/main.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo/todo.service';
import { Ellipsis } from './commons/pipes/ellipsis.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
      Ellipsis
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ TodoService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
