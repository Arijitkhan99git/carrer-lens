import { atom } from "jotai";

export type WorkplaceOption = "all" | "remote" | "hybrid" | "onsite";
export type ExperienceLevelOption =
  | "all"
  | "junior"
  | "mid"
  | "senior"
  | "lead"
  | "principal";
export type JobTypeOption =
  | "all"
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance";

export interface SearchFilterState {
  salaryMin?: number;
  salaryMax?: number;
  workplace: WorkplaceOption;
  level: ExperienceLevelOption;
  jobType: JobTypeOption;
}

export const initialSearchFilterState: SearchFilterState = {
  salaryMin: undefined,
  salaryMax: undefined,
  workplace: "all",
  level: "all",
  jobType: "all",
};

export const searchFilterAtom = atom<SearchFilterState>(
  initialSearchFilterState,
);

export const activeFilterCountAtom = atom((get) => {
  const filters = get(searchFilterAtom);
  let count = 0;
  if (filters.salaryMin !== undefined && filters.salaryMin > 0) count++;
  if (filters.workplace !== "all") count++;
  if (filters.level !== "all") count++;
  if (filters.jobType !== "all") count++;
  return count;
});

export const resetSearchFilterAtom = atom(null, (_get, set) => {
  set(searchFilterAtom, initialSearchFilterState);
});
