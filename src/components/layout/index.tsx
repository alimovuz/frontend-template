import { Button, Layout, theme } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import { useState, type FC } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const MainLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
  
  return (
    <Layout style={{minHeight: "100vh"}}>
      <Sidebar collapsed={collapsed}/>
      <Layout>
        <Header style={{background: colorBgContainer, borderBottom: "1px solid #d9d9d9", padding: 0}}>
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} 
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }} />
        </Header>
        <Content style={{ margin: '12px', padding: 16, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG, border:"1px solid #d9d9d9" }} >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout