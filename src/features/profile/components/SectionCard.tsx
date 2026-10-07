import { View } from "react-native";
import { useThemeColors } from "../../../../constants/color-pallette";

export function SectionCard({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 18,
        padding: 16,
        marginBottom: 18,
      }}
    >
      {children}
    </View>
  );
}
