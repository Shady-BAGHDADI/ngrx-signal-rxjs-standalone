import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../todo';

export const TodoPageActions = createActionGroup({
  source: 'Todo Page',
  events: {
    'Load Todos': emptyProps(),
    'Create Todo': props<{ todo: Todo }>(),
    'Update Todo': props<{ todo: Todo }>(),
    'Delete Todo': props<{ id: string }>(),
  },
});

export const TodoApiActions = createActionGroup({
  source: 'Todo API',
  events: {
    'Load Todos Success': props<{ todos: Todo[] }>(),
    'Load Todos Fail': props<{ error: string }>(),
    'Create Todo Success': props<{ todo: Todo }>(),
    'Create Todo Fail': props<{ error: string }>(),

    'Update Todo Success': props<{ todo: Todo }>(),
    'Update Todo Fail': props<{ error: string }>(),
    'Delete Todo Success': props<{ id: string }>(),
    'Delete Todo Fail': props<{ error: string }>(),
  },
});
