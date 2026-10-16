import { AppText } from "@/components/AppText";
import CommonBookmark from "@/components/CommonBookmark";
import NormalBadge from "@/components/NormalBadge";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Banknote, BriefcaseBusiness } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { JobItem } from "../../../../api/model/job-model";
import { Match } from "../../../../api/model/matchedJob-model";
import { useThemeColors } from "../../../../constants/color-pallette";
import { useGenericShadow } from "../../../../constants/genericShadowStyle";
import { globalStyles } from "../../../../constants/styles";
import { fonts } from "../../../../constants/typography";

import { JobDescriptionResponse } from "../../../../api/model/jobDescription-model";

export type JobCardData = (Match | JobItem | JobDescriptionResponse) & {
  match_score?: number;
};

// Deterministic random match % (75-99%) so renders remain pure
function getDeterministicMatchScore(id?: string): number {
  if (!id) return 88;
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 25) + 75;
}

function formatSalary(min?: number, max?: number): string {
  if (!min && !max) return "Not disclosed";
  const toK = (val: number) =>
    val >= 1000 ? `${Math.round(val / 1000)}K` : `${val}K`;
  if (min && max) return `$${toK(min)} – $${toK(max)}`;
  if (min) return `From $${toK(min)}`;
  return `Up to $${toK(max!)}`;
}

export default function RecommendedCard({ item }: { item: JobCardData }) {
  const router = useRouter();
  const shadowStyle = useGenericShadow(1);
  const { text: textColor, card, muted, textSecondary } = useThemeColors();

  const matchScore = item?.match_score ?? getDeterministicMatchScore(item.id);

  return (
    <Pressable
      onPress={() => router.push(`/jobDetails/${item.id}` as any)}
      style={[shadowStyle, styles.jobcard, { backgroundColor: card }]}
    >
      {/* match percentage and bookmark */}
      <View style={[globalStyles.flexRow, { alignSelf: "flex-end" }]}>
        <NormalBadge
          badgeTitle={`${matchScore}% Match`}
          lightBgColor="#d1fddfff"
          lightTextColor="#18A874"
        />
        <CommonBookmark jobId={item.id} />
      </View>

      <View
        style={{ flexDirection: "row", gap: 10, width: "80%", marginTop: 2 }}
      >
        <Image
          source={item?.company_logo_url}
          contentFit="cover"
          style={styles.companyLogo}
        />

        {/* Company Name + Title + Location + Experience */}
        <View style={{ gap: 4, flex: 1 }}>
          <AppText
            numberOfLines={2}
            style={{
              fontFamily: fonts.bold,
              fontSize: 16,
              color: textColor,
              marginRight: 6,
            }}
          >
            {item.title}
          </AppText>

          <View
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {item.company_name ? (
              <AppText style={{ color: textSecondary, fontSize: 13 }}>
                {item.company_name}
              </AppText>
            ) : null}
            {item.location ? (
              <>
                <View style={styles.dot} />
                <AppText style={{ color: textSecondary, fontSize: 13 }}>
                  {item.location}
                </AppText>
              </>
            ) : null}
            {item.experience_level ? (
              <>
                <View style={styles.dot} />
                <AppText
                  style={{
                    color: textSecondary,
                    fontSize: 13,
                    textTransform: "capitalize",
                  }}
                >
                  {item.experience_level}
                </AppText>
              </>
            ) : null}
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
          marginLeft: 6,
          marginTop: 12,
        }}
      >
        {/* Salary */}
        <View style={styles.statsContainer}>
          <Banknote size={18} color={textSecondary} />
          <AppText
            style={{
              fontFamily: fonts.medium,
              color: textColor,
              fontSize: 13,
            }}
          >
            {formatSalary(item.salary_min, item.salary_max)}
          </AppText>
        </View>

        {/* Experience / Job Type */}
        <View style={styles.statsContainer}>
          <BriefcaseBusiness size={16} color={textSecondary} />
          <AppText
            style={{
              fontFamily: fonts.medium,
              color: textColor,
              fontSize: 13,
              textTransform: "capitalize",
            }}
          >
            {item.job_type ?? item.workplace ?? "Full-time"}
          </AppText>
        </View>
      </View>

      {/* tags */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 14,
          alignItems: "center",
        }}
      >
        {item?.tags?.slice(0, 3)?.map((tag) => {
          return (
            <View
              key={tag}
              style={{
                backgroundColor: muted,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <AppText
                style={{
                  fontFamily: fonts.medium,
                  color: textColor,
                  fontSize: 12,
                }}
              >
                {tag}
              </AppText>
            </View>
          );
        })}

        {item?.tags && item.tags.length > 3 && (
          <View
            style={{
              backgroundColor: muted,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <AppText
              style={{
                fontFamily: fonts.medium,
                color: textColor,
                fontSize: 12,
              }}
            >
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
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 16,
    overflow: "hidden",
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f1f3f9",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 3.5,
    backgroundColor: "gray",
  },
});
