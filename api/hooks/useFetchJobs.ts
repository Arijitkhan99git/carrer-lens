import { useQuery } from "@tanstack/react-query";
import { FetchJobsParams } from "../model/job-model";
import { jobQueryKey } from "../query-key";
import { fetchJobs } from "../services/jobs-services";

export function useFetchJobs(params?: FetchJobsParams) {
  return useQuery({
    queryKey: jobQueryKey.searchJobs(params),
    queryFn: () => fetchJobs(params),
  });
}
