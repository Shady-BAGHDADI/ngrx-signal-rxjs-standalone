import {
  AfterViewInit,
  Component,
  QueryList,
  VERSION,
  ViewChildren,
} from '@angular/core';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
