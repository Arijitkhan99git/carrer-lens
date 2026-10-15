import { AppText } from "@/components/AppText";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useFetchJobDetails } from "../../../api/hooks/useFetchJobDetails";

export default function JobDetails() {
  const { id } = useLocalSearchParams();

  const { data, isLoading, isError } = useFetchJobDetails(String(id));

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error...</Text>;
  }

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <AppText numberOfLines={3} style={{ color: "#000" }}>
        {data?.description}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({});
