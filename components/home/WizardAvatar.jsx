import { StyleSheet, View } from "react-native";
import SpriteSheet from "../SpriteSheet";

export default function WizardAvatar({ scale }) {
  return (
    <View style={styles.wizardSection}>
      <SpriteSheet
        source={require("../../assets/images/greenWizardidle.png")}
        frameCount={8}
        scale={scale}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wizardSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },
});