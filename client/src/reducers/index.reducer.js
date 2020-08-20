import { combineReducers } from "redux";

import booksReducer from "./books.reducer";
import usersReducer from "./users.reducer";

const rootReducer = combineReducers({
  books: booksReducer,
  user: usersReducer,
});

export default rootReducer;
