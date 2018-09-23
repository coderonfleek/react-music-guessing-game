import scoreLevels from "./scorelevels";
let defaultLifelines = [1, 2, 3];
const newGameInstance = {
  currentLevel: 1,
  currentQuestion: null,
  answerSelected: false,
  selectedAnswer: null,
  noOfQuestionsPerLevel: 3,
  noOfQuestionsAnsweredInLevel: 0,
  allAnsweredQuestions: [],
  scoreLevels: scoreLevels.reverse(),
  totalScore: 0,
  bonusPoints: 0,
  selectedBonus: 30,
  currentPlayer: 1,
  player1Level: 0,
  player2Level: 0,
  player3Level: 0,
  songPlaying: false,
  player1Removed: false,
  player2Removed: false,
  player3Removed: false,
  player1Lifelines: defaultLifelines,
  player2Lifelines: defaultLifelines,
  player3Lifelines: defaultLifelines,
  currentPlayerLifelines: defaultLifelines,
  gameInitiationTime: +new Date()
};

export default newGameInstance;
