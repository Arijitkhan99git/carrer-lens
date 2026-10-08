import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFetchMatchedJobs } from "../../../../api/hooks/useFetchMatchedJobs";

export default function MatchedJobs() {
  const mutateAsync = useFetchMatchedJobs();

  useEffect(() => {
    const res = mutateAsync.mutate({
      skills: ["go", "javascript"],
    });
    console.log(res);
  }, []);

  return (
    <View>
      <Text>MatchedJobs</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
