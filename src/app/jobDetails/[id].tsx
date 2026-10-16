import { AppText } from "@/components/AppText";
import CommonBookmark from "@/components/CommonBookmark";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ArrowLeft,
    Banknote,
    BriefcaseBusiness,
    CheckCircle2,
    ChevronRight,
    Clock,
    MapPin,
    Share2,
    Sparkles,
} from "lucide-react-native";
import {
    ActivityIndicator,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFetchJobDetails } from "../../../api/hooks/useFetchJobDetails";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";

// Deterministic match % (70–99%) based on job ID to keep render pure and stable
function getMatchScore(id?: string): number {
  if (!id) return 85;
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 30) + 70;
}

export default function JobDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    background,
    card,
    text: textColor,
    textSecondary,
    primary,
    primaryText,
    border,
    muted,
  } = useThemeColors();

  const { data, isLoading, isError } = useFetchJobDetails(String(id));
  const matchScore = getMatchScore(id);

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: background }]}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={[styles.centered, { backgroundColor: background }]}>
        <AppText style={{ color: textColor }}>
          Failed to load job details.
        </AppText>
      </View>
    );
  }

  const salaryLabel =
    data.salary_min && data.salary_max
      ? `$${data.salary_min}K–$${data.salary_max}K`
      : "Not disclosed";

  // Parse description into sections: "About the Role" and "Key Responsibilities"
  const descLines = data.description
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Heuristic: bullet-like lines start with -, •, *, or digits
  const bulletLines = descLines.filter((l) => /^[-•*\d]/.test(l));
  const paragraphLines = descLines.filter((l) => !/^[-•*\d]/.test(l));
  const aboutText = paragraphLines.slice(0, 3).join(" ");

  return (
    <View style={[styles.screen, { backgroundColor: background }]}>
      {/* ── Fixed Header ── */}
      <View
        style={[
          styles.header,
          {
            // paddingTop: insets.top + 8,
            borderBottomColor: border,
            backgroundColor: background,
          },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <ArrowLeft size={22} color={textColor} />
        </Pressable>
        <AppText style={[styles.headerTitle, { color: textColor }]}>
          Job Details
        </AppText>
        <View style={styles.headerRight}>
          <Pressable
            style={styles.iconBtn}
            onPress={() => Linking.openURL(data.url)}
          >
            <Share2 size={20} color={textColor} />
          </Pressable>
          {/* <Pressable style={styles.iconBtn}>
            <Bookmark size={20} color={textColor} />
          </Pressable> */}

          <CommonBookmark jobId={data.id} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: 110 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero card ── */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: card, borderColor: border },
          ]}
        >
          {/* Logo + title + match */}
          <View style={styles.heroTop}>
            <Image
              source={data.company_logo_url}
              contentFit="cover"
              style={styles.logo}
            />
            <View style={styles.heroTitleBlock}>
              <AppText
                numberOfLines={2}
                style={[styles.jobTitle, { color: textColor }]}
              >
                {data.title}
              </AppText>
              <AppText style={[styles.companyName, { color: textSecondary }]}>
                {data.company_name}
              </AppText>
              <View style={styles.locationRow}>
                <MapPin size={13} color={textSecondary} />
                <AppText
                  style={[styles.locationText, { color: textSecondary }]}
                >
                  {data.location}
                  {data.workplace ? ` · ${data.workplace}` : ""}
                </AppText>
              </View>
            </View>
            {/* Match badge */}
            <View style={[styles.matchBadge, { backgroundColor: "#d1fddfff" }]}>
              <AppText style={[styles.matchText, { color: "#226435ff" }]}>
                {matchScore}% Match
              </AppText>
            </View>
          </View>

          {/* Stats row */}
          <View style={[styles.statsCard, { backgroundColor: muted }]}>
            <View style={styles.statItem}>
              <Banknote size={18} color={textSecondary} />
              <AppText style={[styles.statValue, { color: textColor }]}>
                {salaryLabel}
              </AppText>
              <AppText style={[styles.statLabel, { color: textSecondary }]}>
                Base Salary
              </AppText>
            </View>
            <View style={[styles.statDivider, { backgroundColor: border }]} />
            <View style={styles.statItem}>
              <Clock size={18} color={textSecondary} />
              <AppText style={[styles.statValue, { color: textColor }]}>
                {data.experience_level}
              </AppText>
              <AppText style={[styles.statLabel, { color: textSecondary }]}>
                Experience
              </AppText>
            </View>
            <View style={[styles.statDivider, { backgroundColor: border }]} />
            <View style={styles.statItem}>
              <BriefcaseBusiness size={18} color={textSecondary} />
              <AppText style={[styles.statValue, { color: textColor }]}>
                {data.job_type}
              </AppText>
              <AppText style={[styles.statLabel, { color: textSecondary }]}>
                Employment
              </AppText>
            </View>
          </View>
        </View>

        {/* ── Skills Required ── */}
        {data.tags && data.tags.length > 0 && (
          <View style={styles.section}>
            <AppText style={[styles.sectionTitle, { color: textColor }]}>
              Skills Required
            </AppText>
            <View style={styles.tagsRow}>
              {data.tags.map((tag) => (
                <View
                  key={tag}
                  style={[
                    styles.tag,
                    { backgroundColor: muted, borderColor: border },
                  ]}
                >
                  <AppText style={[styles.tagText, { color: textColor }]}>
                    {tag}
                  </AppText>
                </View>
              ))}
              {/* {data.tags.length > 4 && (
                <View
                  style={[
                    styles.tag,
                    { backgroundColor: muted, borderColor: border },
                  ]}
                >
                  <AppText style={[styles.tagText, { color: textSecondary }]}>
                    +{data.tags.length - 4} more
                  </AppText>
                </View>
              )} */}
            </View>
          </View>
        )}

        {/* ── About the Role ── */}
        {aboutText ? (
          <View style={styles.section}>
            <AppText style={[styles.sectionTitle, { color: textColor }]}>
              About the Role
            </AppText>
            <AppText style={[styles.bodyText, { color: textSecondary }]}>
              {aboutText}
            </AppText>
          </View>
        ) : null}

        {/* ── Key Responsibilities ── */}
        {bulletLines.length > 0 && (
          <View style={styles.section}>
            <AppText style={[styles.sectionTitle, { color: textColor }]}>
              Key Responsibilities
            </AppText>
            <View style={{ gap: 10 }}>
              {bulletLines.slice(0, 6).map((line, i) => (
                <View key={i} style={styles.bulletRow}>
                  <CheckCircle2
                    size={16}
                    color={primary}
                    style={{ marginTop: 2 }}
                  />
                  <AppText
                    style={[styles.bulletText, { color: textSecondary }]}
                  >
                    {line.replace(/^[-•*\d.]\s*/, "")}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── Similar Jobs banner ── */}
        <Pressable
          onPress={() => router.push(`/similarJobs/${id}` as any)}
          style={[
            styles.similarBanner,
            { backgroundColor: card, borderColor: border },
          ]}
        >
          <View style={[styles.similarIcon, { backgroundColor: muted }]}>
            <Sparkles size={18} color={primary} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText style={[styles.similarTitle, { color: textColor }]}>
              Similar Jobs
            </AppText>
            <AppText style={[styles.similarSub, { color: textSecondary }]}>
              Explore more roles at {data.company_name}
            </AppText>
          </View>
          <ChevronRight size={20} color={textSecondary} />
        </Pressable>
      </ScrollView>

      {/* ── Sticky Apply Button ── */}
      <View
        style={[
          styles.applyBar,
          {
            paddingBottom: insets.bottom + 12,
            backgroundColor: background,
            borderTopColor: border,
          },
        ]}
      >
        <Pressable
          style={[styles.applyBtn, { backgroundColor: primary }]}
          onPress={() => data.apply_url && Linking.openURL(data.apply_url)}
        >
          <AppText style={[styles.applyText, { color: primaryText }]}>
            Apply Now →
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  scroll: { padding: 16, gap: 16 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginLeft: 12,
  },
  headerRight: { flexDirection: "row", gap: 4 },
  iconBtn: { padding: 8, borderRadius: 20 },

  // Hero
  heroCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    gap: 16,
  },
  heroTop: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  logo: { width: 52, height: 52, borderRadius: 12, overflow: "hidden" },
  heroTitleBlock: { flex: 1, gap: 3 },
  jobTitle: { fontFamily: fonts.bold, fontSize: 16, lineHeight: 22 },
  companyName: { fontFamily: fonts.semibold, fontSize: 13 },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  locationText: { fontSize: 12 },
  matchBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  matchText: { fontFamily: fonts.semibold, fontSize: 12 },

  // Stats
  statsCard: {
    flexDirection: "row",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    // alignItems: "center",
  },
  statItem: { flex: 1, alignItems: "center", gap: 3 },
  statValue: { fontFamily: fonts.bold, fontSize: 13, textAlign: "center" },
  statLabel: { fontSize: 11, textAlign: "center" },
  statDivider: { width: 1, height: 36 },

  // Sections
  section: { gap: 10 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 16 },
  bodyText: { fontSize: 14, lineHeight: 22 },

  // Bullets
  bulletRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  bulletText: { flex: 1, fontSize: 14, lineHeight: 21 },

  // Tags
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: { fontFamily: fonts.medium, fontSize: 13 },

  // Similar jobs
  similarBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  similarIcon: { padding: 10, borderRadius: 12 },
  similarTitle: { fontFamily: fonts.bold, fontSize: 14 },
  similarSub: { fontSize: 12, marginTop: 2 },

  // Apply bar
  applyBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  applyBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: { fontFamily: fonts.bold, fontSize: 16, letterSpacing: 0.3 },
});
