import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { Observable, Subject, throwError } from 'rxjs';
import { Todo } from './todo';

@Injectable()
export class TodoService {
  private todosUrl = 'https://613f628ae9d92a0017e1769e.mockapi.io/todo';

  private http = inject(HttpClient);

  /* 

  subject: Subject<any> = new Subject<any>();
  subject$ = this.subject.asObservable();
  addDataToSubject(data) {
    this.subject.next(data);
  }
*/

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(shareReplay(1));
  }

  public deleteTodo(id: string): Observable<{}> {
    return this.http.delete<Todo>(this.todosUrl + '/' + id);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo);
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
