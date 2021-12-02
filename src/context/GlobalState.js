import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  user: JSON.parse(sessionStorage.getItem('currentUser')) || null,
};

export const StateContext = createContext(initialState);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setUser(user) {
    dispatch({
      type: 'SET_USER',
      user
    });
  }

  return (<StateContext.Provider value={{
    user: state.user, 
    setUser
  }}>
    {children}
  </StateContext.Provider>);
}
