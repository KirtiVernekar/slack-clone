import React, {useContext, useState} from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import './App.scss';
import Chat from './components/chat/Chat'
import { StateContext } from './context/GlobalState'
import { getAuth } from "firebase/auth";


function App() {
  const {user} = useContext(StateContext)
  // const auth = getAuth();
  // const user = auth.currentUser;


 // console.log(user)
  return (
    <div className="app">
      { !user ? (
        <SignIn />
      ) : (
        <>
        <Header />
        <div className="app__body">
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <h2>Welcome to Slack!</h2>
            </Route>
            <Route exact path="/channel/:channelId">
              <Chat />
            </Route>
          </Switch>
        </div>
        </>
      )}
    </div>
  );
}

export default App;
