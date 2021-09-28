import React, { useEffect, useState } from 'react'
import './Chat.scss'
import { useParams } from 'react-router-dom'
import { StarOutlined, InfoCircleOutlined } from '@ant-design/icons'
import db from '../../firebase/firebase.utils'
import Message from './Message'

function Chat() {
    const { channelId } = useParams()
    const [ channelDetails, setChannelDetails ] = useState(null)
    const [ messages, setMessages] = useState([])

    useEffect(() => {
        if (channelId) {
            db.collection('channels').doc(channelId)
            .onSnapshot((snapshot) => 
                setChannelDetails(snapshot.data())
            )
        }
        db.collection('channels').doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map(doc => doc.data()))
        )
    }, [channelId]);

    //console.log(messages)

    return (
        <div className='chat'>
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong># {channelDetails?.name}</strong>
                        <StarOutlined className="star"/>
                    </h4>
                </div>
                <div className="chat__headerRight">
                    <p><InfoCircleOutlined />Details</p>
                </div>
            </div>
            <div className="chat__messages">
                {messages.map( ({message, timestamp, user, profileImage}) => (
                    <Message 
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        profileImage={profileImage}
                    />
                ))}
            </div>
        </div>
    )
}

export default Chat
