import { Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { type FC, type JSX, type ReactNode } from 'react'
import type { TypeRoutes } from '../../routes/type'
import checkPermission from '../../utils/check_permission'
import checkRole from '../../utils/check_role'
import { sidebarRoutes } from '../../routes'
import { Link } from 'react-router-dom'
type MenuProp = {
    key: string,
    icon: ReactNode,
    label: JSX.Element,
    children?: MenuProp[]
}

const createComponent = (Component: React.ComponentType): ReactNode =>  <Component />

const renderMenuItems = (menuItems: TypeRoutes[]): MenuProp[] => {
    return menuItems.map((menuItem: TypeRoutes) => {
        if (menuItem.submenu && menuItem.submenu.length > 0 && menuItem?.config?.isMenu) {
            return ({
                key: menuItem.path,
                icon: menuItem.config.icon && createComponent(menuItem.config.icon),
                label: <span>{menuItem.name}</span>,
                children: renderMenuItems(menuItem.submenu)
            });
        } else if ((checkPermission(menuItem.config.permission) || checkRole(menuItem.config.allowed_roles)) && menuItem?.config?.isMenu) {
            return {
                key: menuItem.path,
                icon: menuItem.config.icon && createComponent(menuItem.config.icon),
                label: <Link to={menuItem.path}>{menuItem.name}</Link>
            }
        }
        return undefined;
    }).filter((item) => item !== undefined);
};


const Sidebar:FC<{collapsed: boolean}> = ({collapsed}) => {
    const {token: { colorBgContainer }} = theme.useToken();
  
    return (
        <Sider width={320} style={{background: colorBgContainer, borderRight: "1px solid #d9d9d9"}} trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical h-16 mb-5" />
            <Menu mode="inline" items={renderMenuItems(sidebarRoutes)}/>
        </Sider>
    )
}

export default Sidebar