import React, { useEffect } from "react";
import AuthService from "../services/auth.service";

interface IAuthContext {
    currentUser: any;
    role: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    permissions: string[];
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState<any>(null);
    const [permissions, setPermissions] = React.useState<string[]>([]);
    const [role, setRole] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const hasInitialized = React.useRef(false);

    useEffect(() => {
        const initialize = async () => {
            if (hasInitialized.current) return;
            hasInitialized.current = true;

            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                try {
                    const user = await AuthService.getCurrentUser();
                    if (user) {
                        setCurrentUser(user)
                        setRole(user.role);
                        setPermissions(user.permissions);
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
                setIsLoading(false);
            }
        }

        initialize();
    }, [])

    const login = async (username: string, password: string) => {
        try {
            const response = await AuthService.login(username, password);
                localStorage.setItem("accessToken", response.access_token);
                localStorage.setItem("refreshToken", response.refresh_token);
                setCurrentUser(response.user);
                setRole(response.user.role);
                setPermissions(response.user.permissions);
                setIsAuthenticated(true);
                return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    }

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                await AuthService.logout(refreshToken);
            }
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setCurrentUser(null);
            setRole(null);
            setPermissions([]);
            setIsAuthenticated(false);
            return true;
        } catch (error) {
            console.error("Logout error:", error);
            return false;
        }
    }

    const authContextValue = {currentUser, role, isAuthenticated, permissions, isLoading, login, logout};

    return <AuthContext.Provider value={authContextValue}>
        {children}
    </AuthContext.Provider>
}

export {AuthProvider, AuthContext};