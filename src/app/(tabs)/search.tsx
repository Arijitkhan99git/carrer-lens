import { AppText } from "@/components/AppText";
import { EmptySearchState } from "@/components/EmptySearchState";
import RecommendedCard from "@/features/home/components/RecommendedCard";
import FilterModal from "@/features/search/components/FilterModal";
import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { useAtomValue, useSetAtom } from "jotai";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useFetchJobs } from "../../../api/hooks/useFetchJobs";
import { JobItem } from "../../../api/model/job-model";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import {
  activeFilterCountAtom,
  resetSearchFilterAtom,
  searchFilterAtom,
} from "../../../store/searchFilter-store";

const SORT_OPTIONS = ["Best Match", "Most Recent", "Highest Salary"];

export default function SearchScreen() {
  const insets = useScreenSafeArea();
  const shadowStyle = useGenericShadow(1);
  const {
    card,
    text: textColor,
    textSecondary,
    primary,
    border,
    muted,
  } = useThemeColors();

  // Search input and debounce state
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Jotai Filter Store
  const filterState = useAtomValue(searchFilterAtom);
  const activeFilterCount = useAtomValue(activeFilterCountAtom);
  const resetFilters = useSetAtom(resetSearchFilterAtom);

  // Filter Modal state
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Sort state (dummy dropdown)
  const [selectedSort, setSelectedSort] = useState("Best Match");
  const [sortModalVisible, setSortModalVisible] = useState(false);

  // Debounce input by 350ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput.trim());
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Query parameters for API
  const queryParams = useMemo(() => {
    return {
      q: debouncedQuery || undefined,
      salary_min: filterState.salaryMin,
      salary_max: filterState.salaryMax,
      workplace:
        filterState.workplace !== "all" ? filterState.workplace : undefined,
      level: filterState.level !== "all" ? filterState.level : undefined,
      type: filterState.jobType !== "all" ? filterState.jobType : undefined,
      limit: 50,
    };
  }, [debouncedQuery, filterState]);

  // Fetch jobs
  const { data, isLoading, isFetching, refetch } = useFetchJobs(queryParams);

  const jobsList: JobItem[] = useMemo(() => {
    const jobs = data?.jobs ?? [];
    if (selectedSort === "Highest Salary") {
      return [...jobs].sort(
        (a, b) =>
          (b.salary_max || b.salary_min) - (a.salary_max || a.salary_min),
      );
    }
    return jobs;
  }, [data?.jobs, selectedSort]);

  const totalCount = data?.total ?? jobsList.length;

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
    <View
      style={[
        insets,
        // styles.screen,
        // {
        //   backgroundColor: background,
        // },
      ]}
    >
      {/* ── Screen Header ── */}
      <View style={styles.header}>
        <AppText style={[styles.headerTitle, { color: textColor }]}>
          Search
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
            placeholder="Search jobs, skills, companies..."
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
          {isLoading
            ? "Searching jobs..."
            : `${totalCount} ${totalCount === 1 ? "job" : "jobs"} found`}
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

      {/* ── Job List / Empty State / Loading State ── */}
      {isLoading ? (
        <View style={styles.centerLoading}>
          <ActivityIndicator size="large" color={primary} />
          <AppText
            style={{
              color: textSecondary,
              marginTop: 12,
              fontFamily: fonts.medium,
            }}
          >
            Finding matching jobs...
          </AppText>
        </View>
      ) : jobsList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptySearchState
            searchQuery={debouncedQuery}
            onClearSearch={handleClearAll}
            clearButtonText="Reset Filters & Search"
          />
        </View>
      ) : (
        <FlatList
          data={jobsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecommendedCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={7}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={refetch}
              tintColor={primary}
            />
          }
        />
      )}

      {/* ── Filter Modal ── */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
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
              Sort Jobs
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
  screen: {
    flex: 1,
  },
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
    paddingHorizontal: 16,
    justifyContent: "center",
    paddingBottom: 80,
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
