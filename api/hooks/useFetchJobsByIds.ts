import { useQueries } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { JobDescriptionResponse } from "../model/jobDescription-model";
import { jobQueryKey } from "../query-key";
import { fetchJobDescription } from "../services/jobDescription-services";

export function useFetchJobsByIds(ids: string[]) {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: jobQueryKey.jobDetails(String(id)),
      queryFn: () => fetchJobDescription(id),
      enabled: !!id,
      ...QUERY_CONFIG.default,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const error = queries.find((q) => q.error)?.error ?? null;

  // Flatten all fetched job details into an array
  const jobs: JobDescriptionResponse[] = queries
    .map((q) => q.data)
    .filter((job): job is JobDescriptionResponse => Boolean(job));

  return { jobs, isLoading, isError, error };
}
