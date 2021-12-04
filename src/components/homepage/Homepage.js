import React, {useContext, useState} from 'react'
import { Route, Navigate, useParams } from 'react-router-dom';
import { StateContext } from '../../context/GlobalState'
import { getAuth } from "firebase/auth";
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import Chat from '../chat/Chat'
import './Homepage.scss';
import { Link } from 'react-router-dom';


function Homepage() {
    const {user} = useContext(StateContext)
    // const auth = getAuth();
    // const user = auth.currentUser;
    console.log("Homepage", user);
    const { channelId } = useParams();

    return (
        <div>
        {!user ? (
            <Navigate to="/signin" />
        ) : (
            <>
                <Header />
                <div className="homepage">
                    <Sidebar />
                    { channelId ? <Chat channelId={channelId} /> : <h2>Welcome to Slack!</h2> }
                </div>
            </>
        )}
        </div>
    )
}

export default Homepage;
