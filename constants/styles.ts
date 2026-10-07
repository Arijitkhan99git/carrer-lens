import { StyleSheet } from "react-native";

/**
 * Global reusable styles shared across all components.
 * Import and spread these into your component's StyleSheet as needed.
 *
 * Usage:
 *   import { globalStyles } from "@/constants/styles";
 *   ...
 *   <View style={globalStyles.flexRow}>
 */
export const globalStyles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  flexRowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex1: {
    flex: 1,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
