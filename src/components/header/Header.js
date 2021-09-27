import React from 'react'
import './Header.scss'
import { Avatar} from 'antd';
import { ClockCircleOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'

function Header() {
    return (
        <div className='header'>
            <div className='header__left'>
                {/* Avatar for logged-in user */}
                <Avatar icon={<UserOutlined />} />
                <ClockCircleOutlined className='clock'/>
            </div>
            <div className='header__search'>
                <input placeholder='Search Channel' />
                <SearchOutlined />
            </div>
            <div className='header__right'>
                {/* help icon */}
                <QuestionCircleOutlined />
            </div>
        </div>
    )
}

export default Header
