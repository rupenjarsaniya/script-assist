import { AxiosResponse } from "axios";
import { axiosRequest, getConfig } from "../../utils/axios";
import { API } from "../../utils/constants/api.constants";
import { GetAllStarShipsVariables, GetStarShipByIdVariables, StarshipData, StarshipResponse } from "../../types";

export const getAllStarShips = (variable: GetAllStarShipsVariables): Promise<AxiosResponse<StarshipResponse>> =>
    axiosRequest(
        getConfig({
            method: "GET",
            suffix: `${API.STARSHIPS}`,
            params: { page: variable.page },
        }),
    );

export const getStarShipById = (variable: GetStarShipByIdVariables): Promise<AxiosResponse<StarshipData>> =>
    axiosRequest(
        getConfig({
            method: "GET",
            suffix: `${API.STARSHIPS}/${variable.id}`,
        }),
    );
