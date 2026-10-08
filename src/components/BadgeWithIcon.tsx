import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { useGenericShadow } from "../../constants/genericShadowStyle";
import { fonts } from "../../constants/typography";
import { AppText } from "./AppText";

type BadgeProps = {
  icon?: React.ReactNode;
  badgeTitle: string;
  lightBgColor?: string;
  darkBgColor?: string;
  fontFamily?: string;
  textColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
};

const BadgeWithIcon = ({
  icon,
  badgeTitle,
  lightBgColor = "#d9fea7ff",
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
      {icon}
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

export default BadgeWithIcon;

const styles = StyleSheet.create({
  levelPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
