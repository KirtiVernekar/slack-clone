import { template } from '@babel/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SidebarOption.scss'

function SidebarOption({ Icon, title, id, navLink, addChannelOption }) {
    const navigate = useNavigate();

    const selectNavLink = () => {
        navigate(`/user/${navLink}`);
    }

    const selectChannel = () => {
        if (id) {
            navigate(`/channel/${id}`);
        } else {
            navigate(template);
        }
    }

    return (
        <div className='sidebarOption' onClick={ navLink ? selectNavLink : selectChannel }>
            { Icon ? (
                <>
                    <Icon className='sidebarOption__icon' />
                    <h4>{title}</h4>
                </>
            ) : (
                <h4 className='sidebarOption__channel'>
                    <span className='sidebarOption__hash'>#</span>{title}
                </h4>
            ) }
        </div>
    )
}

export default SidebarOption
