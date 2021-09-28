import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import './App.scss';
import Chat from './components/chat/Chat'

function App() {
  return (
    <div className="app">
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
    </div>
    
  );
}

export default App;
