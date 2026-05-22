import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Fonts } from "../constant/Fonts";
import LessonCard from "./LessonCard";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const SubjectLessonSection = ({ subject, onLessonPress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubject = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen((prev) => !prev);
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.subjectHeader}
        onPress={toggleSubject}
      >
        <View style={styles.leftHeader}>
          <View style={[styles.subjectIcon, { backgroundColor: subject.color }]}>
            <Ionicons name="book" size={24} color="#FFFFFF" />
          </View>

          <View style={styles.subjectInfoBox}>
            <Text style={styles.subjectTitle}>{subject.name}</Text>

            <Text style={styles.subjectInfo}>
              {subject.lessons.length} lessons • {subject.completedLessons} completed
            </Text>
          </View>
        </View>

        <View style={styles.rightHeader}>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={23}
            color="#FFD86B"
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.lessonsList}>
          {subject.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              description={lesson.description}
              progress={lesson.progress}
              icon={lesson.icon}
              xp={lesson.xp}
              locked={lesson.locked}
              onPress={() => onLessonPress(subject, lesson)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default SubjectLessonSection;

const styles = StyleSheet.create({
  section: {
    backgroundColor: "rgba(19, 11, 43, 0.78)",
    borderWidth: 2,
    borderColor: "#7557D9",
    borderRadius: 24,
    padding: 14,
    marginBottom: 18,
  },

  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  subjectIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
  },

  subjectInfoBox: {
    flex: 1,
  },

  subjectTitle: {
    fontFamily: Fonts.bodyBold,
    fontSize: 18,
    color: "#FFFFFF",
  },

  subjectInfo: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: "#D8CFFF",
    marginTop: 2,
  },

  rightHeader: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },

  lessonsList: {
    marginTop: 14,
  },
});