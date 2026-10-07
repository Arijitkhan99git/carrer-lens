import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
        <Text>vHVubadhsvdjhs</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
