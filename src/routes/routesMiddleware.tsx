import { type ReactNode } from "react";
import type { TypeRoutes } from "./type";
import { _routes, sidebarRoutes } from ".";
import checkPermission from "../utils/check_permission";
import checkRole from "../utils/check_role";
import { createBrowserRouter, Navigate, RouterProvider, type RouteObject } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SignIn from "../pages/auth/login";
import MainLayout from "../components/layout";

const createComponent = (Component: React.ComponentType): ReactNode =>  <Component />

const createRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return [
            {
                element: <MainLayout />,
                children: [
                    ...sidebarRoutes.flatMap((route: TypeRoutes) => {
                        const routes: RouteObject[] = [];

                        if (route.submenu?.length && route.config.structure === "layout") {
                            const subRoutes = route.submenu.filter((subRoute: TypeRoutes) => {
                            return checkPermission(subRoute.config.permission) || checkRole(subRoute.config.allowed_roles);
                            }).map((subRoute: TypeRoutes) => ({
                            path: subRoute.path,
                            element: createComponent(subRoute.component),
                        }));
                        routes.push(...subRoutes);
                        }
                        
                        if (checkPermission(route.config.permission) || checkRole(route.config.allowed_roles)) {
                            routes.push({
                                path: route.path,
                                element: createComponent(route.component),
                            });
                        }

                        return routes;
                    }),
                    {
                        path: "/",
                        element: <Navigate to="/dashboard" replace />,
                    },
                    {
                        path: "*",
                        element: <Navigate to="/not-found" replace />,
                    },
                ]
            },
        ]
    }

    // Autentifikatsiya bo'lmagan holat
    return [
    ..._routes.map((route) => ({
        path: route.path,
        element: createComponent(route.component),
    })),
    {
      path: "*",
      element: createComponent(SignIn),
    },
    ];
}

const RoutesMiddleware = () => {
  const { isAuthenticated } = useAuth();

  const router = createBrowserRouter(createRoutes(isAuthenticated));

  return <RouterProvider router={router} />;
};

export default RoutesMiddleware