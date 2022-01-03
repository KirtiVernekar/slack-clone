import React, {useContext} from 'react'
// import { Avatar} from 'antd';
import { ClockCircleOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { StateContext } from '../../context/GlobalState';
import { auth } from './../../firebase/firebase.utils'
import './Header.scss'


function Header() {
    // const {user} = useContext(StateContext);
    const {setUser} = useContext(StateContext);

    const signOut = (e) => {
        e.preventDefault();

        auth.signOut().then (() => {
            setUser(null);
            sessionStorage.clear();
        }).catch(error => {
            alert(error.message);
        });
    }

    return (
        <div className='header'>
            <div className='header__left'>
                <ClockCircleOutlined className='clock'/>
            </div>
            <div className='header__search'>
                <input placeholder='Search Channel' />
                <SearchOutlined />
            </div>
            <div className='header__right'>
                {/* help icon */}
                <QuestionCircleOutlined />
                {/* Avatar for logged-in user */}
                {/* <button onClick={signOut}><Avatar className='avatar' alt={user?.displayName} src={user?.photoURL}/></button> */}
                <button className='user-avatar' onClick={signOut}><UserOutlined/></button>
            </div>
        </div>
    )
}

export default Header
