import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { API_URL } from "../constants";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor
instance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        }
        return config;
    },
    
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// Add a response interceptor
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },

    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                if (!refreshToken){
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {refreshToken})
                if (response.status === 200) {
                    const { accessToken, refreshToken } = response.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return instance(originalRequest);
                }
            } catch (error) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
)

export default instance;