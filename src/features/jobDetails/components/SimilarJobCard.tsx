import { AppText } from "@/components/AppText";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Banknote, BriefcaseBusiness } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { SimilarJob } from "../../../../api/model/similarJobs-model";
import { useThemeColors } from "../../../../constants/color-pallette";
import { useGenericShadow } from "../../../../constants/genericShadowStyle";
import { fonts } from "../../../../constants/typography";

export default function SimilarJobCard({ item }: { item: SimilarJob }) {
  const router = useRouter();
  const shadowStyle = useGenericShadow(1);
  const { text: textColor, muted } = useThemeColors();

  return (
    <Pressable
      onPress={() => router.push(`/jobDetails/${item.id}` as any)}
      style={[shadowStyle, styles.jobcard]}
    >
      <View style={{ flexDirection: "row", gap: 10, width: "100%", marginTop: 2 }}>
        <Image
          source={item?.company_logo_url}
          contentFit="cover"
          style={styles.companyLogo}
        />

        {/* Company Name + Title + Location */}
        <View style={{ gap: 4, flex: 1 }}>
          <AppText
            numberOfLines={2}
            style={{
              fontFamily: fonts.bold,
              fontSize: 15,
              color: textColor,
              marginRight: 6,
            }}
          >
            {item.title}
          </AppText>

          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <AppText style={{ color: "gray", fontSize: 13 }}>{item.company_name}</AppText>
            <View style={styles.dot} />
            <AppText style={{ color: "gray", fontSize: 13 }}>{item.location}</AppText>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        {/* Salary */}
        <View style={styles.statsContainer}>
          <Banknote size={16} color={"gray"} />
          <AppText style={{ fontFamily: fonts.medium, color: textColor, fontSize: 13 }}>
            {item.salary_min}K – {item.salary_max}K
          </AppText>
        </View>

        {/* Job type */}
        <View style={styles.statsContainer}>
          <BriefcaseBusiness size={14} color={"gray"} />
          <AppText style={{ fontFamily: fonts.medium, color: textColor, fontSize: 13 }}>
            {item.job_type}
          </AppText>
        </View>
      </View>

      {/* tags */}
      <View style={styles.tagsRow}>
        {item?.tags?.slice(0, 3)?.map((tag) => (
          <View key={tag} style={[styles.tag, { backgroundColor: muted }]}>
            <AppText style={{ fontFamily: fonts.medium, color: textColor, fontSize: 12 }}>
              {tag}
            </AppText>
          </View>
        ))}
        {item?.tags && item.tags.length > 3 && (
          <View style={[styles.tag, { backgroundColor: muted }]}>
            <AppText style={{ fontFamily: fonts.medium, color: textColor, fontSize: 12 }}>
              +{item.tags.length - 3}
            </AppText>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  jobcard: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  companyLogo: {
    width: 46,
    height: 46,
    borderRadius: 10,
    overflow: "hidden",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginLeft: 6,
    marginTop: 12,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  tag: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: "gray",
  },
});
