import React, {useState, useEffect} from 'react'
import './Sidebar.scss'
import { Badge } from 'antd'
import { MinusCircleOutlined, FormOutlined, PlusOutlined, CaretUpOutlined, CaretDownOutlined, GlobalOutlined, HeartOutlined, FileSearchOutlined, MessageOutlined, StarOutlined, BookOutlined, TeamOutlined, AppstoreOutlined } from '@ant-design/icons'
import SidebarOption from './SidebarOption'
import db from '../../firebase/firebase'

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
                    {/* <MinusCircleOutlined size='small'/><h4>Username</h4> */}
                    <Badge size="large" color="#00FF00"><h4>Username</h4></Badge>
                </div>
                <FormOutlined className='editBtn' />
            </div>
            <SidebarOption Icon={MessageOutlined} title='Threads'/>
            <SidebarOption Icon={HeartOutlined} title='Mentions & reactions'/>
            <SidebarOption Icon={BookOutlined} title='Saved items'/>
            <SidebarOption Icon={GlobalOutlined} title='Channel browser'/>
            <SidebarOption Icon={FileSearchOutlined} title='File browser'/>
            <SidebarOption Icon={TeamOutlined} title='People & user groups'/>
            <SidebarOption Icon={AppstoreOutlined} title='Apps'/>
            <SidebarOption Icon={CaretUpOutlined} title='Show less'/>
            <hr />
            <SidebarOption Icon={CaretDownOutlined} title='Channels'/>
            {/* <SidebarOption title='discussions'/> */}
            <hr />
            <SidebarOption Icon={PlusOutlined} title='Add channels'/>

            {/* Connect to DB n list all channels */}
            {channels.map(channel => (
                <Sidebar title={channel.name} id={channel.id} />
            ))}

        </div>
    )
}

export default Sidebar

