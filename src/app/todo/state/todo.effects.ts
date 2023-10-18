import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */ //DEFINE THE NGRX EFFECTS :
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TodoService } from '../todo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoApiActions, TodoPageActions } from './todo.actions';

//Effect is a service decorated by @Injectable()
//side effects : is an operation that interacts with an external source such as API using Http to acces backend is an example of side effects
@Injectable()
export class TodoEffects {
  //concatMap : req/subcription in order (order the inner obs) is less performant but the safest and if unsure which to use : wait for last req to finish before starting the next
  //mergeMap : req/subcription in //
  //switchMap :  cancel the current req/subcription (is in a lot of demo app but is is often the wrong operators to use) exmple to use it : searches in a typer head # exhaustMap
  //exhaustMap : ignore all req until the current req complete : forexample : during load action when you don't want to make any more request until the initial one is complete (when loding data from the server )

  //ROLE : take an action , do some work (call http service) and return an other action
  //=> i needto inject the actions observable (emits an action every time one is dispatched = to listen to all action in our application ) and service to get the data from the server.
  constructor(private actions$: Actions, private todoService: TodoService) {}

  // i use async operation that has side effects here
  loadTodos$ = createEffect((): any => {
    return this.actions$.pipe(
      // filter out the type the actions we are not interessted in
      //=> listen for loadTodos action
      ofType(TodoPageActions.loadTodos),
      // maps over each emitted action and call a service who return obs => THEN Merges these observables into a single stream.
      mergeMap(() =>
        // i prefer when i use loding to use exhaustMap
        //todoService call the serveur : the getTodos method returns observables, we dont want nested obs so we use a heigher order mapping operator such as mergeMap to merge the two obs : !!!! the one from actions$ and the one returned from getTodos() method
        this.todoService.getTodos().pipe(
          // if the responce returned by the http call is success : (map return an obs )
          //map over the emitted todos array and return loadTodosSuccess action with todos as its result {todos:todos} => !!! the reducer shoud listen to this action using the on method and add the todos to the store.=> go to the reducer => configure our reducer
          map((todos) => TodoApiActions.loadTodosSuccess({ todos })),
          //if the get fail :
          //if i have error i get the erreur message  as metadata and return it in a fail action
          //i use of to create an  observable from our action = return an observable action

          //=> step 2 : go to reducer add error property to the interface
          //then initilize its value to an emty string
          //after this you can make a new selctor called getError to select this error property from the store
          //Finaly we will add another on hundler to our todos reducer for our loadTodosFailure action and set the todos to empty array and adding the action error data to our state property

          //=> step 3 : notify the component :   this.errorMessage$ = this.store.select(getError);
          catchError((error: HttpErrorResponse) =>
            //{error} if i get error from backend
            of(TodoApiActions.loadTodosFail({ error: error.message }))
          )
        )
      )
    );
  });

  /*
  updateTodo$ = createEffect(():any => {
    return this.actions$
      .pipe(
        ofType(TodoPageActions.updateTodo),
        concatMap(action =>
          this.todoService.updateTodo(action.todo)
            .pipe(
              map(todo => TodoApiActions.updateTodoSuccess({ todo })),
              catchError(error => of(TodoApiActions.updateTodoFailure({ error })))
            )
        )
      );
  });

 */
  createTodo$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(TodoPageActions.createTodo),
      //if i need add in // use mergeMap
      //wait for the new one created then create the next
      concatMap((action) =>
        this.todoService.createTodo(action.todo).pipe(
          map((todo) => TodoApiActions.createTodoSuccess({ todo })),
          catchError((error) => of(TodoApiActions.createTodoFail({ error })))
        )
      )
    );
  });

  deleteTodo$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(TodoPageActions.deleteTodo),
      mergeMap((action) =>
        this.todoService.deleteTodo(action.id).pipe(
          map(() => TodoApiActions.deleteTodoSuccess({ id: action.id })),
          catchError((error) => of(TodoApiActions.deleteTodoFail({ error })))
        )
      )
    );
  });
}
