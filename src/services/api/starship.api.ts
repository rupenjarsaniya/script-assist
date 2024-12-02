import { AxiosResponse } from "axios";
import { axiosRequest, getConfig } from "../../utils/axios";
import { API } from "../../utils/constants/api.constants";
import { StarshipData } from "../../types";

export const getAllStarShips = (variable: { page: number }): Promise<AxiosResponse> =>
    axiosRequest(
        getConfig({
            method: "GET",
            suffix: `${API.STARSHIPS}`,
            params: { page: variable.page },
        }),
    );

export const getStarShipById = (variable: { id: string }): Promise<AxiosResponse<StarshipData>> =>
    axiosRequest(
        getConfig({
            method: "GET",
            suffix: `${API.STARSHIPS}/${Number(variable.id)}`,
        }),
    );
