import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleOutlined } from '@ant-design/icons'
import { auth, providerGoogle } from './../../firebase/firebase.utils'
import { StateContext } from '../../context/GlobalState'
import './SignIn.scss'


function SignIn() {
    const navigate = useNavigate();
    const {setUser} = useContext(StateContext);
    const [formData, setFormData] = useState({  
                                                email: '',
                                                password: ''
                                            });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value, });
    }

    const signInGoogle = (event) => {
        event.preventDefault();

        auth.signInWithPopup(providerGoogle).then ((result) => {
            setUser(result.user);
            sessionStorage.setItem('currentUser', JSON.stringify(result.user));
            navigate('/');
        }).catch(error => {
            alert(error.message);
        });
    }

    const signInEmail = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(formData.email, formData.password).then ((result) => {
            setUser(result.user);
            sessionStorage.setItem('currentUser', JSON.stringify(result.user));
            navigate('/');
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
                        <input id="email" type="email" placeholder="name@work-email.com" onChange={handleChange}/>
                    </div>
                    <div className='signin__form--pwd'>
                        <label id="password-label" for="email">Password</label>
                        <input id="password" type="password" placeholder="Your password" onChange={handleChange}/>
                    </div>
                    <button onClick={signInEmail}>Sign In</button>
                </div>
                <div className='signup__link'>
                    <p>Are you new to Slack?</p>
                    <Link to="/signup">Sign Up!</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;

