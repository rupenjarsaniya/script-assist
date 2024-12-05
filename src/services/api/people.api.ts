import { AxiosResponse } from "axios";
import { axiosRequest, getConfig } from "../../utils/axios";
import { API } from "../../utils/constants/api.constants";
import { GetPeopleByIdVariable, PeopleData } from "../../types";

export const getPeopleById = (variable: GetPeopleByIdVariable): Promise<AxiosResponse<PeopleData>> =>
    axiosRequest(
        getConfig({
            method: "GET",
            suffix: `${API.PEOPLE}/${variable.id}`,
        }),
    );
