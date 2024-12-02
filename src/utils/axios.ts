import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "./constants/api.constants";

type HeadersType = {
    "Content-Type": string;
    Authorization: string;
};

type ConfigType<T = unknown> = {
    method: "GET" | "POST" | "PATCH" | "DELETE";

    suffix?: string;
    body?: T;
    requestHeaders?: Partial<HeadersType>;
    customBaseUrl?: string;
    params?: object;
    userId?: string;
};

export const getHeader = (): HeadersType => ({
    "Content-Type": "application/json",
    Authorization: `Bearer token`,
});

export const getConfig = <T = unknown>({
    method,
    suffix = "",
    body = {} as T,
    params = {},
    requestHeaders,
    customBaseUrl,
}: ConfigType<T>): AxiosRequestConfig<T> => {
    const config: AxiosRequestConfig<T> = {
        method,
        url: `${customBaseUrl || API.BASE + suffix}`,
        headers: requestHeaders || getHeader(),
        params,
    };

    if (method === "POST" || method === "PATCH" || method === "DELETE") {
        config.data = body;
    }

    return config;
};

export const axiosRequest = <T = unknown, R = AxiosResponse<T>>(config: AxiosRequestConfig<T>): Promise<R> =>
    axios.request<T, R>(config);
