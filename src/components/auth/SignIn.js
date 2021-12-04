import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignIn.scss'
import { GoogleOutlined } from '@ant-design/icons'
import { auth, providerGoogle, providerEmail } from './../../firebase/firebase.utils'
import { StateContext } from '../../context/GlobalState'


function SignIn() {
    const navigate = useNavigate();
    const {setUser} = useContext(StateContext);

    const signInGoogle = (e) => {
        e.preventDefault();

        auth.signInWithPopup(providerGoogle).then ((result) => {
            setUser(result.user);
            sessionStorage.setItem('currentUser', JSON.stringify(result.user));
            navigate('/');
        }).catch(error => {
            alert(error.message);
        });
    }

    const signInEmail = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(providerEmail).then ((result) => {
            setUser(result.user);
            sessionStorage.setItem('currentUser', JSON.stringify(result.user));
        }).catch(error => {
            alert(error.message);
        });
    }

    return (
        <div className='signin'>
            <div className='signin__container'>
                {/* <img src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"  alt="slack-logo" /> */}
                <img src="https://cdn.worldvectorlogo.com/logos/slack-2.svg"  alt="slack-logo" />
                <h1>Sign In to WebDev Club</h1>
                <p>webdevclub.slack.com</p>
                <div className='signin__form'>
                    <button className='google' onClick={signInGoogle}><GoogleOutlined id='logo'/>Sign In with Google</button>
                    <div className='signin__hr'>
                        <hr/><span>OR</span><hr/>
                    </div>
                    <div className='signin__form--email'>
                        <label id="email-label" for="email">Email address</label>
                        <input id="email" type="email" placeholder="name@work-email.com" />
                    </div>
                    <div className='signin__form--pwd'>
                        <label id="password-label" for="email">Password</label>
                        <input id="password" type="password" placeholder="Your password" />
                    </div>
                    <button onClick={signInEmail}>Sign In</button>
                </div>
                <div className='signup'>
                    <p>Are you new to Slack?</p>
                    <Link to="/signup">Sign Up!</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;

