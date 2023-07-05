// store.js
import { createStore } from "redux";

// Initial state
const initialState = {
  isLoggedIn: false,
};

// Reducer function
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(loginReducer);

export default store;
