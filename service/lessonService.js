import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebaseConfig";
import { listenCompletedLessons } from "./completedLessonService";

const SUBJECT_COLORS = [
  "#7557D9",
  "#28B8A8",
  "#FF8A5C",
  "#4D96FF",
  "#FF6B9A",
];

const emptyUnsubscribe = () => {};

const getSubjectName = (subject) => {
  return subject.subjectName || subject.name || subject.title || "Subject";
};

const getLessonTitle = (lesson) => {
  return lesson.displayTitle || lesson.title || "Untitled Lesson";
};

const getLessonDescription = (lesson) => {
  if (lesson.description) return lesson.description;

  if (lesson.aiLesson?.introMessage) {
    return lesson.aiLesson.introMessage;
  }

  if (Array.isArray(lesson.aiLesson?.summary)) {
    return lesson.aiLesson.summary.join(" ");
  }

  return "Start this lesson to learn more.";
};

const getLessonReward = (lesson) => {
  return {
    xp: lesson.aiLesson?.reward?.xp || lesson.reward?.xp || lesson.xp || 0,
    gold:
      lesson.aiLesson?.reward?.gold || lesson.reward?.gold || lesson.gold || 0,
  };
};

const getLessonSteps = (lesson) => {
  return lesson.aiLesson?.interactiveSteps || lesson.interactiveSteps || [];
};

const getLessonSummary = (lesson) => {
  return lesson.aiLesson?.summary || lesson.summary || [];
};

const formatLesson = ({ lessonDoc, subjectName }) => {
  const lesson = lessonDoc.data();
  const reward = getLessonReward(lesson);

  return {
    id: lessonDoc.id,

    title: getLessonTitle(lesson),
    description: getLessonDescription(lesson),

    reward,
    xp: reward.xp,
    gold: reward.gold,

    progress: 0,
    locked: false,
    completed: false,
    completedData: null,

    subjectId: lesson.subjectId,
    subjectName: lesson.subjectName || subjectName,
    gradeLevel: lesson.gradeLevel,

    introMessage: lesson.aiLesson?.introMessage || "",
    finalMessage: lesson.aiLesson?.finalMessage || "",
    interactiveSteps: getLessonSteps(lesson),
    summary: getLessonSummary(lesson),

    aiLesson: lesson.aiLesson || null,
    aiStatus: lesson.aiStatus || null,

    createdAt: lesson.createdAt || null,
    updatedAt: lesson.updatedAt || null,

    raw: lesson,

    ...lesson,
  };
};

const applyCompletedLessonsToSubjects = ({
  subjectsMap,
  completedLessonsMap,
}) => {
  return Array.from(subjectsMap.values()).map((subject) => {
    const lessons = subject.lessons.map((lesson) => {
      const completedData = completedLessonsMap[lesson.id] || null;

      return {
        ...lesson,
        completed: !!completedData,
        completedData,
        progress: completedData ? 100 : 0,
      };
    });

    const completedLessons = lessons.filter((lesson) => lesson.completed).length;

    return {
      ...subject,
      lessons,
      lessonCount: lessons.length,
      completedLessons,
    };
  });
};

