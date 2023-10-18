//import { UserState } from '../user/state/user.reducer';

import { TodoState } from './todo/state/todo.reducer';

// the complete stucture of state in our state in our store=> the store now has a
// Representation of the entire app state // all state
// Extended by lazy loaded modules
export interface State {
  //todos: TodoState; //our todos feature is currently lazy loaded =>
  //it is downloaded form the server separate from our main bundle
  // user: UserState;
}
