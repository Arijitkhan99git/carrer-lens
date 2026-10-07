import Homeheader from "@/features/home/components/Homeheader";
import HomeSubHeader from "@/features/home/components/HomeSubHeader";
import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const screenSafeArea = useScreenSafeArea();

  return (
    <View style={[screenSafeArea, styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          rowGap: 30,
          paddingBottom: 100,
        }}
      >
        <Homeheader />
        <HomeSubHeader />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "space-between",
  },
  commonFlexRow: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});
