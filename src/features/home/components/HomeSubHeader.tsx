import { AppText } from "@/components/AppText";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../../../../constants/color-pallette";
import { globalStyles } from "../../../../constants/styles";
import { fonts } from "../../../../constants/typography";

export default function HomeSubHeader() {
  const { text: textColor } = useThemeColors();

  return (
    <View style={globalStyles.flexRowBetween}>
      <View>
        <AppText style={[styles.fontStyle, { color: textColor }]}>
          Find Your
        </AppText>
        <AppText style={[styles.fontStyle, { color: textColor }]}>
          Dream{" "}
          <Text
            style={{
              fontSize: 40,
              fontFamily: fonts.extraBoldItalic,
              lineHeight: 45,
              fontWeight: 600,
              color: textColor,
            }}
          >
            Job
          </Text>
        </AppText>
      </View>

      <View
        style={{
          width: 100,
          height: 100,
        }}
      >
        <Image
          source={require("@/../assets/images/local/wing.png")}
          style={{
            width: "auto",
            height: 80,
            objectFit: "contain",
            marginRight: 10,
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fontStyle: {
    fontSize: 40,
    fontFamily: fonts.bold,
    lineHeight: 45,
  },
});
