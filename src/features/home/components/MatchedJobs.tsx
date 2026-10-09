import { AppText } from "@/components/AppText";
import { SectionHeading } from "@/components/SectionHeading";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../../constants/color-pallette";
import { globalStyles } from "../../../../constants/styles";
import {
  getStoredJobPreference,
  jobPreferenceAtom,
} from "../../../../store/jobPreference-store";
import RecommendedCard from "./RecommendedCard";

export default function MatchedJobs() {
  const router = useRouter();
  const { primary } = useThemeColors();

  // useAtom returns a [value, setter] tuple — same as useState
  const [jobPreference, setJobPreference] = useAtom(jobPreferenceAtom);

  // Hydrate the atom from AsyncStorage on first mount
  useEffect(() => {
    if (jobPreference !== null) return; // already set by profile screen
    getStoredJobPreference().then((stored) => {
      if (stored) {
        setJobPreference(stored);
      }
    });
  }, []);

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
        {jobPreference?.matches.slice(0, 3).map((item) => (
          <RecommendedCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
