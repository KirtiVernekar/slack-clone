import React from 'react'
import './Sidebar.scss'
import { NumberOutlined } from '@ant-design/icons'

function SidebarOption({ Icon, title }) {
    return (
        <div className='sidebarOption'>
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
