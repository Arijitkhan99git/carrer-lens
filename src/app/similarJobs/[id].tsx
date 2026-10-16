import { AppText } from "@/components/AppText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from "react-native";
import { useFetchSimilarJobs } from "../../../api/hooks/useFetchSimilarJobs";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import SimilarJobCard from "../../features/jobDetails/components/SimilarJobCard";

export default function SimilarJobsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { background, text: textColor, border } = useThemeColors();

  const { data, isLoading } = useFetchSimilarJobs(String(id));

  return (
    <View style={[styles.screen, { backgroundColor: background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={22} color={textColor} />
        </Pressable>
        <AppText style={[styles.headerTitle, { color: textColor }]}>
          Similar Jobs
        </AppText>
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <SimilarJobCard item={item} />}
          ListEmptyComponent={
            <View style={styles.centered}>
              <AppText style={{ color: textColor }}>No similar jobs found.</AppText>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontFamily: fonts.bold, fontSize: 18 },
  list: { padding: 16, gap: 12 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
});
