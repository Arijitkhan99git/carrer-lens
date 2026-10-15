import { AppText } from "@/components/AppText";
import CommonBookmark from "@/components/CommonBookmark";
import NormalBadge from "@/components/NormalBadge";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Banknote, BriefcaseBusiness } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Match } from "../../../../api/model/matchedJob-model";
import { useThemeColors } from "../../../../constants/color-pallette";
import { useGenericShadow } from "../../../../constants/genericShadowStyle";
import { globalStyles } from "../../../../constants/styles";
import { fonts } from "../../../../constants/typography";

export default function RecommendedCard({ item }: { item: Match }) {
  const router = useRouter();

  const shadowStyle = useGenericShadow(1);

  const { text: textColor, muted } = useThemeColors();

  return (
    <Pressable
      onPress={() => router.push(`/jobDetails/${item.id}` as any)}
      style={[shadowStyle, styles.jobcard]}
    >
      {/* match percentage and bookmark */}
      <View style={[globalStyles.flexRow, { alignSelf: "flex-end" }]}>
        <NormalBadge
          badgeTitle={`${item?.match_score}% Match`}
          lightBgColor="#e2fbfeff"
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
        <View style={{ gap: 4 }}>
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

          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <AppText style={{ color: "gray" }}>{item.company_name}</AppText>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 4,
                backgroundColor: "gray",
              }}
            />
            <AppText style={{ color: "gray" }}>{item.location}</AppText>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 4,
                backgroundColor: "gray",
              }}
            />
            <AppText style={{ color: "gray" }}>{item.experience_level}</AppText>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          marginLeft: 6,
          marginTop: 12,
        }}
      >
        {/* Salary */}
        <View style={styles.statsContainer}>
          <Banknote size={20} color={"gray"} />
          <AppText
            style={{
              fontFamily: fonts.medium,
              color: textColor,
            }}
          >
            {item.salary_min + "K " + `-` + " " + item.salary_max + "K"}
          </AppText>
        </View>

        {/* experience */}
        <View style={styles.statsContainer}>
          <BriefcaseBusiness size={16} color={"gray"} />
          <AppText
            style={{
              fontFamily: fonts.medium,
              color: textColor,
            }}
          >
            {item.job_type}
          </AppText>
        </View>
      </View>

      {/* tags */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 16,
        }}
      >
        {item?.tags?.slice(0, 3)?.map((tag) => {
          return (
            <View
              key={tag}
              style={{
                backgroundColor: muted,
                paddingHorizontal: 7,
                paddingVertical: 3,
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

        {/* items.tags && item.tags.length > 3 */}
        {item?.tags && item.tags.length > 3 && (
          <View
            style={{
              backgroundColor: muted,
              paddingHorizontal: 7,
              paddingVertical: 3,
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
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
