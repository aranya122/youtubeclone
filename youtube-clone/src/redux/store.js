// src/redux/store.js
import { createStore } from 'redux';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Reducer function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload, isAuthenticated: true };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

// Create store
const store = createStore(rootReducer);

export default store;
