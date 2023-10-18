import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  formGroup: FormGroup;
  pageTitle = 'Todo Save';

  @Input() errorMessage: string;
  @Output() saveTodo = new EventEmitter<Todo>();

  constructor(private fb: FormBuilder, private todoService: TodoService) {}

  ngOnInit() {
    this.onInitForm();
  }

  onInitForm() {
    // this.formGroup = this.fb.group({
    //   username: ['', [Validators.required, Validators.minLength(6)]],
    //   todo: ['', [Validators.required, Validators.minLength(6)]],
    // });

    // Define the form group
    this.formGroup = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      todo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get username() {
    return this.formGroup.get('username');
  }
  get todo() {
    return this.formGroup.get('todo');
  }

  save() {
    var values = this.formGroup.getRawValue();
    //if (!values) return;

    if (!this.formGroup.valid) return;

    this.saveTodo.emit(values);
    // Reset the form back to pristine
    this.formGroup.reset();

    //if (values.id === 0) {
    //   this.create.emit(product);
    // } else {
    //  this.update.emit(values);
    //}
  }

  displayProduct(todo: Todo | null): void {
    if (todo && this.formGroup) {
      // Reset the form back to pristine
      this.formGroup.reset();

      // Display the appropriate page title
      if (todo.id === '') {
        this.pageTitle = 'Add Todo';
      } else {
        this.pageTitle = `Edit Todo: ${todo.username}`;
      }

      // Update the data on the form
      this.formGroup.patchValue({
        username: todo.username,
        todo: todo.todo,
      });
    }
  }
}
