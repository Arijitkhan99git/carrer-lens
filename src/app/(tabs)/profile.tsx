import { SectionCard } from "@/features/profile/SectionCard";
import { SectionHeader } from "@/features/profile/SectionHeader";
import { SettingsRow } from "@/features/profile/SettingsRow";
import { useAtom } from "jotai";
import { Moon, Palette, Sun } from "lucide-react-native";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import {
  setStoredThemePreference,
  themeAtom,
} from "../../../store/theme-store";

export default function profile() {
  const colors = useThemeColors();
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = colors.isDarkMode;

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    setStoredThemePreference(next);
  };

  return (
    <View style={styles.Container}>
      <Text>profile</Text>

      <SectionCard>
        <SectionHeader title="Settings & Preferences" />

        <SettingsRow
          icon={<Palette size={20} color={isDark ? "#ffb4a6" : "#c44c33"} />}
          iconBg={isDark ? "#3d221c" : "#ffe4df"}
          label="Appearance"
          subtitle="Switch light & dark tone"
          right={
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              {isDark ? (
                <Moon size={20} color={colors.textSecondary} />
              ) : (
                <Sun size={20} color={colors.textSecondary} />
              )}
              <Switch
                trackColor={{
                  false: colors.muted,
                  true: `${colors.primary}55`,
                }}
                thumbColor={isDark ? colors.primary : colors.card}
                ios_backgroundColor={colors.muted}
                onValueChange={toggleTheme}
                value={isDark}
                style={{
                  transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
                }}
              />
            </View>
          }
        />
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 16,
  },
});
