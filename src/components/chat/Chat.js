import React, { useEffect, useState } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import db from '../../firebase/firebase.utils'
import Message from './Message'
import ChatInput from './ChatInput'
import SkeletonLoader from '../loader/SkeletonLoader'
import './Chat.scss'

const Chat = ({ channelId }) => {
    const [ channelDetails, setChannelDetails ] = useState(null);
    const [ messages, setMessages] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);


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
        
        // setIsLoading(false);
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000)
        return () => clearTimeout(timeout);
    }, [channelId]);


    return (
        isLoading ? (
            <div className='chat'>
                <div className="chat__header"></div>
                <SkeletonLoader />
            </div>
        ) : (
            <div className='chat'>
                <div className="chat__header">
                    <div className="chat__headerLeft">
                        <h4 className="chat__channelName">
                            <strong># {channelDetails?.name}</strong>
                        </h4>
                        <p className="chat__channelDescription">{channelDetails?.description}</p>
                    </div>
                    <div className="chat__headerRight">
                        <p><InfoCircleOutlined />Details</p>
                    </div>
                </div>
                <div className="chat__messages">
                    {messages.map(({message, timestamp, user, profileImage}) => (
                        <Message 
                            key={timestamp}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            profileImage={profileImage}
                        />
                    ))}
                </div>
                <ChatInput channelName={channelDetails?.name} channelId={channelId} />
            </div>
        )
    )

}

export default Chat
