import instance from "../config/axios";
import { API_URL } from "../config/constants";

const AuthService = {
    getCurrentUser: async () => {
        const response = await instance.get("/auth/profile");
        return response.data;
    },

    login: async (username: string, password: string) => {
        const response = await instance.post(`${API_URL}/auth/login/`, {
            email: username,
            password
        })
        return response.data;
    },
    
    logout: async (refreshToken: string) => {
        const response = await instance.post(`${API_URL}/auth/logout/`, {
            refresh_token: refreshToken
        })
        return response.data;
    }
}

export default AuthService;