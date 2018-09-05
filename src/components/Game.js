import React, { Component } from "react";
import questions from "../questions";
import scoreLevels from "../scorelevels";
//import "./App.css";
import "../main.css";
import "../main2.css";
import logo from "../logo.png";
import { firestore } from "../firebase";
import config from "../config";

class Game extends Component {
  questions;
  gameID;
  gameRef;
  selectedOptionElement;
  audio = new Audio();
  constructor() {
    super();
    this.questions = questions;

    firestore.settings({
      timestampsInSnapshots: true
    });

    //Create a new game instance
    let newGameInstance = {
      currentLevel: 1,
      currentQuestion: null,
      answerSelected: false,
      selectedAnswer: null,
      noOfQuestionsPerLevel: 3,
      noOfQuestionsAnsweredInLevel: 0,
      allAnsweredQuestions: [],
      totalScore: 0,
      scoreLevels: scoreLevels.reverse(),
      bonusPoints: 0,
      timerStartingPoint: 20,
      songSelected: false,
      gameInitiationTime: +new Date(),
      lifeline1Used: false,
      lifeline2Used: false,
      lifeline3Used: false,
      lifeline4Used: false,
      gamePage: true
    };

    this.state = newGameInstance;

    firestore
      .collection(config.gameCollection)
      .add(newGameInstance)
      .then(docRef => {
        console.log(docRef);
        this.gameRef = docRef;
        console.log(`DocRef ID : ${docRef.id}`);
        this.gameID = docRef.id;

        //Setup realtime tracking of the game
        firestore
          .collection(config.gameCollection)
          .orderBy("gameInitiationTime", "desc")
          .limit(1)
          .onSnapshot(querySnapshot => {
            var games = [];
            querySnapshot.forEach(function(doc) {
              games.push(doc.data());
            });

            console.log(games);
            this.setState(games[0]);
          });
      })
      .catch(err => {
        console.log("Could not start game");
        console.log(err);
      });
  }
  componentDidMount() {}

  selectSong = question => {
    if (this.selectedOptionElement) {
      this.selectedOptionElement.classList.remove("selectedAnswer");
    }

    this.updateGame({
      currentQuestion: question,
      answerSelected: false,
      selectedAnswer: null,
      timerStartingPoint: 20,
      songSelected: true,
      gamePage: false
    });

    /* this.setState({
      currentQuestion: question,
      answerSelected: false,
      selectedAnswer: null,
      timerStartingPoint: 20,
      songSelected: true
    }); */

    this.audio.src = question.file;
    this.audio.play();

    let timerInterval = setInterval(() => {
      this.setState({
        timerStartingPoint: this.state.timerStartingPoint - 1
      });
    }, 1000);

    setTimeout(() => {
      this.audio.pause();
      this.setState({
        timerStartingPoint: 0
      });
      clearInterval(timerInterval);
    }, 20000);
  };

  /* chooseAnswer = (e, option) => {
    if (!this.state.answerSelected) {
      this.selectedOptionElement = e.target;
      e.target.classList.add("selectedAnswer");

      console.log(option);
      this.setState({
        answerSelected: true,
        selectedAnswer: option
      });
    }
  }; //chooseAnswer

  submitAnswer = e => {
    if (
      this.state.selectedAnswer &&
      this.state.selectedAnswer.name === this.state.currentQuestion.answer
    ) {
      this.setState({
        noOfQuestionsAnsweredInLevel:
          this.state.noOfQuestionsAnsweredInLevel + 1,
        allAnsweredQuestions: [
          ...this.state.allAnsweredQuestions,
          this.state.currentQuestion
        ],
        totalScore:
          this.state.totalScore + this.state.currentQuestion.scoreWeight
      });
    }
  }; //submitAnswer

  addBonusPoints = () => {
    this.setState({
      bonusPoints: this.state.bonusPoints + 5
    });
  }; //addBonusPoints */

  alreadyAnswered = question => {
    return this.state.allAnsweredQuestions.indexOf(question) !== -1;
  }; //alreadyAnswered

