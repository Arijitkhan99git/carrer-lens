import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { useGenericShadow } from "../../constants/genericShadowStyle";

type BadgeProps = {
  children: React.ReactNode;
  lightBgColor?: string;
  darkBgColor?: string;
  fontFamily?: string;
  textColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
};

const CustomBadge = ({
  children,
  lightBgColor = "#caeffdff",
  darkBgColor,
  textColor,
  lightTextColor,
  darkTextColor,
}: BadgeProps) => {
  const { blueTint, isDarkMode, surfaceHigh } = useThemeColors();
  const shadowStyle = useGenericShadow(0.5);

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
      {children}
    </View>
  );
};

export default CustomBadge;

const styles = StyleSheet.create({
  levelPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
  },
});
