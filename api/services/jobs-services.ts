import { AxiosResponse } from "axios";
import api from ".";
import { FetchJobsParams, JobsResponse } from "../model/job-model";
import { API_ENDPOINTS } from "../url";

export async function fetchJobs(
  params?: FetchJobsParams,
): Promise<JobsResponse> {
  const queryParams: Record<string, any> = {
    limit: params?.limit ?? 15,
  };

  if (params?.q?.trim()) queryParams.q = params.q.trim();
  if (params?.tags?.trim()) queryParams.tags = params.tags.trim();
  if (params?.type && params.type !== "all") queryParams.type = params.type;
  if (params?.level && params.level !== "all") queryParams.level = params.level;
  if (params?.location?.trim()) queryParams.location = params.location.trim();
  if (params?.workplace && params.workplace !== "all") {
    queryParams.workplace = params.workplace;
  }
  if (params?.salary_min !== undefined && params.salary_min > 0) {
    queryParams.salary_min = params.salary_min;
  }
  if (params?.salary_max !== undefined && params.salary_max > 0) {
    queryParams.salary_max = params.salary_max;
  }
  if (params?.page) queryParams.page = params.page;

  const response: AxiosResponse<JobsResponse> = await api.get(
    API_ENDPOINTS.jobs,
    {
      params: queryParams,
    },
  );

  return response.data;
}
