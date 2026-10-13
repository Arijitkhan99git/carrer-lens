import { AppText } from "@/components/AppText";
import { SectionCard } from "@/features/profile/components/SectionCard";
import { SectionHeader } from "@/features/profile/components/SectionHeader";
import { SettingsRow } from "@/features/profile/components/SettingsRow";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { Moon, Palette, Sun } from "lucide-react-native";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

import { fetchMatchedJobs } from "../../../api/services/matchedJob-services";
import { useThemeColors } from "../../../constants/color-pallette";
import {
  jobPreferenceAtom,
  setStoredJobPreference,
} from "../../../store/jobPreference-store";
import {
  setStoredThemePreference,
  themeAtom,
} from "../../../store/theme-store";

export default function Profile() {
  const colors = useThemeColors();
  const [, setTheme] = useAtom(themeAtom);
  const isDark = colors.isDarkMode;
  const setJobPreference = useSetAtom(jobPreferenceAtom);

  const mutateAsync = useMutation({
    mutationFn: fetchMatchedJobs,
    async onSuccess(response) {
      // Store in Jotai atom (in-memory)
      setJobPreference(response);
      // Persist to AsyncStorage (survives app restarts)
      await setStoredJobPreference(response);
      console.log(response.total_matches);
    },
  });

  const toggleTheme = async (enabled: boolean) => {
    const next = enabled ? "dark" : "light";
    setTheme(next);
    await setStoredThemePreference(next);
  };

  const handlePreferences = () => {
    mutateAsync.mutate({
      skills: ["go", "backend", "payments"],
      salary_min: 200000,
      workplace: "remote",
    });
  };

  return (
    <View style={styles.Container}>
      <Text>profile</Text>

      {/* Preferences */}
      <SectionCard>
        <SectionHeader title="Carrer Profile" />
        <Pressable
          onPress={handlePreferences}
          style={{
            backgroundColor: "blue",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <AppText>Set the job preferences</AppText>
        </Pressable>
      </SectionCard>

      {/* Appreance */}
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
