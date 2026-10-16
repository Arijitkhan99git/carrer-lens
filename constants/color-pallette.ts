import { useAtomValue } from "jotai";
import { useColorScheme } from "react-native";

import { themeAtom } from "../store/theme-store";

export type ColorsType = typeof Colors.light & {
  isDarkMode: boolean;
};

export const Colors = {
  light: {
    // ─────────────────────────────────────────
    // Surfaces
    // ─────────────────────────────────────────

    background: "#eff2fcff",
    foreground: "#FFFFFF",

    surface: "#FFFFFF",
    surfaceSecondary: "#F4F6FF",
    surfaceSubtle: "#EEF2FF",
    surfaceHigh: "#FFFFFF",
    surfaceAccent: "#E8EEFF",

    card: "#FFFFFF",
    cardElevated: "#FFFFFF",

    // ─────────────────────────────────────────
    // Brand
    // ─────────────────────────────────────────

    primary: "#3568F5",
    primaryText: "#FFFFFF",

    blueGlow: "#4D7BFF",
    blueTint: "#2e4a95ff",

    brandBlue: "#3568F5",
    brandBlueGlow: "#4D7BFF",

    // ─────────────────────────────────────────
    // Text
    // ─────────────────────────────────────────

    text: "#1b2c64ff",
    textSecondary: "#57667bff",
    mutedText: "#94A3B8",

    // ─────────────────────────────────────────
    // Semantic
    // ─────────────────────────────────────────

    secondary: "#F1F5FF",
    secondaryText: "#172554",

    muted: "#EEF2F7",

    popover: "#FFFFFF",
    popoverText: "#172554",

    // ─────────────────────────────────────────
    // Feedback
    // ─────────────────────────────────────────

    rating: "#F59E0B",

    success: "#18A874",
    successText: "#FFFFFF",

    warning: "#F59E0B",
    warningText: "#FFFFFF",

    danger: "#EF4444",
    dangerText: "#FFFFFF",

    // ─────────────────────────────────────────
    // Borders
    // ─────────────────────────────────────────

    border: "#E5EAF4",
    borderAccent: "#C9D7FF",
    borderFocus: "#8FAAFF",

    // ─────────────────────────────────────────
    // Input / Focus
    // ─────────────────────────────────────────

    input: "#F4F6FB",
    ring: "#8FAAFF",

    // ─────────────────────────────────────────
    // Utility
    // ─────────────────────────────────────────

    shadow: "rgba(37, 76, 160, 0.08)",
    buttonShadow: "rgba(53, 104, 245, 0.25)",

    // Chart & Market Colors
    chartBlue: "#3568F5",
    chartSky: "#60A5FA",
    chartLightBlue: "#BFDBFE",
    chartTrack: "#EEF2FF",
    badgeGreenBg: "#E6F8EF",
    badgeGreenText: "#18A874",

    isDarkMode: false,
  },

  dark: {
    // ─────────────────────────────────────────
    // Surfaces
    // ─────────────────────────────────────────

    background: "#0B1020",
    foreground: "#121A2B",

    surface: "#151D30",
    surfaceSecondary: "#1A2338",
    surfaceSubtle: "#202A40",
    surfaceHigh: "#26324A",
    surfaceAccent: "#202F58",

    card: "#151D30",
    cardElevated: "#1B253A",

    // ─────────────────────────────────────────
    // Brand
    // ─────────────────────────────────────────

    primary: "#5B82FF",
    primaryText: "#FFFFFF",

    blueGlow: "#7194FF",
    blueTint: "#202F58",

    brandBlue: "#5B82FF",
    brandBlueGlow: "#7194FF",
    // ─────────────────────────────────────────
    // Text
    // ─────────────────────────────────────────

    text: "#F4F7FF",
    textSecondary: "#AAB5C9",
    mutedText: "#78849A",

    // ─────────────────────────────────────────
    // Semantic
    // ─────────────────────────────────────────

    secondary: "#1A2338",
    secondaryText: "#E8EDFA",

    muted: "#202A40",

    popover: "#151D30",
    popoverText: "#F4F7FF",

    // ─────────────────────────────────────────
    // Feedback
    // ─────────────────────────────────────────

    rating: "#FBBF24",

    success: "#36C994",
    successText: "#071A12",

    warning: "#FBBF24",
    warningText: "#1A1300",

    danger: "#FF6B6B",
    dangerText: "#FFFFFF",

    // ─────────────────────────────────────────
    // Borders
    // ─────────────────────────────────────────

    border: "#29344B",
    borderAccent: "#3B4D78",
    borderFocus: "#617DD1",

    // ─────────────────────────────────────────
    // Input / Focus
    // ─────────────────────────────────────────

    input: "#1A2338",
    ring: "#617DD1",

    // ─────────────────────────────────────────
    // Utility
    // ─────────────────────────────────────────

    shadow: "rgba(0, 0, 0, 0.35)",
    buttonShadow: "rgba(91, 130, 255, 0.30)",

    // Chart & Market Colors
    chartBlue: "#5B82FF",
    chartSky: "#7194FF",
    chartLightBlue: "#3B4E7A",
    chartTrack: "#202A40",
    badgeGreenBg: "rgba(54, 201, 148, 0.15)",
    badgeGreenText: "#36C994",

    isDarkMode: true,
  },
};

export const useThemeColors = (): ColorsType => {
  const theme = useAtomValue(themeAtom);
  const systemColorScheme = useColorScheme();

  const isDarkMode =
    theme === "system" ? systemColorScheme === "dark" : theme === "dark";

  return isDarkMode ? Colors.dark : Colors.light;
};
