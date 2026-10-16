import { AppText } from "@/components/AppText";
import { Image } from "expo-image";
import { useAtomValue } from "jotai";
import { Bookmark, Sparkles } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../../../../constants/color-pallette";
import { fonts } from "../../../../constants/typography";
import { UserProfileData } from "../../../../store/profileData-store";
import { savedIdsAtom } from "../../../../store/saved-store";

const PROFILE_IMAGE_URL =
  "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-in-shirt-smiles-and-gives-thumbs-up-to-show-approval-png-image_13146336.png";

interface ProfileHeaderProps {
  profile: UserProfileData;
  onEditPress: () => void;
  savedCount?: number;
}

export function ProfileHeader({
  profile,
  onEditPress,
  savedCount: propSavedCount,
}: ProfileHeaderProps) {
  const colors = useThemeColors();
  const isDark = colors.isDarkMode;
  const savedIds = useAtomValue(savedIdsAtom);

  const savedCount =
    propSavedCount !== undefined
      ? propSavedCount
      : savedIds.length > 0
        ? savedIds.length
        : 12;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <AppText style={[styles.headerTitle, { color: colors.text }]}>
            My Profile
          </AppText>
          <AppText
            style={[styles.headerSubtitle, { color: colors.textSecondary }]}
          >
            Profile visibility & matching attributes
          </AppText>
        </View>

        <TouchableOpacity
          onPress={onEditPress}
          activeOpacity={0.7}
          style={[
            styles.editButton,
            {
              backgroundColor: isDark
                ? "rgba(91, 130, 255, 0.16)"
                : "#EEF2FF",
            },
          ]}
        >
          <AppText
            style={[
              styles.editButtonText,
              { color: isDark ? colors.primary : "#3568F5" },
            ]}
          >
            Edit
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        {/* Avatar with cyan ring and active green indicator */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarRing}>
            <Image
              source={PROFILE_IMAGE_URL}
              style={styles.avatarImage}
              contentFit="cover"
            />
          </View>
          <View
            style={[
              styles.onlineBadge,
              {
                borderColor: colors.card,
              },
            ]}
          />
        </View>

        {/* Name & Designation */}
        <AppText style={[styles.userName, { color: colors.text }]}>
          {profile.name}
        </AppText>
        <AppText
          style={[styles.userDesignation, { color: colors.textSecondary }]}
        >
          {profile.designation}
        </AppText>

        {/* Job Status Pill */}
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: isDark
                ? "rgba(54, 201, 148, 0.15)"
                : "#DCFCE7",
            },
          ]}
        >
          <View style={styles.statusDot} />
          <AppText
            style={[
              styles.statusText,
              {
                color: isDark ? "#36C994" : "#15803D",
              },
            ]}
          >
            {profile.status}
          </AppText>
        </View>
      </View>

      {/* Stat Cards: Saved Jobs & Top Match */}
      <View style={styles.statsRow}>
        {/* Saved Jobs Card */}
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.statCardHeader}>
            <AppText style={[styles.statCardTitle, { color: colors.text }]}>
              Saved Jobs
            </AppText>
            <Bookmark size={18} color="#3568F5" />
          </View>
          <View style={styles.statCardValueRow}>
            <AppText style={[styles.statCardValue, { color: colors.text }]}>
              {savedCount}
            </AppText>
            <AppText style={styles.statCardDelta}>+3 this wk</AppText>
          </View>
        </View>

        {/* Top Match Card */}
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.statCardHeader}>
            <AppText style={[styles.statCardTitle, { color: colors.text }]}>
              Top Match
            </AppText>
            <Sparkles size={18} color="#059669" />
          </View>
          <View style={styles.statCardValueRow}>
            <AppText style={[styles.statCardValue, { color: "#059669" }]}>
              94%
            </AppText>
            <AppText
              style={[
                styles.statCardSubtext,
                { color: colors.textSecondary },
              ]}
            >
              Anthropic
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 4,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: fonts.bold,
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
    marginTop: 2,
  },
  editButton: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
  profileCard: {
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 14,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatarRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 3.5,
    borderColor: "#38BDF8", // Cyan / sky blue ring matching design
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  onlineBadge: {
    position: "absolute",
    bottom: 2,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#059669",
    borderWidth: 2.5,
  },
  userName: {
    fontSize: 22,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  userDesignation: {
    fontSize: 14,
    fontFamily: fonts.medium,
    textAlign: "center",
    marginTop: 4,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 12,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontFamily: fonts.semibold,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  statCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statCardTitle: {
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
  statCardValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 14,
  },
  statCardValue: {
    fontSize: 28,
    fontFamily: fonts.bold,
    letterSpacing: -0.5,
  },
  statCardDelta: {
    fontSize: 12,
    fontFamily: fonts.semibold,
    color: "#16A34A",
    marginLeft: 8,
  },
  statCardSubtext: {
    fontSize: 13,
    fontFamily: fonts.medium,
    marginLeft: 8,
  },
});
