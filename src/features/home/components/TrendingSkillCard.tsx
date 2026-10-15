import { AppText } from "@/components/AppText";
import CustomBadge from "@/components/CustomBadge";
import { MoveUp } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Tag } from "../../../../api/model/trendingSkills-model";
import { useThemeColors } from "../../../../constants/color-pallette";
import { fonts } from "../../../../constants/typography";

function getRandomValue(min: number, max: number) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (
    typeof min !== "number" ||
    typeof max !== "number" ||
    Number.isNaN(min) ||
    Number.isNaN(max)
  ) {
    throw new TypeError("Limits must be valid numbers");
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function TrendingSkillCard({ item }: { item: Tag }) {
  const {
    card,
    primary,
    text: textColor,
    border,
    isDarkMode,
    textSecondary,
  } = useThemeColors();

  const fontFamily = fonts.semibold;

  const badgeTextColor = isDarkMode ? "#FFFFFF" : "#226435ff";

  return (
    <View
      style={[styles.container, { backgroundColor: card, borderColor: border }]}
    >
      <View style={styles.chip}>
        <AppText style={[styles.chipName, { fontFamily, color: textColor }]}>
          {capitalizeFirst(item.name)}
        </AppText>

        <CustomBadge lightBgColor="#d1fddfff">
          <View style={styles.flexRow}>
            {/* small "+" */}
            <AppText
              style={[styles.badgePlus, { fontFamily, color: badgeTextColor }]}
            >
              +
            </AppText>

            {/* larger percentage value */}
            <AppText
              style={[styles.badgeValue, { fontFamily, color: badgeTextColor }]}
            >
              {getRandomValue(1, 10)}%
            </AppText>

            {/* up arrow */}
            <MoveUp size={11} color={badgeTextColor} />
          </View>
        </CustomBadge>
      </View>

      <View style={styles.openingContainer}>
        <AppText style={[styles.chipCount, { color: textSecondary }]}>
          {item.count}
        </AppText>

        <AppText style={[styles.openingText, { color: textSecondary }]}>
          job openings
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chipName: { fontSize: 15 },
  chipCount: { fontSize: 13, fontFamily: fonts.semibold },
  badgePlus: { fontSize: 11 }, // smaller "+"
  badgeValue: { fontSize: 12 }, // larger percentage number
  flexRow: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },

  openingContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  openingText: {
    fontSize: 11,
  },
});
