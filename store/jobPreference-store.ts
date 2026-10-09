import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

import { MatchedJobResponse } from "../api/model/matchedJob-model";

const JOB_PREFERENCE_KEY = "CarrerLens_job_preference";

// ─── Persistence Helpers ───────────────────────────────────────────────────

export const getStoredJobPreference =
  async (): Promise<MatchedJobResponse | null> => {
    try {
      const stored = await AsyncStorage.getItem(JOB_PREFERENCE_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as MatchedJobResponse;
    } catch {
      return null;
    }
  };

export const setStoredJobPreference = async (
  data: MatchedJobResponse,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(JOB_PREFERENCE_KEY, JSON.stringify(data));
  } catch {}
};

export const clearStoredJobPreference = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(JOB_PREFERENCE_KEY);
  } catch {}
};

// ─── Jotai Atom ───────────────────────────────────────────────────────────

export const jobPreferenceAtom = atom<MatchedJobResponse | null>(null);
