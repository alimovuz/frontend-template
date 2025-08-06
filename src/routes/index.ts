import SignIn from "../pages/auth/login";
import NotFound from "../pages/auth/not-found";
import Dashboard from "../pages/dashboard";
import type { TypeRoutes } from "./type";
import { HomeOutlined } from "@ant-design/icons";

const _routes: Array<TypeRoutes> = [
    {
        name: "Login",
        path: "/login",
        component: SignIn,
        config: {
          permission: "*",
          structure: "nolayout",
          isMenu: false
        }
    }
]

const sidebarRoutes: Array<TypeRoutes> = [
    {
        name: "Dashboard",
        path: "/dashboard",
        component: Dashboard,
        config: {
            permission: "*",
            icon: HomeOutlined,
            structure: 'layout',
            isMenu: true,
            allowed_roles: []
        }
    },
    {
        name: "Not Found",
        path: "/not-found",
        component: NotFound,
        config: {
            permission: "*",
            icon: HomeOutlined,
            structure: 'layout',
            isMenu: false,
            allowed_roles: []
        }
    }
]


export {_routes, sidebarRoutes}