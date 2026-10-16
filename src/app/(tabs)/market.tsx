import { AppText } from "@/components/AppText";
import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { Banknote, Briefcase, Globe, Zap } from "lucide-react-native";
import { useState } from "react";
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import {
    MARKET_OVERVIEW_STATS,
    SALARY_BY_EXPERIENCE,
    SALARY_TREND_DATA,
    TrendPeriod,
    WORKPLACE_DATA,
} from "../../../constants/marketData";
import { fonts } from "../../../constants/typography";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_PADDING = 16;
const GRID_GAP = 12;
const STAT_CARD_WIDTH = (SCREEN_WIDTH - CARD_PADDING * 2 - GRID_GAP) / 2;
const CHART_WIDTH = SCREEN_WIDTH - 64; // Account for screen and card padding

export default function MarketScreen() {
  const screenSafeArea = useScreenSafeArea();
  const shadowStyle = useGenericShadow(1);
  const {
    background,
    card,
    text: textColor,
    textSecondary,
    primary,
    primaryText,
    muted,
    chartBlue,
    chartSky,
    chartLightBlue,
    chartTrack,
    badgeGreenBg,
    badgeGreenText,
    isDarkMode,
  } = useThemeColors();

  const [selectedPeriod, setSelectedPeriod] = useState<TrendPeriod>("30D");

  const trend = SALARY_TREND_DATA[selectedPeriod];

  // Prepare data points for gifted-charts LineChart
  const lineChartData = trend.data.map((point) => {
    const isToday = point.isHighlighted;
    return {
      value: point.value,
      label: point.label,
      labelTextStyle: {
        color: isToday ? primary : textSecondary,
        fontFamily: isToday ? fonts.bold : fonts.regular,
        fontSize: 11,
      },
      showDataPoint: isToday,
      dataPointColor: primary,
      dataPointRadius: isToday ? 5.5 : 0,
      customDataPoint: isToday
        ? () => (
            <View
              style={[
                styles.highlightDotOuter,
                { backgroundColor: "rgba(53, 104, 245, 0.25)" },
              ]}
            >
              <View
                style={[styles.highlightDotInner, { backgroundColor: primary }]}
              />
            </View>
          )
        : undefined,
    };
  });

  // Calculate dynamic spacing between data points
  const pointSpacing =
    lineChartData.length > 1
      ? Math.max(28, (CHART_WIDTH - 30) / (lineChartData.length - 1))
      : 40;

  // Pie chart data
  const pieChartData = WORKPLACE_DATA.map((item) => {
    let sliceColor = chartBlue;
    if (item.name === "Hybrid") sliceColor = chartSky;
    if (item.name === "On-site") sliceColor = chartLightBlue;

    return {
      value: item.value,
      color: sliceColor,
      text: `${item.value}%`,
    };
  });

  return (
    <View style={[screenSafeArea, { backgroundColor: background }]}>
      {/* ── Screen Header (No bell icon) ── */}
      <View style={styles.header}>
        <AppText style={[styles.headerTitle, { color: textColor }]}>
          AI Job Market
        </AppText>
        <AppText style={[styles.headerSubtitle, { color: textSecondary }]}>
          Understand where the developer market is moving.
        </AppText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Top 2x2 Overview Stats Grid ── */}
        <View style={styles.overviewGrid}>
          {MARKET_OVERVIEW_STATS.map((stat) => {
            let IconComponent = Briefcase;
            if (stat.iconType === "salary") IconComponent = Banknote;
            if (stat.iconType === "zap") IconComponent = Zap;
            if (stat.iconType === "globe") IconComponent = Globe;

            const isSuccess = stat.badgeType === "success";

            return (
              <View
                key={stat.id}
                style={[
                  styles.statCard,
                  shadowStyle,
                  { backgroundColor: card },
                ]}
              >
                {/* Top Row: Label & Icon */}
                <View style={styles.statCardHeader}>
                  <AppText
                    style={[styles.statCardLabel, { color: textSecondary }]}
                  >
                    {stat.label}
                  </AppText>
                  <IconComponent size={20} color={primary} />
                </View>

                {/* Bottom Row: Large Value & Badge */}
                <View style={styles.statCardBottom}>
                  <AppText style={[styles.statCardValue, { color: textColor }]}>
                    {stat.value}
                  </AppText>
                  <View
                    style={[
                      styles.statBadge,
                      {
                        backgroundColor: isSuccess
                          ? badgeGreenBg
                          : isDarkMode
                            ? "#1F2B48"
                            : "#EEF2FF",
                      },
                    ]}
                  >
                    <AppText
                      style={[
                        styles.statBadgeText,
                        {
                          color: isSuccess ? badgeGreenText : primary,
                        },
                      ]}
                    >
                      {stat.badgeText}
                    </AppText>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* ── Card 1: Salary Trend ── */}
        <View
          style={[styles.cardContainer, shadowStyle, { backgroundColor: card }]}
        >
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <View style={{ gap: 2 }}>
              <AppText style={[styles.cardTitle, { color: textColor }]}>
                Salary Trend
              </AppText>
              <AppText style={[styles.cardSubtitle, { color: textSecondary }]}>
                Average AI job salary
              </AppText>
            </View>

            {/* Time Filter Pills */}
            <View style={[styles.pillsContainer, { backgroundColor: muted }]}>
              {(["30D", "90D", "1Y"] as TrendPeriod[]).map((period) => {
                const isSelected = selectedPeriod === period;
                return (
                  <Pressable
                    key={period}
                    onPress={() => setSelectedPeriod(period)}
                    style={[
                      styles.pillButton,
                      isSelected && {
                        backgroundColor: primary,
                      },
                    ]}
                  >
                    <AppText
                      style={[
                        styles.pillText,
                        {
                          color: isSelected ? primaryText : textSecondary,
                          fontFamily: isSelected ? fonts.bold : fonts.medium,
                        },
                      ]}
                    >
                      {period}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Value & Growth Badge */}
          <View style={styles.valueRow}>
            <AppText style={[styles.mainValue, { color: textColor }]}>
              {trend.amount}
            </AppText>
            <View style={[styles.badge, { backgroundColor: badgeGreenBg }]}>
              <AppText style={[styles.badgeText, { color: badgeGreenText }]}>
                {trend.change}
              </AppText>
            </View>
          </View>

          {/* Area Line Chart */}
          <View style={styles.chartWrapper}>
            <LineChart
              data={lineChartData}
              areaChart
              curved
              color={primary}
              thickness={2.8}
              startFillColor={primary}
              endFillColor={primary}
              startOpacity={0.25}
              endOpacity={0.01}
              height={140}
              width={CHART_WIDTH - 20}
              spacing={pointSpacing}
              initialSpacing={10}
              endSpacing={10}
              hideDataPoints={false}
              hideYAxisText
              yAxisColor="transparent"
              xAxisColor="transparent"
              rulesType="dashed"
              rulesColor={isDarkMode ? "#1F2B45" : "#EAF0FA"}
              noOfSections={3}
              pointerConfig={{
                pointerStripHeight: 120,
                pointerStripColor: primary,
                pointerStripWidth: 1.5,
                pointerColor: primary,
                radius: 4,
              }}
            />
          </View>
        </View>

        {/* ── Card 2: Salary by Experience ── */}
        <View
          style={[styles.cardContainer, shadowStyle, { backgroundColor: card }]}
        >
          <View style={styles.cardHeader}>
            <View style={{ gap: 2 }}>
              <AppText style={[styles.cardTitle, { color: textColor }]}>
                Salary by Experience
              </AppText>
              <AppText style={[styles.cardSubtitle, { color: textSecondary }]}>
                Average salary by seniority
              </AppText>
            </View>
          </View>

          <View style={styles.experienceList}>
            {SALARY_BY_EXPERIENCE.map((item) => (
              <View key={item.level} style={styles.experienceItem}>
                {/* Level Title & Value */}
                <View style={styles.experienceHeader}>
                  <AppText
                    style={[styles.experienceLevelText, { color: textColor }]}
                  >
                    {item.level}
                  </AppText>
                  <AppText
                    style={[styles.experienceSalaryText, { color: textColor }]}
                  >
                    {item.salary}
                  </AppText>
                </View>

                {/* Horizontal Progress Bar */}
                <View
                  style={[
                    styles.progressTrack,
                    { backgroundColor: chartTrack },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${item.percentage}%`,
                        backgroundColor: primary,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── Card 3: Workplace Distribution ── */}
        <View
          style={[styles.cardContainer, shadowStyle, { backgroundColor: card }]}
        >
          <View style={styles.cardHeader}>
            <View style={{ gap: 2 }}>
              <AppText style={[styles.cardTitle, { color: textColor }]}>
                Workplace
              </AppText>
              <AppText style={[styles.cardSubtitle, { color: textSecondary }]}>
                Global distribution of open engineering roles
              </AppText>
            </View>
          </View>

          <View style={styles.donutSection}>
            {/* Donut Chart with Center Metric */}
            <View style={styles.donutWrapper}>
              <PieChart
                data={pieChartData}
                donut
                radius={62}
                innerRadius={46}
                centerLabelComponent={() => (
                  <View style={styles.donutCenter}>
                    <AppText
                      style={[styles.donutCenterValue, { color: textColor }]}
                    >
                      61%
                    </AppText>
                    <AppText
                      style={[
                        styles.donutCenterLabel,
                        { color: textSecondary },
                      ]}
                    >
                      REMOTE
                    </AppText>
                  </View>
                )}
              />
            </View>

            {/* Legend Column */}
            <View style={styles.legendContainer}>
              {WORKPLACE_DATA.map((item) => {
                let dotColor = chartBlue;
                if (item.name === "Hybrid") dotColor = chartSky;
                if (item.name === "On-site") dotColor = chartLightBlue;

                return (
                  <View key={item.name} style={styles.legendItem}>
                    <View
                      style={[styles.legendDot, { backgroundColor: dotColor }]}
                    />
                    <AppText
                      style={[styles.legendName, { color: textSecondary }]}
                    >
                      {item.name}
                    </AppText>
                    <AppText style={[styles.legendValue, { color: textColor }]}>
                      {item.value}%
                    </AppText>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    // gap: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: fonts.bold,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
    lineHeight: 16,
  },
  scrollContent: {
    paddingHorizontal: CARD_PADDING,
    paddingTop: 4,
    paddingBottom: 110,
    gap: 16,
  },
  overviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GRID_GAP,
  },
  statCard: {
    width: STAT_CARD_WIDTH,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "space-between",
    minHeight: 96,
  },
  statCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statCardLabel: {
    fontSize: 13,
    fontFamily: fonts.medium,
  },
  statCardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statCardValue: {
    fontSize: 22,
    fontFamily: fonts.bold,
    letterSpacing: -0.5,
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 14,
  },
  statBadgeText: {
    fontSize: 11.5,
    fontFamily: fonts.bold,
  },
  cardContainer: {
    borderRadius: 20,
    padding: 18,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  cardSubtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  pillsContainer: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 3,
  },
  pillButton: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 16,
  },
  pillText: {
    fontSize: 12,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  mainValue: {
    fontSize: 28,
    fontFamily: fonts.bold,
    letterSpacing: -0.5,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12.5,
    fontFamily: fonts.bold,
  },
  chartWrapper: {
    marginLeft: -16,
    marginTop: 6,
    alignItems: "center",
  },
  highlightDotOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -6,
    marginTop: -6,
  },
  highlightDotInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  experienceList: {
    gap: 14,
    marginTop: 6,
  },
  experienceItem: {
    gap: 6,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  experienceLevelText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  experienceSalaryText: {
    fontSize: 14,
    fontFamily: fonts.bold,
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  donutSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  donutWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  donutCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  donutCenterValue: {
    fontSize: 17,
    fontFamily: fonts.bold,
    lineHeight: 20,
  },
  donutCenterLabel: {
    fontSize: 9,
    fontFamily: fonts.semibold,
    letterSpacing: 0.5,
  },
  legendContainer: {
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendName: {
    fontSize: 14,
    fontFamily: fonts.medium,
    width: 60,
  },
  legendValue: {
    fontSize: 14,
    fontFamily: fonts.bold,
  },
});
