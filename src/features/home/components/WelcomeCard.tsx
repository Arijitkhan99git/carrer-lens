import { AppText } from "@/components/AppText";
import BadgeWithIcon from "@/components/BadgeWithIcon";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Sparkles } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../../constants/color-pallette";
import { useGenericShadow } from "../../../../constants/genericShadowStyle";
import { globalStyles } from "../../../../constants/styles";
import { fonts } from "../../../../constants/typography";

export default function WelcomeCard() {
  const shadowStyle = useGenericShadow(2);

  const { card, isDarkMode, blueTint } = useThemeColors();

  const secondGradientColors = isDarkMode
    ? ([card, "#2e1d12ff", "#462d1eff"] as const)
    : (["#ffffffff", "#e1f3feff", "#d9f1fcff"] as const);

  return (
    <LinearGradient
      colors={secondGradientColors}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[
        shadowStyle,
        globalStyles.flexRowBetween,
        {
          alignItems: "center",
          gap: 6,
          borderRadius: 18,
          padding: 16,
        },
      ]}
    >
      <View style={{ gap: 10, alignItems: "flex-start" }}>
        <BadgeWithIcon
          icon={<Sparkles size={14} color={blueTint} />}
          badgeTitle="Smart Lens"
          lightBgColor="#fff"
        />
        <AppText
          style={{ fontFamily: fonts.bold, fontSize: 20, lineHeight: 25 }}
        >
          {"AI-Powered\nJob Matches"}
        </AppText>

        <AppText style={{ fontFamily: fonts.medium, fontSize: 13 }}>
          {
            "Get personalized\nrecommendations tailored to\nyour stack and experience."
          }
        </AppText>

        <View style={[styles.findJobButton, globalStyles.flexRow, { gap: 8 }]}>
          <AppText
            style={{
              fontFamily: fonts.semibold,
              color: "#fff",
              fontSize: 15,
            }}
          >
            Explore Jobs
          </AppText>
          <ArrowRight size={20} color={"#fff"} />
        </View>
      </View>
      <View>
        <Image
          source={require("@/assets/images/local/computer.png")}
          style={{ width: 120, height: 120, objectFit: "cover" }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  findJobButton: {
    backgroundColor: "#3568F5",
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 6,
    width: "auto",
  },
});
