import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

export const CARRERLENS_PROFILE_KEY = "CarrerLens_user_profile";

export interface UserProfileData {
  name: string;
  designation: string;
  status: string;
}

export const DEFAULT_PROFILE: UserProfileData = {
  name: "Arijit Khan",
  designation: "Senior AI & Full-Stack Developer",
  status: "Open to Offers",
};

// ─── AsyncStorage helpers ──────────────────────────────────────────────────

export const getStoredProfile = async (): Promise<UserProfileData | null> => {
  try {
    const raw = await AsyncStorage.getItem(CARRERLENS_PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && typeof parsed.name === "string") {
      return {
        name: parsed.name || DEFAULT_PROFILE.name,
        designation: parsed.designation || DEFAULT_PROFILE.designation,
        status: parsed.status || DEFAULT_PROFILE.status,
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to load stored profile", error);
    return null;
  }
};

export const setStoredProfile = async (
  profile: UserProfileData,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(CARRERLENS_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to save profile", error);
  }
};

// ─── Atoms ─────────────────────────────────────────────────────────────────

/**
 * Synchronous atom holding user profile data.
 * Hydrated on app mount in _layout.tsx
 */
export const profileAtom = atom<UserProfileData>(DEFAULT_PROFILE);

/**
 * Write-only atom that updates user profile state and auto-persists to AsyncStorage.
 */
export const updateProfileAtom = atom(
  null,
  (
    get,
    set,
    update:
      | Partial<UserProfileData>
      | ((prev: UserProfileData) => UserProfileData),
  ) => {
    const current = get(profileAtom);
    const next: UserProfileData =
      typeof update === "function"
        ? update(current)
        : { ...current, ...update };

    set(profileAtom, next);
    setStoredProfile(next);
  },
);
