import { useQuery } from "@tanstack/react-query";
import { CLIENT_API } from "../services/client.service";

const useGetOneData = <T = any>({ queryKey, url, options, params}: {
    queryKey: Array<string | number | undefined>;
    url: string;
    options?: any;
    params?: Record<string | number, any>;
}) => {
    const response = useQuery<T>({
        queryKey: [...queryKey],
        queryFn: () => CLIENT_API.getOne({ url, params }),
        ...options,
    });

    return { ...response };
};

export default useGetOneData;