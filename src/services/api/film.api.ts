import { AxiosResponse } from "axios";
import { axiosRequest, getConfig } from "../../utils/axios";
import { API } from "../../utils/constants/api.constants";

export const getFilmById = (variable: { id: string }): Promise<AxiosResponse> =>
    axiosRequest(
        getConfig({
            method: "GET",
            suffix: `${API.FILM}/${variable.id}`,
        }),
    );
