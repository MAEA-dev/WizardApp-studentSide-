import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Fonts } from "../../constant/Fonts";

const LessonSectionHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Subject Quests</Text>
      <Text style={styles.hint}>Tap to open</Text>
    </View>
  );
};

export default LessonSectionHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontFamily: Fonts.bodyBold,
    fontSize: 19,
    color: "#FFFFFF",
  },

  hint: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: "#FFD86B",
  },
});