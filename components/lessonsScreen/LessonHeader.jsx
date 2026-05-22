import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Fonts } from "../../constant/Fonts";

const LessonHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Wizard Library</Text>
    </View>
  );
};

export default LessonHeader;

const styles = StyleSheet.create({
  header: {
    marginBottom: 18,
  },

  title: {
    fontFamily: Fonts.bodyBold,
    fontSize: 24,
    color: "#FFD86B",
  },
});