export type TrendPeriod = "30D" | "90D" | "1Y";

export interface TrendDataPoint {
  value: number;
  label?: string;
  isHighlighted?: boolean;
}

export interface SalaryTrendPeriodData {
  amount: string;
  change: string;
  isPositive: boolean;
  data: TrendDataPoint[];
}

export const SALARY_TREND_DATA: Record<TrendPeriod, SalaryTrendPeriodData> = {
  "30D": {
    amount: "$185,420",
    change: "+4.2%",
    isPositive: true,
    data: [
      { value: 168000, label: "Oct 01" },
      { value: 170500 },
      { value: 172800 },
      { value: 174900, label: "Oct 10" },
      { value: 177200 },
      { value: 179800, label: "Oct 20" },
      { value: 182400 },
      { value: 185420, label: "Today", isHighlighted: true },
    ],
  },
  "90D": {
    amount: "$185,420",
    change: "+9.8%",
    isPositive: true,
    data: [
      { value: 156000, label: "Aug 01" },
      { value: 161000 },
      { value: 167500, label: "Sep 01" },
      { value: 173000 },
      { value: 179000, label: "Oct 01" },
      { value: 185420, label: "Today", isHighlighted: true },
    ],
  },
  "1Y": {
    amount: "$185,420",
    change: "+18.4%",
    isPositive: true,
    data: [
      { value: 142000, label: "Q1" },
      { value: 153000 },
      { value: 164000, label: "Q2" },
      { value: 172000 },
      { value: 179000, label: "Q3" },
      { value: 185420, label: "Today", isHighlighted: true },
    ],
  },
};

export interface ExperienceSalary {
  level: string;
  salary: string;
  percentage: number;
}

export const SALARY_BY_EXPERIENCE: ExperienceSalary[] = [
  { level: "Junior", salary: "$120K", percentage: 38 },
  { level: "Mid-level", salary: "$165K", percentage: 53 },
  { level: "Senior", salary: "$225K", percentage: 72 },
  { level: "Lead", salary: "$270K", percentage: 87 },
  { level: "Principal", salary: "$310K", percentage: 100 },
];

export interface WorkplaceSlice {
  name: string;
  value: number;
  color: string;
  darkColor: string;
}

export const WORKPLACE_DATA: WorkplaceSlice[] = [
  { name: "Remote", value: 61, color: "#3568F5", darkColor: "#5B82FF" },
  { name: "Hybrid", value: 24, color: "#60A5FA", darkColor: "#7194FF" },
  { name: "On-site", value: 15, color: "#BFDBFE", darkColor: "#3B4E7A" },
];

export interface MarketOverviewStat {
  id: string;
  label: string;
  value: string;
  badgeText: string;
  badgeType: "success" | "neutral";
  iconType: "briefcase" | "salary" | "zap" | "globe";
}

export const MARKET_OVERVIEW_STATS: MarketOverviewStat[] = [
  {
    id: "active_jobs",
    label: "Active Jobs",
    value: "7,477",
    badgeText: "+4.2% ↑",
    badgeType: "success",
    iconType: "briefcase",
  },
  {
    id: "avg_salary",
    label: "Average Salary",
    value: "$185K",
    badgeText: "+3.1% ↑",
    badgeType: "success",
    iconType: "salary",
  },
  {
    id: "new_today",
    label: "New Today",
    value: "565",
    badgeText: "+12% ↑",
    badgeType: "success",
    iconType: "zap",
  },
  {
    id: "remote_jobs",
    label: "Remote Jobs",
    value: "61%",
    badgeText: "Global",
    badgeType: "neutral",
    iconType: "globe",
  },
];
