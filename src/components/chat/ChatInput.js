import React, { useState, useContext } from 'react'
import { SendOutlined } from '@ant-design/icons';
import './ChatInput.scss'
import { StateContext } from '../../context/GlobalState';
import firebase from '@firebase/app-compat';
import db from '../../firebase/firebase.utils';

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState("");
    const user = useContext(StateContext)

    const sendMessage = (e) => {
        e.preventDefault();
        
        if (channelId) {
            db.collection("channels").doc(channelId).collection("messages").add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                profileImage: user.photoURL
            });
        }

        setInput("");
    }

    return (
        <div className='chatInput'>
            <form>
                <input 
                    onChange={(e) => setInput(e.target.value)}
                    type="text" 
                    value={input}
                    placeholder={`Message #${channelName?.toLowerCase()}`} />
                <button 
                    type="submit"
                    onClick={sendMessage}>
                    <SendOutlined />
                </button>
            </form>
        </div>
    )
}

export default ChatInput

