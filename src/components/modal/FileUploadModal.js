import React, { useState, useContext } from 'react'
import { useParams } from 'react-router';
import { StateContext } from '../../context/GlobalState'
import db, { storage } from '../../firebase/firebase.utils'
import mime from 'mime-types'
import { PaperClipOutlined } from '@ant-design/icons'
import './FileUploadModal.scss'
// import { Modal, Button, Input } from 'antd';
// const { Search } = Input;

const FileUploadModal = () => {
    const { user } = useContext(StateContext);
    const { channelId } = useParams();
    const [file, setFile] = useState(null);
    const [fileDownloadURL, setFileDownloadURL] = useState();
    const [messageInput, setMessageInput] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const supportedFileTypes = ['images/jpeg', 'images/png', 'images/gif']

    const handleModalShow = (event) => {
        event.preventDefault();
        setShowModal(!showModal);
    }

    const handleFileInput = (event) => {
        const newFile = event.target.files[0];
        setFile(newFile);
        console.log(file);
    }

    const uploadFile = (event) => {
        event.preventDefault();
        
        let metadata;
        const storageRef = storage.ref()
        const uploadTask = storageRef.child(file.name).put(file);
        const pathToUpload = channelId;
        
        if(file == null) {
            alert("No file selected!")
        } else {
            if (supportedFileTypes.includes(mime.lookup(file.name))) {
                metadata = { contentType: mime.lookup(file.name) }; 

                uploadTask.on(storage.TaskEvent.STATE_CHANGED,
                    (snapshot) =>{
                      let progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                      setUploadProgress(progress);
                    },(error) =>{
                      throw error
                    },() =>{
                      uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                        setFileDownloadURL(url);
                      })
                    })
                setFile(null);
            } else {
                alert("File type not supported");
            }
            // if (channelId) {
            //     db.collection("channels").doc(channelId).collection("messages").add({
            //         message: messageInput,
            //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            //         user: user.displayName,
            //         profileImage: user.photoURL
            //     });
            // }
            // setMessageInput("");
        }
    };

    // const sendFileMessage = (fileUrl, ref, pathToUpload) => {
    //     ref
    //       .child(pathToUpload)
    //       .push()
    //       .set(this.createMessage(fileUrl))
    //       .then(() => {
    //         this.setState({ uploadState: "done" });
    //       })
    //       .catch(err => {
    //         console.error(err);
    //         this.setState({
    //           errors: this.state.errors.concat(err),
    //         });
    //       });
    // };

    return (
        <>
        <button 
            onClick={handleModalShow}>
            <PaperClipOutlined />
        </button>
        {   showModal &&
            <div className="filemodal">
                <div className="filemodal__container">
                    <div className="filemodal__header">
                        <h2>Select an image</h2>
                    </div>
                    <hr />
                    <form className="filemodal__form">
                        <div>
                            <input type="file" required placeholder="No file selected" onChange={handleFileInput} />
                        </div>
                        <label>Supported file types: JPEG/PNG/GIF</label>
                    </form>
                    <div className="filemodal__footer">
                        <button type="submit" className="filemodal__footer--cta" onClick={uploadFile}>Upload</button>
                        <button onClick={handleModalShow}>Cancel</button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default FileUploadModal;
/* <Modal
    title="Select an image"
    centered
    visible={showModal}
    onCancel={closeModal}
    footer={[
        <Button key="back" onClick={closeModal}>
            Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={uploadFile}>
            Upload
        </Button>,
    ]}
>
    <Search
        addonBefore="file-type: JPG/PNG" 
        placeholder="No file selected"
        allowClear
        enterButton="Browse"
        size="large"
        onSearch={closeModal}
    />
</Modal> */