import React, {useContext} from 'react'
import './SignIn.scss'
import { GoogleOutlined } from '@ant-design/icons'
import { auth, provider } from './../../firebase/firebase.utils'
import { StateContext } from '../../context/GlobalState'


function SignIn() {
    const {setUser} = useContext(StateContext)

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithPopup(provider).then ((result) => {
            setUser(result.user)
            sessionStorage.setItem('currentUser', JSON.stringify(result.user))
        }).catch(error => {
            alert(error.message);
        });
    }

    return (
        <div className='signin'>
            <div className='signin__container'>
                {/* <img src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"  alt="slack-logo" /> */}
                <img src="https://cdn.worldvectorlogo.com/logos/slack-2.svg"  alt="slack-logo" />
                <h1>Sign In to ReactJS Club</h1>
                <p>reactjsclub.slack.com</p>
                <div className='signin__form'>
                    <button className='google' onClick={signIn}><GoogleOutlined id='logo'/>Sign In with Google</button>
                    <div className='signin__hr'>
                        <hr/><span>OR</span><hr/>
                    </div>
                    <input placeholder="Enter your email"/>
                    <button>Sign In with Email</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn
