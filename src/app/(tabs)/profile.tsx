import { AppText } from "@/components/AppText";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { SectionCard } from "@/features/profile/components/SectionCard";
import { SectionHeader } from "@/features/profile/components/SectionHeader";
import { SettingsRow } from "@/features/profile/components/SettingsRow";
import { UserDetailsModal } from "@/features/profile/components/UserDetailsModal";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Moon, Palette, Sun } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { fetchMatchedJobs } from "../../../api/services/matchedJob-services";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import {
  jobPreferenceAtom,
  setStoredJobPreference,
} from "../../../store/jobPreference-store";
import {
  profileAtom,
  updateProfileAtom,
} from "../../../store/profileData-store";
import {
  setStoredThemePreference,
  themeAtom,
} from "../../../store/theme-store";

export default function Profile() {
  const screenSafeArea = useScreenSafeArea();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const [, setTheme] = useAtom(themeAtom);
  const isDark = colors.isDarkMode;
  const setJobPreference = useSetAtom(jobPreferenceAtom);

  // User Profile from persistent Jotai store
  const profile = useAtomValue(profileAtom);
  const updateProfile = useSetAtom(updateProfileAtom);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
    <View style={[screenSafeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: insets.bottom + 90,
          paddingHorizontal: 16,
        }}
      >
        {/* Header, Profile Card, and Stat Cards */}
        <ProfileHeader
          profile={profile}
          onEditPress={() => setIsEditModalOpen(true)}
        />

        {/* Existing Section 1: Career Profile / Preferences */}
        <SectionCard>
          <SectionHeader title="Carrer Profile" />
          <Pressable
            onPress={handlePreferences}
            style={{
              backgroundColor: colors.primary,
              height: 48,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            <AppText style={{ color: "#FFFFFF", fontFamily: fonts.semibold }}>
              Set the job preferences
            </AppText>
          </Pressable>
        </SectionCard>

        {/* Existing Section 2: Settings & Appearance */}
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
      </ScrollView>

      {/* Edit Profile Modal */}
      <UserDetailsModal
        visible={isEditModalOpen}
        initialData={profile}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(updated) => updateProfile(updated)}
      />
    </View>
  );
}
