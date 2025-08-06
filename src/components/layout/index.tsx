import { Button, Layout, Menu, theme } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { useState, type FC } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
  return (
    <Layout style={{minHeight: "100vh"}}>
      <Sider width={320} style={{background: colorBgContainer, borderRight: "1px solid #d9d9d9"}} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[]}
        />
      </Sider>
      <Layout>
        <Header style={{background: colorBgContainer, borderBottom: "1px solid #d9d9d9", padding: 0}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '12px',
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            border:"1px solid #d9d9d9"
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout