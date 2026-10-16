import { AxiosResponse } from "axios";
import api from ".";
import { SimilarJobsResponse } from "../model/similarJobs-model";
import { API_ENDPOINTS } from "../url";

export async function fetchSimilarJobs(
  id: string | number,
  limit: number = 5,
) {
  const response: AxiosResponse<SimilarJobsResponse> = await api.get(
    API_ENDPOINTS.similarJobs(id),
    { params: { limit } },
  );

  return response.data;
}