export const listenSubjectsByGradeLevel = ({
  gradeLevel,
  onSuccess = () => {},
  onError = () => {},
}) => {
  if (!gradeLevel) {
    onError(new Error("Missing grade level."));
    return emptyUnsubscribe;
  }

  const normalizedGradeLevel = String(gradeLevel);

  const subjectsQuery = query(
    collection(db, "subjects"),
    where("gradeLevel", "==", normalizedGradeLevel)
  );

  const subjectsMap = new Map();
  let completedLessonsMap = {};

  const lessonUnsubscribers = [];

  const clearLessonListeners = () => {
    lessonUnsubscribers.forEach((unsubscribe) => unsubscribe());
    lessonUnsubscribers.length = 0;
  };

  const emitSubjects = () => {
    const subjects = applyCompletedLessonsToSubjects({
      subjectsMap,
      completedLessonsMap,
    });

    onSuccess(subjects);
  };

  const unsubscribeCompletedLessons = listenCompletedLessons({
    onSuccess: (completedMap) => {
      completedLessonsMap = completedMap;
      emitSubjects();
    },
    onError,
  });

  const unsubscribeSubjects = onSnapshot(
    subjectsQuery,
    (subjectsSnapshot) => {
      clearLessonListeners();
      subjectsMap.clear();

      if (subjectsSnapshot.empty) {
        emitSubjects();
        return;
      }

      subjectsSnapshot.docs.forEach((subjectDoc, index) => {
        const subject = subjectDoc.data();
        const subjectName = getSubjectName(subject);

        subjectsMap.set(subjectDoc.id, {
          id: subjectDoc.id,
          name: subjectName,
          color:
            subject.color || SUBJECT_COLORS[index % SUBJECT_COLORS.length],

          gradeLevel: subject.gradeLevel,
          lessonCount: 0,
          completedLessons: 0,
          lessons: [],

          ...subject,
        });
      });

      emitSubjects();

      subjectsSnapshot.docs.forEach((subjectDoc) => {
        const currentSubject = subjectsMap.get(subjectDoc.id);

        if (!currentSubject) return;

        const lessonsQuery = query(
          collection(db, "lessons"),
          where("subjectId", "==", subjectDoc.id),
          where("gradeLevel", "==", normalizedGradeLevel),
          where("aiStatus", "==", "done")
        );

        const unsubscribeLessons = onSnapshot(
          lessonsQuery,
          (lessonsSnapshot) => {
            const lessons = lessonsSnapshot.docs.map((lessonDoc) =>
              formatLesson({
                lessonDoc,
                subjectName: currentSubject.name,
              })
            );

            subjectsMap.set(subjectDoc.id, {
              ...currentSubject,
              lessonCount: lessons.length,
              lessons,
            });

            emitSubjects();
          },
          (error) => {
            console.log("Listen lessons error:", error);
            onError(error);
          }
        );

        lessonUnsubscribers.push(unsubscribeLessons);
      });
    },
    (error) => {
      console.log("Listen subjects error:", error);
      onError(error);
    }
  );

  return () => {
    unsubscribeSubjects();
    unsubscribeCompletedLessons();
    clearLessonListeners();
  };
};

export const listenLessonById = ({
  lessonId,
  onSuccess = () => {},
  onError = () => {},
}) => {
  if (!lessonId) {
    onError(new Error("Missing lesson id."));
    return emptyUnsubscribe;
  }

  const lessonRef = doc(db, "lessons", String(lessonId));

  return onSnapshot(
    lessonRef,
    (lessonSnapshot) => {
      if (!lessonSnapshot.exists()) {
        onError(new Error("Lesson not found."));
        return;
      }

      const lesson = lessonSnapshot.data();
      const reward = getLessonReward(lesson);

      onSuccess({
        id: lessonSnapshot.id,

        title: getLessonTitle(lesson),
        description: getLessonDescription(lesson),

        reward,
        xp: reward.xp,
        gold: reward.gold,

        subjectId: lesson.subjectId || null,
        subjectName: lesson.subjectName || "",
        gradeLevel: lesson.gradeLevel || "",

        introMessage: lesson.aiLesson?.introMessage || "",
        finalMessage: lesson.aiLesson?.finalMessage || "",
        interactiveSteps: getLessonSteps(lesson),
        summary: getLessonSummary(lesson),

        aiLesson: lesson.aiLesson || null,
        aiStatus: lesson.aiStatus || "",

        createdAt: lesson.createdAt || null,
        updatedAt: lesson.updatedAt || null,

        raw: lesson,
      });
    },
    (error) => {
      console.log("Listen lesson by id error:", error);
      onError(error);
    }
  );
};