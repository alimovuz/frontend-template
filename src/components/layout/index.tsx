import { Layout, theme } from "antd"
import { Content } from "antd/es/layout/layout"
import { useState, type FC } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import CustomHeader from "./header";

const MainLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
  
  return (
    <Layout style={{minHeight: "100vh"}}>
      <Sidebar collapsed={collapsed}/>
      <Layout>
        <CustomHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content style={{ margin: '12px', padding: 16, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG, border:"1px solid #d9d9d9" }} >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout