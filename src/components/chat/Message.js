import React from 'react'
import './Message.scss'

function Message({message, timestamp, user, profileImage}) {
    console.log(profileImage)
    return (
        <div className='message'>
            <img src={profileImage} alt="Not loading" />
            <div className="message__info">
                <h5>{user} <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span></h5>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
