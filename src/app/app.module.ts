import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { TodoService } from './todo/todo.service';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TodoModule } from './todo/todo.module';
import { AppRoutingModule } from './app-routing.module';
//import { environment } from '../environments/environment';
const environment = {
  production: false,
};
@NgModule({
  imports: [
    BrowserModule,
    TodoModule,
    AppRoutingModule,
    //NgRx : the ng add command , add those methods (StoreModule.forRoot({}),EffectsModule.forRoot([]))
    StoreModule.forRoot({}), // register the reducer in object

    //Install the extension Redux dev tools and the add that :
    StoreDevtoolsModule.instrument({
      name: 'Todo Demo App DevTools', //if i have 2 app i can filter by name of app
      maxAge: 25, // limit of amount of actions to be stored in history // default is 50
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]), //register the reducer into an  array  // use forFeature for the lazy loading
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [TodoService],
})
export class AppModule {}
