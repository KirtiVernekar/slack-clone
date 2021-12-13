import React, {useState, useEffect, useContext} from 'react'
import { FormOutlined, MoreOutlined, CaretDownOutlined, GlobalOutlined, HeartOutlined, 
         FileSearchOutlined, MessageOutlined, BookOutlined, TeamOutlined, AppstoreOutlined, PlusSquareOutlined } from '@ant-design/icons'
import SidebarOption from './SidebarOption'
import AddChannel from '../modal/AddChannel'
import db from '../../firebase/firebase.utils'
import { StateContext } from '../../context/GlobalState';
import './Sidebar.scss'


function Sidebar() {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => 
            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                }))
            )
        );
    }, []);
    

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <div className='sidebar__info'>
                    <h3>Channel Name</h3>
                    {/* <h4>{user?.displayName}</h4> */}
                </div>
                <FormOutlined className='editBtn' />
            </div>
            <SidebarOption Icon={MessageOutlined} title='Threads' navLink="threads"/>
            <SidebarOption Icon={HeartOutlined} title='Mentions & reactions' navLink="activity-page"/>
            <SidebarOption Icon={BookOutlined} title='Saved items' navLink="saved-page"/>
            <SidebarOption Icon={GlobalOutlined} title='Channel browser' navLink="browse-channels"/>
            <SidebarOption Icon={FileSearchOutlined} title='File browser' navLink="browse-files"/>
            <SidebarOption Icon={TeamOutlined} title='People & user groups' navLink="browse-people"/>
            <SidebarOption Icon={AppstoreOutlined} title='Apps' navLink="apps"/>
            <SidebarOption Icon={MoreOutlined} title='More'/>

            <hr />
            <SidebarOption Icon={CaretDownOutlined} title='Channels'/>
            <hr />

            <AddChannel/>
            
            {/* Connect to DB n list all channels */}
            {channels.map(channel => (
                <SidebarOption title={channel.name} id={channel.id} />
            ))}

        </div>
    )
}

export default Sidebar

