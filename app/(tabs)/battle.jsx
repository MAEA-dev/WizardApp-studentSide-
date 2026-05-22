import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { Fonts } from "../../constant/Fonts";

const Battle = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/battleBg.png")}
      style={styles.background}
      resizeMode="cover"
    >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.comingSoon}>COMING SOON</Text>
       
          </View>
        </View>

    </ImageBackground>
  );
};

export default Battle;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(19, 11, 43, 0.35)",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },



  comingSoon: {
    fontFamily: Fonts.pixel,
    fontSize: 16,
    color: "#ffffffd2",
    textAlign: "center",
    marginBottom: 10,
  },

});