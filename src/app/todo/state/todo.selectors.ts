import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../todo';
import { TodoState } from './todo.reducer';
import * as AppState from '../../app.state';
// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  todos: TodoState;
}
//SELECTORS : is a function into the store
//SELECTORS : is a pure functions using for obtaining slices of store state
//NB : a selctor shoud be a pure function with no side effects
//there are two types of selector functions provided by the ngrx library (respect the order !!!!!) :

// the first is the createFeatureSelector allows to get the feature slize ( get the todos object from the global state)
const getTodoFeatureState = createFeatureSelector<TodoState>('todos'); // assigne this function to a const => call it with : getTodoFeatureState()

//The second type is createSelector : select a specific bit of state and return its value
export const getCurrentid = createSelector(
  getTodoFeatureState, // pass the FeatureSelector function
  (state) => state.id // the state here is the todos slize returnd by the first argument we can filter , map ect.. !!! in this case we return the id from the to
);

//Composing Selctors :
export const getCurrentTodo = createSelector(
  getTodoFeatureState, // provide the todo slize of state
  getCurrentid, // provide the id of the currently selcted todo
  (state, id) => {
    //if the todo has id=''we assume that is a new todo
    // if (id === '') {
    //   return {
    //     id: 0,
    //     username: '',
    //     creationDate: 'xx/yy/zz',
    //   };
    // } else {
    //null : no todo is currently selected
    return id ? state.todos.find((p) => p.id === id) : null;
    //}
  }
);

export const getTodos = createSelector(
  getTodoFeatureState,
  (state) => state.todos
);

export const getError = createSelector(
  getTodoFeatureState,
  (state) => state.error
);

export const getTodosLoading = createSelector(
  getTodoFeatureState,
  (state) => state.loading
);
//imagine that i have a calcul functions sum() in other file i can do that
function sum(data: Todo[]) {
  return data.length;
}
//getTodos : select the list of todos
export const getTotalTodos = createSelector(getTodos, (todos) => sum(todos));
//this last syntaxe can be like that : bcz the two function have the same signature todos : function 1  : (todos) => function 2 sum(todos)
//export const getTotalTodos = createSelector(getTodos,sum);
