import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { useGenericShadow } from "../../constants/genericShadowStyle";
import { fonts } from "../../constants/typography";
import { AppText } from "./AppText";

type BadgeProps = {
  badgeTitle: string;
  lightBgColor?: string;
  darkBgColor?: string;
  fontFamily?: string;
  textColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
};

const NormalBadge = ({
  badgeTitle,
  lightBgColor = "#a7e5feff",
  darkBgColor,
  fontFamily = fonts.semibold,
  textColor,
  lightTextColor,
  darkTextColor,
}: BadgeProps) => {
  const { blueTint, isDarkMode, surfaceHigh } = useThemeColors();
  const shadowStyle = useGenericShadow(1);

  const backgroundColor = isDarkMode
    ? (darkBgColor ?? surfaceHigh)
    : lightBgColor;

  const color = isDarkMode
    ? (darkTextColor ?? textColor ?? blueTint)
    : (lightTextColor ?? textColor ?? blueTint);

  return (
    <View
      style={[
        styles.levelPill,
        shadowStyle,
        {
          backgroundColor,
        },
      ]}
    >
      <AppText
        style={{
          fontFamily,
          fontSize: 12,
          color,
        }}
      >
        {badgeTitle}
      </AppText>
    </View>
  );
};

export default NormalBadge;

const styles = StyleSheet.create({
  levelPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
});
