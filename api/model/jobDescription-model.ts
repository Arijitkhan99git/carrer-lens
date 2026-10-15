export interface JobDescriptionResponse {
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
  candidate_resume_action: Candidateresumeaction;
}
interface Candidateresumeaction {
  application_authorized: boolean;
  candidate_charge: number;
  endpoint: string;
  job_id_json_path: string;
  method: string;
  preview_requires_identity: boolean;
  required_body_fields: string[];
  requires_explicit_human_review: boolean;
  saved_artifact_protocol: string;
  saved_artifact_requires_verified_human: boolean;
  saved_artifact_tool: string;
  search_requires_identity: boolean;
  status: string;
  submission_performed: boolean;
  uses_candidate_verified_evidence: boolean;
}
