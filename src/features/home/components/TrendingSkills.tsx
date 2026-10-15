import { AppText } from "@/components/AppText";
import { SectionHeading } from "@/components/SectionHeading";
import { useRouter } from "expo-router";

import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useFetchTrendingSkills } from "../../../../api/hooks/useFetchTrendingSkills";
import {
    Tag,
    TrendingSkillsResponse,
} from "../../../../api/model/trendingSkills-model";
import { useThemeColors } from "../../../../constants/color-pallette";
import { globalStyles } from "../../../../constants/styles";
import TrendingSkillCard from "./TrendingSkillCard";

// Transform once — outside the component or memoized inside
const toTagArray = (resp: TrendingSkillsResponse): Tag[] =>
  Object.entries(resp.tags)
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

export default function TrendingSkills() {
  const router = useRouter();
  const { primary, text: textColor } = useThemeColors();

  const { data, isLoading, isError, error } = useFetchTrendingSkills();

  // Derive tags directly — no extra state needed
  const tags: Tag[] = data ? toTagArray(data as TrendingSkillsResponse) : [];

  return (
    <View>
      {/* ── Header ── */}
      <View style={globalStyles.titleRow}>
        <SectionHeading>Trending Skills</SectionHeading>
        <Pressable onPress={() => router.push("/trendingSkills" as any)}>
          <AppText style={{ color: primary, fontSize: 13 }}>See all</AppText>
        </Pressable>
      </View>

      {/* Lists */}
      <View>
        {/* ── FlatList ── */}
        <FlatList<Tag>
          data={tags}
          keyExtractor={(item) => item.name}
          horizontal // remove if you want a vertical list
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <TrendingSkillCard item={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    // paddingHorizontal: 16,
    gap: 10,
  },
});
