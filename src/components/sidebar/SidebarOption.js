import { template } from '@babel/core'
import React from 'react'
import { useHistory } from 'react-router'
import db from '../../firebase/firebase.utils'
import './SidebarOption.scss'

function SidebarOption({ Icon, title, id, addChannelOption }) {
    const history = useHistory()

    const addChannel = () => {
        const channelName = prompt("Please enter the channel name")
        if (channelName) {
            db.collection('channels').add({
                name: channelName
            })
        }
    }

    const selectChannel = () => {
        if (id) {
            history.push(`/channel/${id}`)
        } else {
            history.push(template)
        }
    }

    return (
        <div className='sidebarOption' onClick={addChannelOption ? addChannel : selectChannel }>
            { Icon && <Icon className='sidebarOption__icon' /> }
            { Icon ? (
                <h4>{title}</h4>
            ) : (
                <h4 className='sidebarOption__channel'>
                    <span className='sidebarOption__hash'>#</span>{title}
                </h4>
            ) }
            
            
        </div>
    )
}

export default SidebarOption
