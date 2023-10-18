import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { TodoPageActions } from './state/todo.actions';
import {
  getError,
  getTodos,
  getTodosLoading,
  getTotalTodos,
  State,
} from './state/todo.selectors';
import { Todo } from './todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  // i dont need a local properties here
  todos: Signal<Todo[]>;
  errorMessage: Signal<string>;

  // i dont need a service here , but i inject the Store : our component subscribed to the store and selecting the entire todos slize of state
  //why i use the State type :  ? allows us to access any application state from our component
  private store = inject(Store<State>);

  
  //syntaxe 1 for init data : loding =true
  //syntaxe 2 before using the selector :loding$ = this.store.select((state) => state.todos.loading);
  //syntaxe 3 after using the selector
  loding = this.store.selectSignal(getTodosLoading);
  getTotalTodos = this.store.selectSignal(getTotalTodos);
  myStore$ = this.store.subscribe((store) => console.log(store));

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.todos = this.store.selectSignal(getTodos); // use pipe and tap to set somthing if u need

    //i can use this syntaxe but : (-) 'products' :repreent the name of the slize of state :  hard coding string
    // this.store.select('products').subscribe((result)=>{
    // (-) => know the store structure
    //   this.todos = result
    // }) =>we dont need to impact the component.ts  Use a selector (index.ts)

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage = this.store.selectSignal(getError);

    this.store.dispatch(TodoPageActions.loadTodos());
  }

  deleteTodo(todo: Todo): void {
    this.store.dispatch(TodoPageActions.deleteTodo({ id: todo.id }));
  }

  //the event binding
  saveTodo(todo: Todo): void {
    this.store.dispatch(TodoPageActions.createTodo({ todo }));
  }
  /*
  updateTodo(todo: Todo): void {
    this.store.dispatch(TodoPageActions.updateTodo({ todo }));
  }

*/
}
