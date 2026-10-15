import { AxiosResponse } from "axios";
import api from ".";
import { JobDescriptionResponse } from "../model/jobDescription-model";
import { API_ENDPOINTS } from "../url";

export async function fetchJobDescription(id: string | number) {
  const response: AxiosResponse<JobDescriptionResponse> = await api.get(
    API_ENDPOINTS.jobDetails(id),
  );

  return response.data;
}
