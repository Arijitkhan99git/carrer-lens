import { useQuery } from "@tanstack/react-query";
import { fetchQueryKey } from "../query-key";
import { fetchTrendingSkills } from "../services/trendingSkills-services";

export function useFetchTrendingSkills() {
  return useQuery({
    queryKey: fetchQueryKey.trendingSkills(),
    queryFn: fetchTrendingSkills,
  });
}
