/* NgRx */
import { createReducer, on } from '@ngrx/store';

import { Todo } from '../todo';
import * as AppState from '../../app.state';
import { TodoApiActions, TodoPageActions } from './todo.actions';

//Tools :Redux dev Tools extension
//DEF :
//Managing state :
//1- property bag (define properties in a service) ,
//2- basic state mangment use service to retrive ,delete,insert..the data ,
//3- state mangment with notifications : subject , BHsubject or simular ,
//4-  for complexe data :
//NGRX : state mangment : for hundling complexe state
//state is a single immutable data structure
//ACTION DESCRIBE state changes : interface that have a type as property of type string {type:string} that describe the action
//we can a proprty to action todos:[{data retrived from API}]
//Reducer : pure function take the current state and next action to produce a new state
//STORE : state is accessed with a store which is an observable of the state and observer of all actions

// State for this feature (Todo) : interface for the todo slize of state = > export so we can use it any where in our app => Structure of this State
export interface TodoState {
  // i use TodoState bcz i already  have a Todo interface
  id: string;
  loading: boolean;
  todos: Todo[];
  error: string;
}

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly. i add that in the index.ts
// export interface State extends AppState.State {
//   todos: TodoState;
// }

//initilize our state => to ensure the initial state is never changed we declare it as a constant
const initialState: TodoState = {
  id: '',
  loading: false,
  todos: [],
  error: '',
};

//reduce is a pure function not classes => no ctor => no store injection to disptch an action
export const todoReducer = createReducer<TodoState>(
  //we pass it the initialState as a first value to the createReducer function => and our store properties are never undefined
  initialState,
  on(
    TodoPageActions.loadTodos,
    (state): TodoState => ({
      ...state,
      loading: true,
    })
  ),

  //listen to the loadTodosSuccess action using on method and use the  (state, action): TodoState => {} : hundler function with state and action arguments (!!! action : have the data returned by the effects as a  props )
  on(TodoApiActions.loadTodosSuccess, (state, action): TodoState => {
    //we will return a new state object from Reducer to the Store
    return {
      ...state, // we sepread the exiting state
      todos: action.todos, // and sets the todos to a new array of todos
      loading: false,
      error: '', //clear the error property in our loadTodosSuccess
    };
  }), // GO to the component.ts
  on(TodoApiActions.loadTodosFail, (state, { error }): TodoState => {
    return {
      ...state,
      todos: [],
      error, //error: error =>  error
    };
  }),

  // After a create, the currentTodo is the new Todo. ((state, {todo}))
  on(TodoApiActions.createTodoSuccess, (state, action): TodoState => {
    return {
      ...state,
      todos: [...state.todos, action.todo], //doesnt use push here !!
      id: action.todo.id,
      error: '',
    };
  }),
  on(TodoApiActions.createTodoFail, (state, action): TodoState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a delete, the currentTodo is null.
  on(TodoApiActions.deleteTodoSuccess, (state, { id }): TodoState => {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
      id: null,
      error: '',
    };
  }),
  on(TodoApiActions.deleteTodoFail, (state, action): TodoState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  //After using Effects => update the store with the new data or error
  on(TodoApiActions.updateTodoSuccess, (state, action): TodoState => {
    // manipulate the provided state before returning new state.after a successful update we modify the array with the updated todo.
    //but because our state is immutable , we dont actually modify the array.Instead we create a new array called updatedTodos and copy the items from the original array to this new array.
    //i use map and not forEach because forEach immutable its modify the items directly in the array
    //filter , find , map , concat,spread => immutable dosnt change the original value , push ,splice ,shift forEach :mutable
    const updatedTodos = state.todos.map((item) =>
      //if the array item has the same id as our updated todo action.todo.id === item.id we place the updated todo in that location in the new array .Otherwise we place the existing item in the new array
      action.todo.id === item.id ? action.todo : item
    );

    //update the store and return the new state with new data returned by the side effect
    return {
      ...state,
      todos: updatedTodos,
      id: action.todo.id,
      error: '',
    };
  }),
  on(TodoApiActions.updateTodoFail, (state, action): TodoState => {
    return {
      ...state,
      error: action.error,
    };
  })
  /* 
  on(TodoPageActions.toggleTodoCode, (state): TodoState => {
    return {
      ...state,
      showTodoCode: !state.showTodoCode,
    };
  }),
  on(TodoPageActions.setCurrentTodo, (state, action): TodoState => {
    return {
      ...state,
      currentid: action.currentid,
    };
  }),
  on(TodoPageActions.clearCurrentTodo, (state): TodoState => {
    return {
      ...state,
      currentid: null,
    };
  }),
  on(TodoPageActions.initializeCurrentTodo, (state): TodoState => {
    return {
      ...state,
      currentid: 0,
    };
  }),
  
  */
);
