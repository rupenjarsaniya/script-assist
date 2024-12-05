import { AxiosResponse } from "axios";
import { axiosRequest, getConfig } from "../../utils/axios";
import { API } from "../../utils/constants/api.constants";
import { FilmData, GetFilmByIdVariable } from "../../types";

export const getFilmById = (variable: GetFilmByIdVariable): Promise<AxiosResponse<FilmData>> =>
    axiosRequest(
        getConfig({
            method: "GET",
            suffix: `${API.FILM}/${variable.id}`,
        }),
    );
