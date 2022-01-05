import React, { useState, useContext } from 'react'
import { StateContext } from '../../context/GlobalState'
import firebase from '@firebase/app-compat'
import db from '../../firebase/firebase.utils'
import FileUploadModal from '../modal/FileUploadModal'
import { SendOutlined, SmileOutlined } from '@ant-design/icons'
import { Picker } from "emoji-mart"
import 'emoji-mart/css/emoji-mart.css'
import './ChatInput.scss'


function ChatInput({ channelName, channelId }) {
    const { user } = useContext(StateContext);
    const [messageInput, setMessageInput] = useState("");
    const [emojiPicker, setEmojiPicker] = useState(false);
        
    const handleTogglePicker = (event) => {
        event.preventDefault();
        setEmojiPicker(!emojiPicker);
    }
 
    const handleAddEmoji = (emoji) => {
        const newMessage = messageInput + emoji.native;
        setMessageInput(newMessage);
        // setEmojiPicker(false);
    }; 

    const sendMessage = (event, imageURL=null ) => {
        event.preventDefault();
        
        if(messageInput || imageURL) {
            if (channelId) {
                db.collection("channels").doc(channelId).collection("messages").add({
                    message: messageInput,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    profileImage: user.photoURL,
                    fileURL: imageURL
                });
            }
            setMessageInput("");
        } else {
            alert("No message entered!");
        }
    }

    
    return (
        <>
        <div className='chatInput'>
            <input 
                onChange={(e) => setMessageInput(e.target.value)}
                type="text" 
                value={messageInput}
                placeholder={`Message #${channelName?.toLowerCase()}`} />
            <div className='chatInput__options'>
                <button 
                    onClick={handleTogglePicker}>
                    <SmileOutlined />
                </button>
                <FileUploadModal uploadMessage={sendMessage}/>
                <button 
                    type="submit"
                    onClick={sendMessage}>
                    <SendOutlined />
                </button>
            </div>
        </div>
        {   emojiPicker &&
            <div className="emojiPicker">
                <Picker
                    set="twitter"
                    showPreview={false}
                    onSelect={handleAddEmoji}
                    title="Pick your emoji"
                    emoji="point_up"
                />
            </div>
        }
        </>
    )
}

export default ChatInput;

