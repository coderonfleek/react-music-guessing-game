import React, { Component } from "react";
import questions from "../questions";
import scoreLevels from "../scorelevels";
import { firestore } from "../firebase";
import config from "../config";
import _ from "lodash";
import "../App.css";

export default class Umpire extends Component {
  questions;
  newGameInstance;
  constructor() {
    super();
    this.questions = questions;

    this.newGameInstance = {
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
      gameInitiationTime: +new Date()
    };

    //Default state to empty game
    this.state = this.newGameInstance;

    firestore.settings({
      timestampsInSnapshots: true
    });

    //Pick last existing game session and setup realtime game tracking
    firestore
      .collection(config.gameCollection)
      .orderBy("gameInitiationTime", "desc")
      .limit(1)
      .onSnapshot(querySnapshot => {
        var games = [];
        querySnapshot.forEach(doc => {
          console.log(doc.id);
          //get the gameref from the only existing doc
          this.gameRef = firestore
            .collection(config.gameCollection)
            .doc(doc.id);
          games.push(doc.data());
        });

        console.log(games);
        this.setState(games[0]);
      });
  } //constructor

  startNewGame = () => {
    firestore
      .collection(config.gameCollection)
      .add(this.newGameInstance)
      .then(docRef => {
        console.log(docRef);
        this.gameRef = docRef;
        console.log(`DocRef ID : ${docRef.id}`);
        this.gameID = docRef.id;
      })
      .catch(err => {
        console.log("Could not start game");
        console.log(err);
      });
  }; //startNewGame

  selectSong = question => {
    this.updateGame({
      currentQuestion: question,
      songPlaying: true
    });
  }; //selectSong

  setCurrentPlayer = player => {
    this.updateGame({
      currentPlayer: player
    });
  };

  changeGameLevel = () => {
    if (this.state.currentLevel < 3) {
      this.updateGame({
        currentLevel: this.state.currentLevel + 1
      });
    }
  };

  submitAnswer = e => {
    let totalQuestionsAnsweredInLevel =
      Number(this.state.noOfQuestionsAnsweredInLevel) + 1;

    console.log(totalQuestionsAnsweredInLevel);

    //Attach player to question answered
    this.state.currentQuestion.player = this.state.currentPlayer;

    let update = {
      allAnsweredQuestions: [
        ...this.state.allAnsweredQuestions,
        this.state.currentQuestion
      ],
      totalScore:
        Number(this.state.totalScore) +
        Number(this.state.currentQuestion.scoreWeight)
    };

    //Set total questions answered
    update.noOfQuestionsAnsweredInLevel = totalQuestionsAnsweredInLevel;
    //Increase player level
    switch (this.state.currentPlayer) {
      case 1:
        update.player1Level = this.state.player1Level + 1;
        break;

      case 2:
        update.player2Level = this.state.player2Level + 1;
        break;

      case 3:
        update.player3Level = this.state.player3Level + 1;
        break;

      default:
        break;
    }

    this.updateGame(update);
  }; //submitAnswer

  returnToGamePage = () => {
    let update = { songSelected: false, gamePage: true };

    this.updateGame(update);
  };

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
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">Lifelines</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Playlist</div>
              <div className="card-body">
                {this.questions.map(question => {
                  if (
                    question.level === this.state.currentLevel &&
                    !this.alreadyAnswered(question)
                  ) {
                    return (
                      <div
                        key={question.id}
                        className="songOption"
                        onClick={() => {
                          this.selectSong(question);
                        }}
                      >
                        <div className="loudHouse">{question.id}</div>
                      </div>
                    );
                  }
                })}
                <div className="clear">&nbsp;</div>
                <hr />
                <div className="row">&nbsp;</div>
                <div className="row justify-content-md-center">
                  <div className="col-md-8">
                    {this.state.currentQuestion ? (
                      <p align="center">
                        Curent Question : <b>{this.state.currentQuestion.id}</b>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row justify-content-md-center">
                  <div className="col-md-8">
                    {this.state.currentQuestion ? (
                      <p align="center">
                        Answer : <b>{this.state.currentQuestion.answer}</b>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">&nbsp;</div>

            <div className="card">
              <div className="card-header">Score board</div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" className="text-success">
                      Player 1
                    </th>
                    <th scope="col" className="text-danger">
                      Player 2
                    </th>
                    <th scope="col" className="text-primary">
                      Player 3
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.scoreLevels.map(level => {
                    return (
                      <tr key={level.level}>
                        <th scope="row">{level.prize}</th>
                        {this.state.player1Level == level.level ? (
                          <td className="bg-success">&nbsp;</td>
                        ) : (
                          <td>&nbsp;</td>
                        )}
                        {this.state.player2Level == level.level ? (
                          <td className="bg-danger">&nbsp;</td>
                        ) : (
                          <td>&nbsp;</td>
                        )}
                        {this.state.player3Level == level.level ? (
                          <td className="bg-primary">&nbsp;</td>
                        ) : (
                          <td>&nbsp;</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">
                Current Player :{" "}
                <span className="text-primary">{this.state.currentPlayer}</span>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button
                    className={
                      "btn " +
                      (this.state.currentPlayer == 1
                        ? "btn-outline-primary"
                        : "btn-outline-dark") +
                      " btn-block"
                    }
                    onClick={() => {
                      this.setCurrentPlayer(1);
                    }}
                  >
                    Player 1
                  </button>
                </li>
                <li className="list-group-item">
                  <button
                    className={
                      "btn " +
                      (this.state.currentPlayer == 2
                        ? "btn-outline-primary"
                        : "btn-outline-dark") +
                      " btn-block"
                    }
                    onClick={() => {
                      this.setCurrentPlayer(2);
                    }}
                  >
                    Player 2
                  </button>
                </li>
                <li className="list-group-item">
                  <button
                    className={
                      "btn " +
                      (this.state.currentPlayer == 3
                        ? "btn-outline-primary"
                        : "btn-outline-dark") +
                      " btn-block"
                    }
                    onClick={() => {
                      this.setCurrentPlayer(3);
                    }}
                  >
                    Player 3
                  </button>
                </li>
              </ul>
            </div>

            <div className="row">&nbsp;</div>

            <div className="card">
              <div className="card-header">Game Controls</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.submitAnswer}
                  >
                    Confirm Answer
                  </button>
                </li>
                {this.state.currentQuestion ? (
                  <li className="list-group-item">
                    <button
                      className="btn btn-warning btn-block"
                      onClick={this.returnToGamePage}
                    >
                      Return to Game Page
                    </button>
                  </li>
                ) : (
                  ""
                )}
                <li className="list-group-item">
                  <button
                    className="btn btn-success btn-block"
                    onClick={this.changeGameLevel}
                  >
                    Next Game Level
                  </button>
                </li>
                <li className="list-group-item">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={this.startNewGame}
                  >
                    Start New Game
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
