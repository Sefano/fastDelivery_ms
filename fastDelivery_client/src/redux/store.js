import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/userReducer";

const store = configureStore(
  {
    reducer: {
      user: userReducer,
    },
  },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
