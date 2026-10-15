import { useQuery } from "@tanstack/react-query";
import { homeQueryKey } from "../query-key";
import { fetchTrendingSkills } from "../services/trendingSkills-services";

export function useFetchTrendingSkills() {
  return useQuery({
    queryKey: homeQueryKey.trendingSkills(),
    queryFn: fetchTrendingSkills,
  });
}
