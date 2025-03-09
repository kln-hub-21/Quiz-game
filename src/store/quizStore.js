import { create } from "zustand";

const useQuizStore = create((set) => ({

  // ----------------mcq quiz start here------------------------------------
  questions: [
    { id: 1, text: "What is React?", type: "mcq", options: ["Library", "Framework", "Language"], correct: "Library" },
    { id: 2, text: "Is Next.js a framework?", type: "mcq", options: ["Yes", "No"], correct: "Yes" },
    { id: 3, text: "Who created JavaScript?", type: "text", correct: "Brendan Eich" },
    { id: 4, text: "What is the capital of India?", type: "mcq", options: ["Delhi", "Mumbai", "Chennai"], correct: "Delhi" },
    { id: 5, text: "Is Node.js single-threaded?", type: "mcq", options: ["Yes", "No"], correct: "Yes" }
  ],
  currentQuestionIndex: 0,
  userAnswers: {},
  quizCompleted: false, // questions completed
  quizSubmitted:false,  // quiz submitted by user after completion of questions

  setAnswer: (questionId, answer) =>
    set((state) => {

      const newAnswers = { ...state.userAnswers, [questionId]: answer };
      const nextIndex = state.currentQuestionIndex < state.questions.length-1 ? state.currentQuestionIndex + 1 : state.currentQuestionIndex;

      return {
        userAnswers: newAnswers,
        currentQuestionIndex: nextIndex,
        quizCompleted: Object.keys(newAnswers).length >= state.questions.length, // Marks quiz as completed
      };
    }),

  submitQuiz: () => set({ quizCompleted: true ,quizSubmitted:true}),

  resetQuiz: () => set({
    userAnswers: {},
    currentQuestionIndex: 0,
    quizCompleted: false,
    quizSubmitted:false
  }),

  // -------------------------mcq quiz ends here---------------------------------------



  //--------------------------chat quiz data starts here ------------------------------

  chatQuestions : [ { id: 1, text: "What is the capital of india?", type: "text",  correct: "Delhi" },
  { id: 2, text: "Is Next.js a framework?", type: "text",  correct: "Yes" },
  { id: 3, text: "What is the capital of Telangana?", type: "text", correct: "Hyderabad" },
  { id: 4, text: "Is ReactJS a library or framework?", type: "text",  correct: "Library" },
  { id: 5, text: "Is Node.js single-threaded?", type: "text",  correct: "Yes" }
],
  chatCurrentQuestionIndex: 0,
  chatUserAnswers: [],
  chatQuizCompleted: false, // questions completed
  chatQuizSubmitted:false,

  setChatAnswer: (questionId, answer) =>
    set((state) => {
      console.log("zusland")

      const newAnswers = { ...state.chatUserAnswers, [questionId]: answer };
      const nextIndex = state.chatCurrentQuestionIndex < state.chatQuestions.length-1 ? state.chatCurrentQuestionIndex + 1 : state.chatCurrentQuestionIndex;

      return {
        chatUserAnswers: newAnswers,
        chatCurrentQuestionIndex: nextIndex,
        chatQuizCompleted: Object.keys(newAnswers).length >= state.questions.length, // Marks quiz as completed
      };
    }),

  submitChatQuiz: () => set({ chatQuizCompleted: true ,chatQuizSubmitted:true}),

  resetChatQuiz: () => set({
    chatUserAnswers: {},
    chatCurrentQuestionIndex: 0,
    chatQuizCompleted: false,
    chatQuizSubmitted:false
  }),



}));




export default useQuizStore;
