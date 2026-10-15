export interface TrendingSkillsResponse {
  degraded: boolean;
  tags: Record<string, number>;
}
// Shape that's easier to render in a FlatList / chip list
export interface Tag {
  name: string;
  count: number;
}
