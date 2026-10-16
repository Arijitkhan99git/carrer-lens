import { createExtendedQueryKeys } from "./query-key-factory";

export const homeQueryKey = createExtendedQueryKeys("home", {
  trendingSkills: () => ["home", "trendingSkills"] as const,
});

export const jobQueryKey = createExtendedQueryKeys("job", {
  jobDetails: (id: string) => ["job", "jobDetails", id] as const,
  similarJobs: (id: string) => ["job", "similarJobs", id] as const,
  searchJobs: (params?: Record<string, any>) =>
    ["job", "searchJobs", params ?? {}] as const,
});

