import React, { useState } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons'
import db from '../../firebase/firebase.utils'
import { collection, addDoc } from 'firebase/firestore'
import './AddChannel.scss'

function AddChannel() {
    const [showModal, setShowModal] = useState(false);
    const [channel, setChannel] = useState({  
                                        name: '',
                                        description: ''
                                    });

    const handleChange = (event) => {
        setChannel({ ...channel, [event.target.id]: event.target.value, });
    }

    const addChannel = (event) => {
        event.preventDefault();

        if (channel.name && channel.description) {
            db.collection("channels").add({
                name: channel.name,
                description: channel.description
            }).then(()=> {
                setShowModal(false);
                alert("Channel added successfully!")
            }).catch((error) => {
                alert(error);
            }); 
        }
        setChannel({ name: '', description: '' });
    }

    
    return (
        <>
        <div className="addChannel" onClick={() => setShowModal(true)}>
            <PlusSquareOutlined className='addChannel__icon' />
            <h4>Add channels</h4>
        </div>
        {   showModal &&
            <div className="modal">
                <div className="modal__container">
                    <div className="modal__header">
                        <h2>Please enter channel details!</h2>
                    </div>
                    <hr />
                    <form className="modal__form">
                        <input type="text" required placeholder="Enter channel name" id="name" onChange={handleChange}/>
                        <textarea type="text" required placeholder="Enter channel description" id="description" onChange={handleChange}/>
                    </form>
                    <div className="modal__footer">
                        <button type="submit" className="modal__footer--cta" onClick={addChannel}>Add</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default AddChannel;