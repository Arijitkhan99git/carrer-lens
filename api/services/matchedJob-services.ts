import { AxiosResponse } from "axios";
import api from ".";
import { MatchedJobResponse } from "../model/matchedJob-model";
import { API_ENDPOINTS } from "../url";

export async function fetchMatchedJobs(payload: {
  skills: string[];
  salary_min?: number;
  salary_max?: number;
  workplace?: string;
  level?: string;
  limit?: number;
}) {
  const response: AxiosResponse<MatchedJobResponse> = await api.post(
    API_ENDPOINTS.matchJobs,
    payload,
  );

  return response.data;
}
