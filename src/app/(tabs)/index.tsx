import Homeheader from "@/features/home/components/Homeheader";
import HomeSubHeader from "@/features/home/components/HomeSubHeader";
import MatchedJobs from "@/features/home/components/MatchedJobs";
import WelcomeCard from "@/features/home/components/WelcomeCard";
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
          rowGap: 25,
          paddingBottom: 100,
        }}
      >
        <Homeheader />
        <HomeSubHeader />
        <WelcomeCard />
        <MatchedJobs />
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
