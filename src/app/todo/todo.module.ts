import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './state/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/todo.effects';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    SharedModule,
    // lazy loading the store and the Effects :
    StoreModule.forFeature('todos', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
  declarations: [TodoComponent, ListTodoComponent, AddTodoComponent],
})
export class TodoModule {}
