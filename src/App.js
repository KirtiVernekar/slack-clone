import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StateProvider } from './context/GlobalState';
import Homepage from './components/homepage/Homepage'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Chat from './components/chat/Chat';
import FillerComponent from './components/filler/FillerComponent';
import './App.scss';


function App() {
  return (
    <StateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage/>}>
              <Route path="channel/:channelId" element={<Chat/>} />
              <Route path="user/:navlink" element={<FillerComponent/>} />
            </Route>
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            
          </Routes>
        </Router>
    </StateProvider>
  );
}

export default App;
