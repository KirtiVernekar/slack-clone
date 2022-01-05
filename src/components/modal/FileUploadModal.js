import React, { useState } from 'react'
import { imagesRef } from '../../firebase/firebase.utils'
import mime from 'mime-types'
import { PaperClipOutlined } from '@ant-design/icons'
import './FileUploadModal.scss'
// import { Modal, Button, Input } from 'antd';
// const { Search } = Input;

const FileUploadModal = ({uploadMessage}) => {
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const supportedFileTypes = ['image/jpeg', 'image/png', 'image/gif']

    const handleModalShow = (event) => {
        event.preventDefault();
        setShowModal(!showModal);
    }

    const handleFileInput = (event) => {
        setFile(event.target.files[0]);
    }

    const uploadFile = (event) => {
        event.preventDefault();
                
        if(file == null) {
            alert("No file selected!");
        } else {
            let filetype = supportedFileTypes.includes(mime.lookup(file.name));
            const uploadTask = imagesRef.child(file.name).put(file, metadata);

            if (filetype) {
                setMetadata({ contentType: mime.lookup(file.name) }); 

                uploadTask.on("state_changed",
                    (snapshot) =>{
                      let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
                      setUploadProgress(progress);
                    },(error) =>{
                      throw error
                    },() =>{
                      uploadTask.snapshot.ref.getDownloadURL().then((URL) =>{
                        // setFileDownloadURL(URL);
                        uploadMessage(event, URL);
                      },(error) =>{
                        throw error
                      })
                    })
                // setFile(null);
            } else {
                alert("File type not supported");
            }

            setShowModal(false);
        }
    };


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
                        <input type="file" required placeholder="No file selected" onChange={handleFileInput} />
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