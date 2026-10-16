import { AppText } from "@/components/AppText";
import { EmptySearchState } from "@/components/EmptySearchState";
import RecommendedCard from "@/features/home/components/RecommendedCard";
import FilterModal from "@/features/search/components/FilterModal";
import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { useRouter } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import {
  Bookmark,
  ChevronDown,
  Compass,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useFetchJobsByIds } from "../../../api/hooks/useFetchJobsByIds";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import { savedIdsAtom } from "../../../store/saved-store";
import {
  activeSavedFilterCountAtom,
  resetSavedFilterAtom,
  savedFilterAtom,
} from "../../../store/searchFilter-store";

const SORT_OPTIONS = ["Recently Saved", "Best Match", "Highest Salary"];

// Pure deterministic random score for Best Match sorting
function getScore(id?: string): number {
  if (!id) return 88;
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 25) + 75;
}

export default function SavedScreen() {
  const router = useRouter();
  const screenSafeArea = useScreenSafeArea();
  const shadowStyle = useGenericShadow(1);
  const {
    background,
    card,
    text: textColor,
    textSecondary,
    primary,
    primaryText,
    border,
    muted,
    surfaceSecondary,
  } = useThemeColors();

  // Read saved job IDs from Jotai store
  const savedIds = useAtomValue(savedIdsAtom);

  // Fetch full job details from the API for all saved IDs using useQueries
  const { jobs, isLoading } = useFetchJobsByIds(savedIds);

  // Search input & debounced search
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Jotai Filter Store for Saved tab
  const filterState = useAtomValue(savedFilterAtom);
  const activeFilterCount = useAtomValue(activeSavedFilterCountAtom);
  const resetFilters = useSetAtom(resetSavedFilterAtom);

  // Modals state
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Recently Saved");

  // Debounce input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Filter & Search saved jobs
  const filteredJobs = useMemo(() => {
    let result = jobs || [];

    // Search query filter
    if (debouncedQuery) {
      result = result.filter((job) => {
        const titleMatch = job.title?.toLowerCase().includes(debouncedQuery);
        const companyMatch = job.company_name
          ?.toLowerCase()
          .includes(debouncedQuery);
        const locationMatch = job.location
          ?.toLowerCase()
          .includes(debouncedQuery);
        const tagMatch = job.tags?.some((t) =>
          t.toLowerCase().includes(debouncedQuery),
        );
        return titleMatch || companyMatch || locationMatch || tagMatch;
      });
    }

    // Workplace filter
    if (filterState.workplace && filterState.workplace !== "all") {
      result = result.filter(
        (job) =>
          job.workplace?.toLowerCase() ===
          filterState.workplace.toLowerCase(),
      );
    }

    // Experience Level filter
    if (filterState.level && filterState.level !== "all") {
      result = result.filter(
        (job) =>
          job.experience_level?.toLowerCase() ===
          filterState.level.toLowerCase(),
      );
    }

    // Job Type filter
    if (filterState.jobType && filterState.jobType !== "all") {
      result = result.filter(
        (job) =>
          job.job_type?.toLowerCase() === filterState.jobType.toLowerCase(),
      );
    }

    // Salary Min filter
    if (filterState.salaryMin !== undefined && filterState.salaryMin > 0) {
      result = result.filter((job) => {
        const max = job.salary_max ?? 0;
        const min = job.salary_min ?? 0;
        const compMax = max >= 1000 ? max : max * 1000;
        const compMin = min >= 1000 ? min : min * 1000;
        return (
          compMax >= filterState.salaryMin! || compMin >= filterState.salaryMin!
        );
      });
    }

    // Sort
    if (selectedSort === "Highest Salary") {
      return [...result].sort(
        (a, b) =>
          (b.salary_max || b.salary_min || 0) -
          (a.salary_max || a.salary_min || 0),
      );
    }

    if (selectedSort === "Best Match") {
      return [...result].sort((a, b) => getScore(b.id) - getScore(a.id));
    }

    // Default: Recently Saved (latest saved item on the top)
    return result;
  }, [jobs, debouncedQuery, filterState, selectedSort]);

  const handleClearAll = () => {
    setSearchInput("");
    setDebouncedQuery("");
    resetFilters();
  };

  const handleClearInput = () => {
    setSearchInput("");
    setDebouncedQuery("");
  };

  return (
    <View style={[screenSafeArea, { backgroundColor: background }]}>
      {/* ── Screen Header ── */}
      <View style={styles.header}>
        <AppText style={[styles.headerTitle, { color: textColor }]}>
          Saved Jobs
        </AppText>
      </View>

      {/* ── Search Bar with Filter Button ── */}
      <View style={styles.searchBarWrapper}>
        <View
          style={[
            styles.searchBar,
            shadowStyle,
            {
              backgroundColor: card,
              borderColor: border,
            },
          ]}
        >
          {/* Search Icon */}
          <Search size={20} color={textSecondary} style={styles.searchIcon} />

          {/* Text Input */}
          <TextInput
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="Search saved jobs, companies..."
            placeholderTextColor={textSecondary}
            returnKeyType="search"
            style={[styles.input, { color: textColor }]}
          />

          {/* Clear Input Button */}
          {searchInput.length > 0 && (
            <Pressable
              onPress={handleClearInput}
              hitSlop={8}
              style={[styles.clearInputBtn, { backgroundColor: muted }]}
            >
              <X size={14} color={textColor} />
            </Pressable>
          )}

          {/* Divider */}
          <View style={[styles.filterDivider, { backgroundColor: border }]} />

          {/* Filter Modal Trigger */}
          <Pressable
            onPress={() => setFilterModalVisible(true)}
            hitSlop={8}
            style={({ pressed }) => [
              styles.filterBtn,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <SlidersHorizontal size={20} color={primary} />
            {activeFilterCount > 0 && (
              <View style={[styles.filterBadge, { backgroundColor: primary }]}>
                <AppText style={styles.filterBadgeText}>
                  {activeFilterCount}
                </AppText>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* ── Stats & Sort Bar ── */}
      <View style={styles.subBar}>
        <AppText style={[styles.jobsCountText, { color: textSecondary }]}>
          {filteredJobs.length === savedIds.length
            ? `${savedIds.length} ${savedIds.length === 1 ? "saved job" : "saved jobs"}`
            : `Showing ${filteredJobs.length} of ${savedIds.length} saved jobs`}
        </AppText>

        {/* Dummy Sort Dropdown */}
        <Pressable
          onPress={() => setSortModalVisible(true)}
          style={styles.sortBtn}
        >
          <AppText
            style={[
              styles.sortBtnText,
              { color: textColor, fontFamily: fonts.medium },
            ]}
          >
            Sort:{" "}
            <AppText style={{ color: primary, fontFamily: fonts.semibold }}>
              {selectedSort}
            </AppText>
          </AppText>
          <ChevronDown size={16} color={textSecondary} />
        </Pressable>
      </View>

      {/* ── List / Empty States / Loading ── */}
      {savedIds.length === 0 ? (
        // Case 1: No saved jobs yet
        <View style={styles.emptyContainer}>
          <View
            style={[
              styles.emptyIconContainer,
              { backgroundColor: surfaceSecondary },
            ]}
          >
            <Bookmark size={40} color={primary} />
          </View>
          <AppText style={[styles.emptyTitle, { color: textColor }]}>
            No saved jobs yet
          </AppText>
          <AppText style={[styles.emptySubtitle, { color: textSecondary }]}>
            Tap the bookmark icon on any job card to save it here for quick
            access later.
          </AppText>
          <Pressable
            onPress={() => router.push("/(tabs)/search" as any)}
            style={({ pressed }) => [
              styles.exploreBtn,
              {
                backgroundColor: primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Compass size={18} color={primaryText} />
            <AppText style={[styles.exploreBtnText, { color: primaryText }]}>
              Explore Jobs
            </AppText>
          </Pressable>
        </View>
      ) : isLoading && jobs.length === 0 ? (
        <View style={styles.centerLoading}>
          <ActivityIndicator size="large" color={primary} />
          <AppText
            style={{
              color: textSecondary,
              marginTop: 12,
              fontFamily: fonts.medium,
            }}
          >
            Loading saved jobs...
          </AppText>
        </View>
      ) : filteredJobs.length === 0 ? (
        // Case 2: Filters/Search return 0 results
        <View style={styles.emptyContainer}>
          <EmptySearchState
            searchQuery={debouncedQuery}
            title="No matching saved jobs"
            message="No saved jobs match your current search criteria or filters."
            onClearSearch={handleClearAll}
            clearButtonText="Reset Filters & Search"
          />
        </View>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecommendedCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={4}
        />
      )}

      {/* ── Filter Modal ── */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filterAtom={savedFilterAtom}
        resetAtom={resetSavedFilterAtom}
      />

      {/* ── Sort Options Modal ── */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <Pressable
          style={styles.sortOverlay}
          onPress={() => setSortModalVisible(false)}
        >
          <View
            style={[
              styles.sortCard,
              shadowStyle,
              { backgroundColor: card, borderColor: border },
            ]}
          >
            <AppText
              style={[
                styles.sortTitle,
                { color: textColor, fontFamily: fonts.bold },
              ]}
            >
              Sort Saved Jobs
            </AppText>
            {SORT_OPTIONS.map((opt) => {
              const isSelected = selectedSort === opt;
              return (
                <Pressable
                  key={opt}
                  onPress={() => {
                    setSelectedSort(opt);
                    setSortModalVisible(false);
                  }}
                  style={[
                    styles.sortOptionItem,
                    {
                      backgroundColor: isSelected ? muted : "transparent",
                    },
                  ]}
                >
                  <AppText
                    style={[
                      styles.sortOptionText,
                      {
                        color: isSelected ? primary : textColor,
                        fontFamily: isSelected ? fonts.bold : fonts.regular,
                      },
                    ]}
                  >
                    {opt}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: fonts.bold,
    letterSpacing: -0.5,
  },
  searchBarWrapper: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.regular,
    paddingVertical: 8,
  },
  clearInputBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  filterDivider: {
    width: 1,
    height: 24,
    marginRight: 12,
  },
  filterBtn: {
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  filterBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  filterBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontFamily: fonts.bold,
  },
  subBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  jobsCountText: {
    fontSize: 13.5,
    fontFamily: fonts.medium,
  },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sortBtnText: {
    fontSize: 13.5,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 110,
  },
  centerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 19,
    fontFamily: fonts.bold,
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 280,
    marginBottom: 20,
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreBtnText: {
    fontSize: 14,
    fontFamily: fonts.bold,
  },
  sortOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  sortCard: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 14,
  },
  sortTitle: {
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  sortOptionItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  sortOptionText: {
    fontSize: 14.5,
  },
});
