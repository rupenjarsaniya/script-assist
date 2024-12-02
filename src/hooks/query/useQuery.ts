import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

interface UseCustomQueryOptions<TData, TError, TVariables = void> {
    queryKey: QueryKey;
    queryFn: (variable: TVariables) => Promise<TData>;
    enabled?: boolean;
    variables?: TVariables;
}

export function useCustomQuery<TData = AxiosResponse, TError = AxiosError, TVariables = void>({
    queryKey,
    queryFn,
    enabled = true,
    variables,
}: UseCustomQueryOptions<TData, TError, TVariables>): UseQueryResult<TData, TError> {
    return useQuery<TData, TError>({
        queryKey: [...queryKey, variables],
        queryFn: () => queryFn(variables as TVariables),
        enabled,
    });
}
