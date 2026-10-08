export const BASE_URL =
  process.env.EXPO_PUBLIC_CAREER_BASE_URL ?? "https://aidevboard.com/api/v1/";

export const API_ENDPOINTS = {
  // Job feed, search (?q=) and filters (?...) all use the same endpoint
  jobs: `${BASE_URL}jobs`,
  jobDetails: (id: string | number) => `${BASE_URL}jobs/${id}`,
  similarJobs: (id: string | number) => `${BASE_URL}jobs/${id}/similar`,
  matchJobs: `${BASE_URL}jobs/match`,

  companies: `${BASE_URL}companies`,
  companyDetails: (slug: string) =>
    `${BASE_URL}companies/${encodeURIComponent(slug)}`,

  tags: `${BASE_URL}tags`,
  stats: `${BASE_URL}stats`,
  salaryTrends: `${BASE_URL}salary-trends`,
} as const;
