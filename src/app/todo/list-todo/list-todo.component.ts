import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css'],
})
export class ListTodoComponent implements OnInit {
  pageTitle = 'Todos';
  @Input() errorMessage: string;
  @Input() todos: Todo[];
  @Input() totalTodos: number;

  @Output() deleteTodo = new EventEmitter<Todo>();

  ngOnInit(): void {}

  delete(todo: Todo): void {
    if (todo) {
      if (confirm(`Really delete the product: ${todo.username}?`)) {
        console.log('todoId for the delete', todo.id);
        this.deleteTodo.emit(todo);
      }
    } else {
      // No need to delete, it was never saved
      //this.clearCurrent.emit();
    }
  }
}
