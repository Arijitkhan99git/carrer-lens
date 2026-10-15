import { useQuery } from "@tanstack/react-query";
import { jobQueryKey } from "../query-key";
import { fetchJobDescription } from "../services/jobDescription-services";

export function useFetchJobDetails(id: string | number) {
  return useQuery({
    queryKey: jobQueryKey.jobDetails(String(id)),
    queryFn: () => fetchJobDescription(id),
  });
}
