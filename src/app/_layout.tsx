import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Network from "expo-network";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../constants/color-pallette";
import {
  getStoredJobPreference,
  jobPreferenceAtom,
} from "../../store/jobPreference-store";
import { getStoredSavedIds, savedIdsAtom } from "../../store/saved-store";
import { getStoredThemePreference, themeAtom } from "../../store/theme-store";

onlineManager.setEventListener((setOnline) => {
  let initialised = false;

  // Listen for changes
  const eventSubscription = Network.addNetworkStateListener((state) => {
    initialised = true;
    setOnline(!!state.isConnected);
  });

  // Fetch the initial state immediately on boot
  Network.getNetworkStateAsync()
    .then((state) => {
      if (!initialised) {
        setOnline(!!state.isConnected);
      }
    })
    .catch(() => {
      /* Handle optional native error safely */
    });

  // Return unsubscribe cleanup function
  return () => {
    if (eventSubscription && typeof eventSubscription.remove === "function") {
      eventSubscription.remove();
    }
  };
});

export default function RootLayout() {
  // Create a client
  const queryClient = new QueryClient();

  const [, setTheme] = useAtom(themeAtom);
  const [, setJobPreference] = useAtom(jobPreferenceAtom);
  const [, setSavedIds] = useAtom(savedIdsAtom);
  const [persistedStateHydrated, setPersistedStateHydrated] = useState(false);
  const colors = useThemeColors();

  // Restore persisted state before showing screens that consume these atoms.
  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getStoredThemePreference(),
      getStoredJobPreference(),
      getStoredSavedIds(),
    ]).then(([storedTheme, storedJobPreference, storedSavedIds]) => {
      if (!isMounted) return;

      setTheme(storedTheme ?? (Platform.OS === "ios" ? "system" : "light"));
      setJobPreference(storedJobPreference);
      setSavedIds(storedSavedIds);
      setPersistedStateHydrated(true);
    });

    return () => {
      isMounted = false;
    };
  }, [setJobPreference, setSavedIds, setTheme]);

  const navigationTheme = useMemo(() => {
    const base = colors.isDarkMode ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: colors.background,
        card: colors.foreground,
        text: colors.text,
        border: colors.surface,
        primary: colors.primary,
      },
    };
  }, [colors]);

  const [fontsLoaded] = useFonts({
    "sans-regular": require("@/assets/fonts/Manrope-Regular.ttf"),
    "sans-bold": require("@/assets/fonts/Manrope-Bold.ttf"),
    "sans-medium": require("@/assets/fonts/Manrope-Medium.ttf"),
    "sans-semibold": require("@/assets/fonts/Manrope-SemiBold.ttf"),
    "sans-extrabold": require("@/assets/fonts/Manrope-ExtraBold.ttf"),
    "sans-light": require("@/assets/fonts/Manrope-Light.ttf"),
    "sans-boldItalic": require("@/assets/fonts/PlusJakartaSans-BoldItalic.ttf"),
    "sans-extraboldItalic": require("@/assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf"),
  });

  if (!fontsLoaded || !persistedStateHydrated) return null;

  // Show welcome screen on first launch

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <ThemeProvider value={navigationTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ThemeProvider>
        <StatusBar style={colors.isDarkMode ? "light" : "dark"} />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