  updateGame = update => {
    this.gameRef
      .update(update)
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row game">
            <div className="col-md-3">
              <div id="score-level">
                <div id="score-level-title">SCORE LEVEL</div>
                <div id="score-level-total">TOTAL: {this.state.totalScore}</div>
                <div id="levels">
                  <div id="level_3">
                    <div className="level-title">LEVEL 3</div>
                    {this.state.scoreLevels.map(score => {
                      if (score.level === 3) {
                        if (score.totalScore === this.state.totalScore) {
                          return (
                            <div
                              key={score.totalScore}
                              className="score-level-numbers"
                            >
                              {score.totalScore}
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={score.totalScore}
                              className="score-level-numbers"
                            >
                              {score.totalScore}
                            </div>
                          );
                        }
                      }
                    })}
                  </div>
                  <div id="level_2">
                    <div className="level-title">LEVEL 2</div>

                    {this.state.scoreLevels.map(score => {
                      if (score.level === 2) {
                        if (score.totalScore === this.state.totalScore) {
                          return (
                            <div
                              key={score.totalScore}
                              className="score-level-numbers"
                            >
                              {score.totalScore}
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={score.totalScore}
                              className="score-level-numbers"
                            >
                              {score.totalScore}
                            </div>
                          );
                        }
                      }
                    })}
                  </div>
                  <div id="level_1">
                    <div className="level-title">LEVEL 1</div>
                    {this.state.scoreLevels.map(score => {
                      if (score.level === 1) {
                        if (score.totalScore === this.state.totalScore) {
                          return (
                            <div
                              key={score.totalScore}
                              className="score-level-numbers  score-level-start"
                            >
                              {score.totalScore}
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={score.totalScore}
                              className="score-level-numbers"
                            >
                              {score.totalScore}
                            </div>
                          );
                        }
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {!this.state.songSelected || this.state.gamePage ? (
                <div className="music-numbers">
                  <div className="music-numbers-title">MUSIC NUMBERS</div>
                  <div className="music-numbers-title-base" />
                  <div className="music-numbers-board">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="music-numbers-board-level">
                          LEVEL {this.state.currentLevel}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="music-numbers-buttons" id="first">
                          {this.questions.map(question => {
                            if (
                              question.level === this.state.currentLevel &&
                              !this.alreadyAnswered(question)
                            ) {
                              return (
                                <button
                                  key={question.id}
                                  className="individual-button"
                                  onClick={() => {
                                    this.selectSong(question);
                                  }}
                                >
                                  {question.id}
                                </button>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="music-numbers">
                  <div className="music-numbers-title">MUSIC NUMBERS</div>
                  <div id="timer-number-box">
                    <div id="timer">
                      0:
                      {this.state.timerStartingPoint}
                    </div>
                    <div className="chosen-number-box">
                      <div className="chosen-number">
                        {this.state.currentQuestion.id}
                      </div>
                    </div>
                  </div>

                  <div className="title-container">
                    <div className="title">WHAT IS THE TITLE OF THIS SONG?</div>
                  </div>
                  <div className="answer-section">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="answer-board" id="answer-board-1">
                          Record Label
                        </div>
                        <div className="answer-points" id="answer-points-30">
                          POINTS <span>30</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="answer-board" id="answer-board-2">
                          Release Date
                        </div>
                        <div className="answer-points" id="answer-points-50">
                          POINTS <span>50</span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="answer-board" id="answer-board-3">
                          Artist
                        </div>
                        <div className="answer-points" id="answer-points-50-2">
                          POINTS <span>50</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="answer-board" id="answer-board-4">
                          Producer
                        </div>
                        <div className="answer-points" id="answer-points-70">
                          POINTS <span>70</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-3 col-md-offset-2">
              <div className="game-assistants">
                <div id="game-assistants-title">GAME ASSISTANTS</div>
                <div id="game-assistants-points">POINTS</div>
                <div id="game-assistants-points-numbers">
                  {this.state.bonusPoints}
                </div>
                <div className="game-assistants-features">
                  <div className="feature">
                    <button id="repeat-beat">REPEAT BEAT</button>
                    &nbsp;-100
                  </div>
                  <div className="feature">
                    <button id="repeat-5-seconds">REPEAT +5 SECONDS</button>
                    &nbsp;-150
                  </div>
                  <div className="feature">
                    <button id="reveal-2-letters">REVEAL 2 LETTERS</button>
                    &nbsp;-250
                  </div>
                  <div className="feature">
                    <button id="skip-beats">SKIP BEATS</button>
                    &nbsp;-300
                  </div>
                </div>
                <div className="game-logo">
                  <img src={logo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
