import AppHeader from "@/components/AppHeader";
import { Image } from "expo-image";
import { Bell } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

export default function Homeheader() {
  return (
    <View style={styles.headerWrapper}>
      <AppHeader />
      <View style={styles.commonFlexRow}>
        <Bell color="#4e5663ff" size={24} />

        <Image
          source={
            "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-in-shirt-smiles-and-gives-thumbs-up-to-show-approval-png-image_13146336.png"
          }
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#ebe2e2ff",
            objectFit: "cover",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
