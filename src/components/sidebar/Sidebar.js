import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'antd'
import { FormOutlined, PlusOutlined, MoreOutlined, CaretDownOutlined, GlobalOutlined, HeartOutlined, 
         FileSearchOutlined, MessageOutlined, StarOutlined, BookOutlined, TeamOutlined, AppstoreOutlined } from '@ant-design/icons'
import SidebarOption from './SidebarOption'
import db from '../../firebase/firebase.utils'
import { StateContext } from '../../context/GlobalState';
import './Sidebar.scss'


function Sidebar() {
    const [channels, setChannels] = useState([]);
    const {user} = useContext(StateContext)

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

    console.log(channels);

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <div className='sidebar__info'>
                    <h3>Channel Name</h3>
                    {/* <MinusCircleOutlined size='small'/><h4>Username</h4> */}
                    <Badge size="large" color="#00FF00"><h4>{user?.displayName}</h4></Badge>
                </div>
                <FormOutlined className='editBtn' />
            </div>
            <Link to="/user/threads"><SidebarOption Icon={MessageOutlined} title='Threads' /></Link>
            <Link to="/user/activity-page"><SidebarOption Icon={HeartOutlined} title='Mentions & reactions' /></Link>
            <Link to="/user/saved-page"><SidebarOption Icon={BookOutlined} title='Saved items' /></Link>
            <Link to="/user/browse-channels"><SidebarOption Icon={GlobalOutlined} title='Channel browser' /></Link>
            <Link to="/user/browse-files"><SidebarOption Icon={FileSearchOutlined} title='File browser' /></Link>
            <Link to="/user/browse-people"><SidebarOption Icon={TeamOutlined} title='People & user groups' /></Link>
            <Link to="/user/apps"><SidebarOption Icon={AppstoreOutlined} title='Apps' /></Link>
            <SidebarOption Icon={MoreOutlined} title='More'/>
            <hr />
            <SidebarOption Icon={CaretDownOutlined} title='Channels'/>
            {/* <SidebarOption title='discussions'/> */}
            <hr />
            <SidebarOption addChannelOption Icon={PlusOutlined} title='Add channels'/>

            {/* Connect to DB n list all channels */}
            {channels.map(channel => (
                <SidebarOption title={channel.name} id={channel.id} />
            ))}

        </div>
    )
}

export default Sidebar

