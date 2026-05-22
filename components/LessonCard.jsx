import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Fonts } from "../constant/Fonts";

const LessonCard = ({
  title,
  description,
  progress = 0,
  icon = "book-outline",
  xp = 10,
  locked = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, locked && styles.cardLocked]}
      onPress={onPress}
      disabled={locked}
    >
      <View style={[styles.iconBox, locked && styles.iconBoxLocked]}>
        <Ionicons
          name={locked ? "lock-closed" : icon}
          size={24}
          color={locked ? "#8F83B8" : "#FFD86B"}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.title, locked && styles.lockedText]}>
            {title}
          </Text>

          <View style={styles.xpBadge}>
            <Ionicons name="flash" size={12} color="#FFD86B" />
            <Text style={styles.xpText}>{xp} XP</Text>
          </View>
        </View>

        <Text style={[styles.description, locked && styles.lockedText]}>
          {description}
        </Text>

        <View style={styles.progressArea}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>Progress</Text>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LessonCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(25, 20, 58, 0.94)",
    borderWidth: 2,
    borderColor: "#7557D9",
    borderRadius: 18,
    padding: 13,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 5,
  },

  cardLocked: {
    opacity: 0.65,
    borderColor: "#4D3D85",
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255, 216, 107, 0.15)",
    borderWidth: 1,
    borderColor: "#FFD86B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  iconBoxLocked: {
    backgroundColor: "rgba(143, 131, 184, 0.12)",
    borderColor: "#6F63A0",
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  title: {
    flex: 1,
    fontFamily: Fonts.bodyBold,
    fontSize: 15,
    color: "#FFFFFF",
  },

  lockedText: {
    color: "#AFA4D8",
  },

  description: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: "#D8CFFF",
    marginTop: 4,
    lineHeight: 17,
  },

  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 216, 107, 0.13)",
    borderWidth: 1,
    borderColor: "#FFD86B",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    gap: 3,
  },

  xpText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 10,
    color: "#FFD86B",
  },

  progressArea: {
    marginTop: 10,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  progressText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 10,
    color: "#BFA7FF",
  },

  progressBar: {
    height: 8,
    backgroundColor: "#2C245F",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#FFD86B",
    borderRadius: 999,
  },
});