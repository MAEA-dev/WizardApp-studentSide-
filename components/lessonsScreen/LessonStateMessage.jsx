import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Fonts } from "../../constant/Fonts";

const LessonStateMessage = ({ loading = false, error = false, message }) => {
  return (
    <View style={styles.card}>
      {loading && <ActivityIndicator size="large" color="#FFD86B" />}

      <Text style={error ? styles.errorText : styles.messageText}>
        {message}
      </Text>
    </View>
  );
};

export default LessonStateMessage;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(25, 20, 58, 0.9)",
    borderWidth: 1.5,
    borderColor: "#7557D9",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    marginTop: 12,
  },

  messageText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 8,
    textAlign: "center",
  },

  errorText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 13,
    color: "#FF8A8A",
    textAlign: "center",
  },
});