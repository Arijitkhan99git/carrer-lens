import { useQuery } from "@tanstack/react-query";
import { jobQueryKey } from "../query-key";
import { fetchSimilarJobs } from "../services/similarJobs-services";

export function useFetchSimilarJobs(id: string | number) {
  return useQuery({
    queryKey: jobQueryKey.similarJobs(String(id)),
    queryFn: () => fetchSimilarJobs(id, 5),
    enabled: !!id,
  });
}
