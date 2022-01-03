import React, { useState, useContext } from 'react'
import { SendOutlined } from '@ant-design/icons';
// import { Picker }
import './ChatInput.scss'
import { StateContext } from '../../context/GlobalState';
import firebase from '@firebase/app-compat';
import db, { auth } from '../../firebase/firebase.utils';

function ChatInput({ channelName, channelId }) {
    const [messageInput, setMessageInput] = useState("");
    const { user } = useContext(StateContext);

    const sendMessage = (e) => {
        e.preventDefault();
        
        if(!messageInput) {
            alert("No message entered!")
        } else {
            if (channelId) {
                db.collection("channels").doc(channelId).collection("messages").add({
                    message: messageInput,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    profileImage: user.photoURL
                });
            }
            setMessageInput("");
        }
    }

    return (
        <div className='chatInput'>
            <form>
                <input 
                    onChange={(e) => setMessageInput(e.target.value)}
                    type="text" 
                    value={messageInput}
                    placeholder={`Message #${channelName?.toLowerCase()}`} />
                {/* <Picker
                    set="apple"
                    onSelect={this.handleAddEmoji}
                    className="emojipicker"
                    title="Pick your emoji"
                    emoji="point_up"
                /> */}
                <button 
                    type="submit"
                    onClick={sendMessage}>
                    <SendOutlined />
                    <SendOutlined />
                    <SendOutlined />
                </button>
            </form>
        </div>
    )
}

export default ChatInput

