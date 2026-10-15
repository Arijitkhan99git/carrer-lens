import { AxiosResponse } from "axios";
import api from ".";
import { TrendingSkillsResponse } from "../model/trendingSkills-model";
import { API_ENDPOINTS } from "../url";

export async function fetchTrendingSkills() {
  const response: AxiosResponse<TrendingSkillsResponse> = await api.get(
    API_ENDPOINTS.tags,
  );

  return response.data;
}
