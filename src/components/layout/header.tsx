import { Button, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { type FC } from 'react'
import type { IHeader } from './types';
import Profile from './profile';
import Language from '../language';

const CustomHeader:FC<IHeader> = ({collapsed, setCollapsed}) => {
    const {token: { colorBgContainer }} = theme.useToken();
    return (
        <Header style={{background: colorBgContainer, borderBottom: "1px solid #d9d9d9", padding: "0px 10px 0px 0px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} 
            style={{
                fontSize: '16px',
                width: 64,
                height: 64,
            }} />
        <div className="flex items-center gap-5">
            <Language className="w-25" />
            <Profile />
          </div>
        </Header>
    )
}

export default CustomHeader