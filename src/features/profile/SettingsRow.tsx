import { AppText } from "@/components/AppText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";

export function SettingsRow({
  icon,
  iconBg,
  label,
  subtitle,
  right,
  onPress,
  showBorder = true,
}: {
  icon: React.ReactNode;
  iconBg?: string;
  label: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  showBorder?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.65 : 1}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
        borderBottomWidth: showBorder ? StyleSheet.hairlineWidth : 0,
        borderBottomColor: colors.border,
        gap: 12,
      }}
    >
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: iconBg || colors.surfaceSubtle,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <AppText
          style={{
            fontSize: 14,
            fontFamily: fonts.medium,
            color: colors.text,
          }}
        >
          {label}
        </AppText>
        {subtitle && (
          <AppText
            style={{ fontSize: 11, color: colors.textSecondary, marginTop: 1 }}
          >
            {subtitle}
          </AppText>
        )}
      </View>
      {right}
    </TouchableOpacity>
  );
}
