import { useMutation } from "@tanstack/react-query";
import { CLIENT_API } from "../services/client.service";

export const useSendData = <T = any>(
  url: string,
  method: "POST" | "PUT" = "POST"
) =>
  useMutation<T, Error, Record<string | number, any>>({
    mutationFn: async (data) => {
      return await CLIENT_API.sendData<T>({ url, method, data });
    }
  });