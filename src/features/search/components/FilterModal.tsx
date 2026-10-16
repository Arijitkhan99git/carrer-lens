import { AppText } from "@/components/AppText";
import { useAtom, useSetAtom } from "jotai";
import { Check, RotateCcw, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "../../../../constants/color-pallette";
import { fonts } from "../../../../constants/typography";
import {
  ExperienceLevelOption,
  JobTypeOption,
  SearchFilterState,
  WorkplaceOption,
  initialSearchFilterState,
  resetSearchFilterAtom,
  searchFilterAtom,
} from "../../../../store/searchFilter-store";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const SALARY_PRESETS = [
  { label: "Any", value: undefined },
  { label: "$50K+", value: 50000 },
  { label: "$100K+", value: 100000 },
  { label: "$150K+", value: 150000 },
  { label: "$200K+", value: 200000 },
  { label: "$250K+", value: 250000 },
];

const WORKPLACE_OPTIONS: { label: string; value: WorkplaceOption }[] = [
  { label: "All", value: "all" },
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Onsite", value: "onsite" },
];

const EXPERIENCE_OPTIONS: { label: string; value: ExperienceLevelOption }[] = [
  { label: "All", value: "all" },
  { label: "Junior", value: "junior" },
  { label: "Mid", value: "mid" },
  { label: "Senior", value: "senior" },
  { label: "Lead", value: "lead" },
  { label: "Principal", value: "principal" },
];

const JOB_TYPE_OPTIONS: { label: string; value: JobTypeOption }[] = [
  { label: "All", value: "all" },
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Freelance", value: "freelance" },
];

function FilterModalSheet({
  activeFilters,
  onApply,
  onReset,
  onClose,
}: {
  activeFilters: SearchFilterState;
  onApply: (filters: SearchFilterState) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const {
    card,
    text: textColor,
    textSecondary,
    primary,
    primaryText,
    border,
    muted,
  } = useThemeColors();

  // Initialized cleanly on mount without useEffect
  const [draftFilters, setDraftFilters] =
    useState<SearchFilterState>(activeFilters);

  const handleApply = () => {
    onApply(draftFilters);
    onClose();
  };

  const handleReset = () => {
    setDraftFilters(initialSearchFilterState);
    onReset();
  };

  return (
    <View
      style={[
        styles.sheet,
        {
          backgroundColor: card,
          paddingBottom: Math.max(insets.bottom, 20) + 8,
        },
      ]}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: border }]}>
        <View style={styles.dragIndicator} />
        <View style={styles.headerContent}>
          <AppText style={[styles.title, { color: textColor }]}>
            Filter Jobs
          </AppText>
          <Pressable
            onPress={onClose}
            hitSlop={8}
            style={[styles.closeBtn, { backgroundColor: muted }]}
          >
            <X size={18} color={textColor} />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Workplace / Location Type */}
        <View style={styles.section}>
          <AppText style={[styles.sectionTitle, { color: textColor }]}>
            Workplace
          </AppText>
          <View style={styles.chipsWrap}>
            {WORKPLACE_OPTIONS.map((opt) => {
              const isSelected = draftFilters.workplace === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() =>
                    setDraftFilters((prev) => ({
                      ...prev,
                      workplace: opt.value,
                    }))
                  }
                  style={[
                    styles.chip,
                    {
                      backgroundColor: isSelected ? primary : muted,
                      borderColor: isSelected ? primary : border,
                    },
                  ]}
                >
                  {isSelected && (
                    <Check
                      size={14}
                      color={primaryText}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <AppText
                    style={[
                      styles.chipText,
                      {
                        color: isSelected ? primaryText : textColor,
                        fontFamily: isSelected
                          ? fonts.semibold
                          : fonts.medium,
                      },
                    ]}
                  >
                    {opt.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Experience Level */}
        <View style={styles.section}>
          <AppText style={[styles.sectionTitle, { color: textColor }]}>
            Experience Level
          </AppText>
          <View style={styles.chipsWrap}>
            {EXPERIENCE_OPTIONS.map((opt) => {
              const isSelected = draftFilters.level === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() =>
                    setDraftFilters((prev) => ({
                      ...prev,
                      level: opt.value,
                    }))
                  }
                  style={[
                    styles.chip,
                    {
                      backgroundColor: isSelected ? primary : muted,
                      borderColor: isSelected ? primary : border,
                    },
                  ]}
                >
                  {isSelected && (
                    <Check
                      size={14}
                      color={primaryText}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <AppText
                    style={[
                      styles.chipText,
                      {
                        color: isSelected ? primaryText : textColor,
                        fontFamily: isSelected
                          ? fonts.semibold
                          : fonts.medium,
                      },
                    ]}
                  >
                    {opt.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Minimum Salary */}
        <View style={styles.section}>
          <AppText style={[styles.sectionTitle, { color: textColor }]}>
            Minimum Salary
          </AppText>
          <View style={styles.chipsWrap}>
            {SALARY_PRESETS.map((opt) => {
              const isSelected = draftFilters.salaryMin === opt.value;
              return (
                <Pressable
                  key={opt.label}
                  onPress={() =>
                    setDraftFilters((prev) => ({
                      ...prev,
                      salaryMin: opt.value,
                    }))
                  }
                  style={[
                    styles.chip,
                    {
                      backgroundColor: isSelected ? primary : muted,
                      borderColor: isSelected ? primary : border,
                    },
                  ]}
                >
                  {isSelected && (
                    <Check
                      size={14}
                      color={primaryText}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <AppText
                    style={[
                      styles.chipText,
                      {
                        color: isSelected ? primaryText : textColor,
                        fontFamily: isSelected
                          ? fonts.semibold
                          : fonts.medium,
                      },
                    ]}
                  >
                    {opt.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Job Type */}
        <View style={styles.section}>
          <AppText style={[styles.sectionTitle, { color: textColor }]}>
            Job Type
          </AppText>
          <View style={styles.chipsWrap}>
            {JOB_TYPE_OPTIONS.map((opt) => {
              const isSelected = draftFilters.jobType === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() =>
                    setDraftFilters((prev) => ({
                      ...prev,
                      jobType: opt.value,
                    }))
                  }
                  style={[
                    styles.chip,
                    {
                      backgroundColor: isSelected ? primary : muted,
                      borderColor: isSelected ? primary : border,
                    },
                  ]}
                >
                  {isSelected && (
                    <Check
                      size={14}
                      color={primaryText}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <AppText
                    style={[
                      styles.chipText,
                      {
                        color: isSelected ? primaryText : textColor,
                        fontFamily: isSelected
                          ? fonts.semibold
                          : fonts.medium,
                      },
                    ]}
                  >
                    {opt.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.actionsRow, { borderTopColor: border }]}>
        <Pressable
          onPress={handleReset}
          style={({ pressed }) => [
            styles.resetBtn,
            {
              backgroundColor: muted,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <RotateCcw size={16} color={textSecondary} />
          <AppText
            style={[
              styles.resetBtnText,
              { color: textSecondary, fontFamily: fonts.semibold },
            ]}
          >
            Reset
          </AppText>
        </Pressable>

        <Pressable
          onPress={handleApply}
          style={({ pressed }) => [
            styles.applyBtn,
            {
              backgroundColor: primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <AppText
            style={[
              styles.applyBtnText,
              { color: primaryText, fontFamily: fonts.bold },
            ]}
          >
            Apply Filters
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

export default function FilterModal({ visible, onClose }: FilterModalProps) {
  const [activeFilters, setActiveFilters] = useAtom(searchFilterAtom);
  const resetFilters = useSetAtom(resetSearchFilterAtom);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop tap to dismiss */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        {visible && (
          <FilterModalSheet
            key={String(visible)}
            activeFilters={activeFilters}
            onApply={setActiveFilters}
            onReset={resetFilters}
            onClose={onClose}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "85%",
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
  },
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  headerContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 22,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  resetBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
  },
  resetBtnText: {
    fontSize: 14,
  },
  applyBtn: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
  },
  applyBtnText: {
    fontSize: 14,
  },
});
