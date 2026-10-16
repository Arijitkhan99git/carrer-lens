export interface SimilarJob {
  id: string;
  title: string;
  slug: string;
  description: string;
  salary_min: number;
  salary_max: number;
  location: string;
  workplace: string;
  remote_scope: string;
  job_type: string;
  experience_level: string;
  tags: string[];
  apply_url: string;
  company_name: string;
  company_slug: string;
  company_logo_url: string;
  quality_score: number;
  url: string;
  published_at: string;
}

export type SimilarJobsResponse = SimilarJob[];
