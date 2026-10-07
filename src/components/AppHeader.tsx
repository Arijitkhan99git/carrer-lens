import { AppText } from "@/components/AppText";
import { Search } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";

const AppHeader = () => {
  const { text, primary } = useThemeColors();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <View
        style={{
          backgroundColor: primary,
          padding: 6,
          borderRadius: 50,
        }}
      >
        <Search color="#fff" size={22} />
      </View>
      <AppText
        style={{
          color: text,
          fontSize: 18,
          fontFamily: "sans-bold",
        }}
      >
        CarrerLens
      </AppText>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
