import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";

import WizardMessage from "./wizardModal";

import { useLessonFlow } from "../hooks/useLessonFlow";
import { completeLessonAndReward } from "../service/lessonCompletionService";

import LessonHeader from "./LessonHeader";
import LessonProgress from "./LessonProgress";
import LessonStepCard from "./LessonStepCard";
import LessonSummaryCard from "./LessonSummaryCard";

import LessonFooter from "./LessonFooter";
import LessonScreenWrapper from "./LessonScreenWrapper";

const LessonPlayer = ({
  lesson,
  onBack,
  isReviewMode = false,
}) => {
  const handleLessonComplete = useCallback(
    async ({ earnedReward, correctAnswers, totalQuestions }) => {
      if (isReviewMode) {
        return {
          rewarded: false,
          alreadyCompleted: true,
          reason: "Review mode only.",
          xpReward: 0,
          goldReward: 0,
        };
      }

      return completeLessonAndReward({
        lesson,
        earnedReward,
        correctAnswers,
        totalQuestions,
      });
    },
    [lesson, isReviewMode]
  );

  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    selectedAnswer,
    earnedReward,
    completionResult,
    showSummary,
    wizardModal,
    progress,
    canGoNext,
    isLastStep,
    goToNextStep,
    handleAnswer,
    closeWizardModal,
  } = useLessonFlow(lesson, {
    onLessonComplete: handleLessonComplete,
    rewardEnabled: !isReviewMode,
  });

  const displayReward = completionResult
    ? {
        xp: completionResult.rewarded ? completionResult.xpReward || 0 : 0,
        gold: completionResult.rewarded ? completionResult.goldReward || 0 : 0,
      }
    : earnedReward;

  const alreadyCompleted = !!completionResult?.alreadyCompleted;

  return (
    <LessonScreenWrapper>
      <View style={styles.container}>
        <LessonHeader title={lesson.title} xp={displayReward.xp} />

        {!showSummary && (
          <LessonProgress
            currentStepIndex={currentStepIndex}
            totalSteps={totalSteps}
            progress={progress}
          />
        )}

        <ScrollView
          style={styles.contentScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {showSummary ? (
            <LessonSummaryCard
              lesson={lesson}
              earnedReward={displayReward}
              alreadyCompleted={alreadyCompleted}
            />
          ) : (
            <LessonStepCard
              step={currentStep}
              selectedAnswer={selectedAnswer}
              onAnswerPress={handleAnswer}
            />
          )}
        </ScrollView>

        <LessonFooter
          showSummary={showSummary}
          canGoNext={canGoNext}
          isLastStep={isLastStep}
          onNext={goToNextStep}
          onBack={onBack}
        />
      </View>

      <WizardMessage
        visible={wizardModal.visible}
        title={wizardModal.title}
        message={wizardModal.message}
        type={wizardModal.type}
        buttonText="NEXT"
        onClose={closeWizardModal}
      />
    </LessonScreenWrapper>
  );
};

export default LessonPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 14,
  },

  contentScroll: {
    flex: 1,
  },

  contentContainer: {
    paddingBottom: 18,
  },
});