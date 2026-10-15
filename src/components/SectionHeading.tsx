import { Text, TextProps } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { fonts } from "../../constants/typography";

export function SectionHeading({ style, ...props }: TextProps) {
  const { text, isDarkMode } = useThemeColors();

  const textColor = isDarkMode ? "#FFFFFF" : "#2a2a2aff";

  return (
    <Text
      style={[
        {
          fontFamily: fonts.semibold,
          color: textColor,
          fontSize: 17,
          opacity: 0.9,
        },
        style,
      ]}
      {...props}
    />
  );
}
