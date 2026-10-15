import { AppText } from "@/components/AppText";
import { SectionHeading } from "@/components/SectionHeading";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { Pressable, View } from "react-native";
import { useThemeColors } from "../../../../constants/color-pallette";
import { globalStyles } from "../../../../constants/styles";
import { jobPreferenceAtom } from "../../../../store/jobPreference-store";
import RecommendedCard from "./RecommendedCard";

export default function MatchedJobs() {
  const router = useRouter();
  const { primary } = useThemeColors();

  const jobPreference = useAtomValue(jobPreferenceAtom);

  return (
    <View>
      {/* ── Header ── */}
      <View style={globalStyles.titleRow}>
        <SectionHeading>Recommended Jobs</SectionHeading>
        <Pressable onPress={() => router.push("/recommendedJobs" as any)}>
          <AppText style={{ color: primary, fontSize: 13 }}>See all</AppText>
        </Pressable>
      </View>

      <View style={{ gap: 12, paddingVertical: 4 }}>
        {jobPreference?.matches.slice(0, 6).map((item) => (
          <RecommendedCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}
