import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './Message.scss'

function Message({message, timestamp, user, profileImage}) {
    return (
        <div className='message'>
            { profileImage ? <img src={profileImage} alt="" /> : <Avatar icon={<UserOutlined/>} shape="square" className="message__avatar"/> }
            <div className="message__info">
                <h5>{user} <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span></h5>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
