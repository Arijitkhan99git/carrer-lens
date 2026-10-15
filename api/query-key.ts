import { createExtendedQueryKeys } from "./query-key-factory";

export const fetchQueryKey = createExtendedQueryKeys("home", {
  trendingSkills: () => ["home", "trendingSkills"] as const,
});
