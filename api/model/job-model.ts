export interface JobItem {
  id: string;
  company_id: string;
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
  is_featured: boolean;
  is_sticky: boolean;
  status: string;
  published_at: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
  company_name: string;
  company_slug: string;
  company_logo_url: string;
  quality_score: number;
  url: string;
  match_score?: number;
}

export interface JobsResponse {
  jobs: JobItem[];
  page: number;
  per_page: number;
  total: number;
  total_is_exact: boolean;
  total_pages: number;
}

export interface FetchJobsParams {
  q?: string;
  tags?: string;
  type?: string;
  level?: string;
  location?: string;
  workplace?: string;
  salary_min?: number;
  salary_max?: number;
  page?: number;
  limit?: number;
}
