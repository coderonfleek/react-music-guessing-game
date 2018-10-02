import React, { Component } from "react";
import questions from "../questions";
import scoreLevels from "../scorelevels";
//import "./App.css";
import "../main.css";
import "../main2.css";
import logo from "../logo.png";
import { firestore } from "../firebase";
import config from "../config";
import _ from "lodash";
import lifelines from "../lifelines";
import game from "../game";

class Game extends Component {
  questions;
  gameID;
  gameRef;
  selectedOptionElement;
  lifelines;
  audio = new Audio();
  constructor() {
    super();
    this.questions = questions;

    firestore.settings({
      timestampsInSnapshots: true
    });

    this.lifelines = lifelines;

    //Create a new game instance
    let newGameInstance = game;

    this.state = newGameInstance;

    //Get Current Game
    firestore
      .collection(config.gameCollection)
      .orderBy("gameInitiationTime", "desc")
      .limit(1)
      .onSnapshot(querySnapshot => {
        var games = [];
        querySnapshot.forEach(doc => {
          this.gameRef = firestore
            .collection(config.gameCollection)
            .doc(doc.id);
          games.push(doc.data());
        });

        console.log(games);
        this.setState(games[0], () => {
          //If a song has been selected, play it
          if (this.state.songPlaying) {
            this.playSelectedSong(this.state.currentQuestion);
          }
        });
      });
  }
  componentDidMount() {}

  selectSong = question => {
    if (this.selectedOptionElement) {
      this.selectedOptionElement.classList.remove("selectedAnswer");
    }
    if (!this.alreadyAnswered(question)) {
      this.updateGame({
        currentQuestion: question,
        answerSelected: false,
        selectedAnswer: null,
        timerStartingPoint: 20,
        songSelected: true,
        gamePage: false
      });

      this.audio.src = question.file;
      this.audio.play();

      let timerInterval = setInterval(() => {
        this.setState({
          timerStartingPoint: this.state.timerStartingPoint - 1
        });
      }, 1000);

      setTimeout(() => {
        this.audio.pause();
        this.updateGame({
          timerStartingPoint: 0,
          songPlaying: false
        });
        clearInterval(timerInterval);
      }, 20000);
    }
  }; //selectSong

  playSelectedSong = question => {
    if (!this.alreadyAnswered(question)) {
      this.setState({
        timerStartingPoint: 20,
        songSelected: true,
        gamePage: false
      });
      this.updateGame({
        timerStartingPoint: 20,
        songSelected: true,
        gamePage: false
      });

      this.audio.src = question.file;
      this.audio.play();

      let timerInterval = setInterval(() => {
        if (this.state.timerStartingPoint > 0) {
          this.setState({
            timerStartingPoint: this.state.timerStartingPoint - 1
          });
        }
      }, 1000);

      setTimeout(() => {
        this.audio.pause();

        this.setState({
          timerStartingPoint: 0,
          songPlaying: false
        });

        this.updateGame({
          songPlaying: false
        });
        clearInterval(timerInterval);
      }, 20000);
    }
  }; //playSelectedSong

  alreadyAnswered = question => {
    if (question) {
      console.log(question);
      console.log(this.state.allAnsweredQuestions);

      let found = _.find(this.state.allAnsweredQuestions, { id: question.id });

      return !!found;
    }

    return false;
  }; //alreadyAnswered

  updateGame = update => {
    return this.gameRef
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
                <div id="score-level-title">PLAYER IN PLAY</div>
                <div id="activePlayerDisplay">
                  {this.state.currentPlayer}

                  <div id="activePlayerName">
                    {this.state.currentPlayerName}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {!this.state.songSelected || this.state.gamePage ? (
                <div className="music-numbers">
                  <div className="music-numbers-title">PLAYLIST</div>
                  <div className="music-numbers-title-base" />
                  <div className="music-numbers-board">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="music-numbers-board-level">
                          {this.state.currentLevel == 4
                            ? "TIE BREAKER ROUND"
                            : `LEVEL ${this.state.currentLevel}`}
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
                </div>
              )}
            </div>
            <div className="col-md-3 col-md-offset-2">
              <div className="game-assistants">
                <div id="game-assistants-title">GAME ASSISTANTS</div>
                <div>&nbsp;</div>
                <div className="game-assistants-features">
                  {this.state.currentPlayerLifelines.map(index => {
                    let lifeline = _.find(this.lifelines, { id: index });
                    return (
                      <div className="feature">
                        <button id="repeat-beat">{lifeline.name}</button>
                      </div>
                    );
                  })}
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
