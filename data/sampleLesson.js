

export const sampleLesson = {
  title: "Plants",
  aiStatus: "done",
  language: "taglish",
  subjectId: "test-subject",

  introMessage:
    "Hi there, young wizard-in-training! I'm Wizard Tutor, and today we're going to learn a super cool magic trick that plants do. It's called photosynthesis! Ready to begin?",

  interactiveSteps: [
    {
      type: "say",
      text: "Alam mo ba kung paano kumakain ang mga halaman? Hindi sila bumibili sa tindahan tulad natin!",
    },
    {
      type: "ask",
      questionType: "multiple_choice",
      question: "Where do plants get their food?",
      choices: [
        "From the grocery store",
        "They make it themselves",
        "From magic potions",
      ],
      answer: "They make it themselves",
      correctReply:
        "Wow, you got it! Ang galing mo! Plants are amazing chefs!",
      wrongReply:
        "Oops! That's not quite right. Let's try again. Think about what plants need to live.",
    },
    {
      type: "say",
      text: "This process of making food is called photosynthesis. Ang hirap sabihin, noh? Pero ang ganda ng ginagawa nito!",
    },
    {
      type: "ask",
      questionType: "multiple_choice",
      question: "What do plants use to make their food?",
      choices: [
        "Sunlight, water, and air",
        "Moonlight, juice, and candy",
        "Soil, seeds, and fertilizer",
      ],
      answer: "Sunlight, water, and air",
      correctReply:
        "Exactly! Sunlight, water, and something from the air called carbon dioxide are their special ingredients!",
      wrongReply:
        "Not quite! Remember the special ingredients we talked about? Let's try to recall them.",
    },
    {
      type: "say",
      text: "Ang araw ang nagbibigay ng energy. Ang tubig ay galing sa lupa. At ang carbon dioxide ay nasa hangin.",
    },
    {
      type: "ask",
      questionType: "multiple_choice",
      question:
        "What part of the plant helps it soak up water from the ground?",
      choices: ["Leaves", "Roots", "Flowers"],
      answer: "Roots",
      correctReply:
        "Yes! The roots are like straws for the plant, sucking up water!",
      wrongReply:
        "Good try! But the roots are usually under the ground, helping to drink the water.",
    },
  ],

  finalMessage:
    "You've learned about the magical process of photosynthesis! Ang galing mo talaga, apprentice wizard! Keep exploring the wonders of science!",

  reward: {
    gold: 10,
    xp: 20,
  },

  summary: [
    "Plants make their own food through photosynthesis.",
    "They use sunlight, water, and carbon dioxide.",
    "Photosynthesis helps plants grow and live.",
  ],
};