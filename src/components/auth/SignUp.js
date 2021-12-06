import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined, MailOutlined, LockOutlined, ReloadOutlined } from '@ant-design/icons'
import { auth } from './../../firebase/firebase.utils'
import { StateContext } from '../../context/GlobalState'
import './SignUp.scss'


function SignUp() {
    const navigate = useNavigate();
    const {setUser} = useContext(StateContext);
    const [formData, setFormData] = useState({  
                                                username: '',
                                                email: '',
                                                password: '',
                                                confirmpassword: '' 
                                            });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value, });
    }

    const signUp = (event) => {
        event.preventDefault();

        if (formData.password === formData.confirmpassword) {
            auth.createUserWithEmailAndPassword(formData.email, formData.password).then((result) => {
                setUser(result.user);
                sessionStorage.setItem('currentUser', JSON.stringify(result.user));
                navigate('/');
            }).catch(error => {
                alert(error.message);
            })
        } else {
            alert("Passwords do not match!");
        }
    }

    return (
        <div className='signup'>
            <div className='signup__container'>
                <img src="https://cdn.worldvectorlogo.com/logos/slack-2.svg"  alt="slack-logo" />
                <h1>Sign Up for WebDev Club</h1>
                <p>webdevclub.slack.com</p>
                <div className='signup__form'>
                    <div className='signup__form--username'>
                        <UserOutlined/>
                        <input id="username" type="text" placeholder="Your name" onChange={handleChange}/>
                    </div>
                    <div className='signup__form--email'>
                        <MailOutlined />
                        <input id="email" type="email" placeholder="name@work-email.com" onChange={handleChange}/>
                    </div>
                    <div className='signup__form--pwd'>
                        <LockOutlined />
                        <input id="password" type="password" placeholder="Your password" onChange={handleChange}/>
                    </div>
                    <div className='signup__form--confirmpwd'>
                        <ReloadOutlined />
                        <input id="confirmpassword" type="password" placeholder="Confirm password" onChange={handleChange}/>
                    </div>
                    <button type="submit" onClick={signUp}>Sign Up</button>
                </div>
                <div className='signin__link'>
                    <p>Already using Slack?</p>
                    <Link to="/signin">Sign In!</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp
