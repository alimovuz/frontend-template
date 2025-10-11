import type { AxiosResponse } from "axios";
import instance from "../config/axios";

type TypeGetAll = <T>({ url, params }: {url: string, params?: Record<string | number, any> }) => Promise<T>
type TypeGetOne = <T>({ url, params}: {url: string, params?: Record<string | number, any>}) => Promise<T>
type TypeSendType = <T>({ url, data, method}: {url: string, data: Record<string | number, any>, method: "POST" | "PUT" }) => Promise<T>

const getAll: TypeGetAll = async ({url, params}) => {
    const response = await instance({url, method: "GET", params});
    return response.data;
}

const getOne: TypeGetOne = async ({ url, params }) => {
    const response = await instance({ url, method: "GET", params })
    const data = await response.data;
    return data;
}

const sendData: TypeSendType = async ({ url, method = "POST", data}) => {
    const response = await instance({ url, method, data });
    return response?.data;
}

const deleteData = async (url: string, id: number | string, data?: any): Promise<AxiosResponse> => {
    const response = await instance(data ? { url: `${url}/${id}`, method: "DELETE", data: data } : { url: `${url}/${id}`, method: "DELETE" });
    return response
}

export const CLIENT_API = {getAll, getOne, deleteData, sendData };