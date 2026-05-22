import { useEffect, useState } from "react";

import { listenSubjectsByGradeLevel } from "../service/lessonService";

export const useSubjectsWithLessons = (gradeLevel) => {
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [subjectsError, setSubjectsError] = useState(null);

  useEffect(() => {
    if (!gradeLevel) {
      setSubjects([]);
      setSubjectsError("Missing grade level.");
      setLoadingSubjects(false);
      return;
    }

    setLoadingSubjects(true);
    setSubjectsError(null);

    const unsubscribe = listenSubjectsByGradeLevel({
      gradeLevel,
      onSuccess: (data) => {
        setSubjects(data);
        setLoadingSubjects(false);
      },
      onError: (error) => {
        console.log("Load subjects error:", error);
        setSubjectsError(error?.message || "Failed to load lessons.");
        setLoadingSubjects(false);
      },
    });

    return unsubscribe;
  }, [gradeLevel]);

  return {
    subjects,
    loadingSubjects,
    subjectsError,
  };
};