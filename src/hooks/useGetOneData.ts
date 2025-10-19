import { useQuery } from "@tanstack/react-query";
import { CLIENT_API } from "../services/client.service";

import type { QueryOptions } from '@tanstack/react-query';

type TGeneralQueryOptions = QueryOptions & {
	enabled?: boolean;
};


const useGetOneData = <T = any>({ queryKey, url, options, params}: {
    queryKey: Array<string | number | undefined>;
    url: string;
    options?: any; // `TGeneralQueryOptions` I think you can use this type instead of any type here.
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
