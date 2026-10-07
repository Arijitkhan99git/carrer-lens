import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

const CARRERLENS_THEME_KEY = "CarrerLens_theme_preference";

export type ThemePreference = "light" | "dark" | "system";

export const getStoredThemePreference =
  async (): Promise<ThemePreference | null> => {
    try {
      const storedTheme = await AsyncStorage.getItem(CARRERLENS_THEME_KEY);
      if (
        storedTheme === "light" ||
        storedTheme === "dark" ||
        storedTheme === "system"
      ) {
        return storedTheme;
      }
      return null;
    } catch {
      return null;
    }
  };

export const setStoredThemePreference = async (theme: ThemePreference) => {
  try {
    await AsyncStorage.setItem(CARRERLENS_THEME_KEY, theme);
  } catch {}
};

export const themeAtom = atom<ThemePreference | null>(null);
