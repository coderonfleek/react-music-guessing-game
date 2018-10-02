import React, { Component } from "react";
import questions from "../questions";
import scoreLevels from "../scorelevels";
import { firestore } from "../firebase";
import config from "../config";
import _ from "lodash";
import "../App.css";
import { confirmAlert } from "react-confirm-alert";
import "../../node_modules/react-confirm-alert/src/react-confirm-alert.css";
import $ from "jquery";
import lifelines from "../lifelines";
import game from "../game";

export default class Umpire extends Component {
  questions;
  newGameInstance;
  lifelines;
  constructor() {
    super();
    this.questions = questions;
    this.lifelines = lifelines;

    this.newGameInstance = game;

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

  componentDidMount() {
    //Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
  }

  confirmStartNewGame = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to start a new game",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.startNewGame()
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }; //confirmSubmitAnswer

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
    let update = {
      currentPlayer: player
    };

    switch (player) {
      case 1:
        update.currentPlayerLifelines = this.state.player1Lifelines;
        update.currentPlayerName = this.state.player1Name;

        break;

      case 2:
        update.currentPlayerLifelines = this.state.player2Lifelines;
        update.currentPlayerName = this.state.player2Name;
        break;

      case 3:
        update.currentPlayerLifelines = this.state.player3Lifelines;
        update.currentPlayerName = this.state.player3Name;

        break;

      default:
        break;
    }

    this.updateGame(update);
  };

  confirmChangeGameLevel = () => {
    confirmAlert({
      title: "Confirm to submit",
      message:
        "Are you sure you want to change the game level to Level : " +
        (this.state.currentLevel + 1),
      buttons: [
        {
          label: "Yes",
          onClick: () => this.changeGameLevel()
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }; //confirmSubmitAnswer

  changeGameLevel = () => {
    if (this.state.currentLevel < 4) {
      this.updateGame({
        currentLevel: this.state.currentLevel + 1
      });
    }
  };

  submitAnswer = e => {
    if (this.state.currentQuestion !== null) {
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
    }
  }; //submitAnswer

  confirmSubmitAnswer = () => {
    confirmAlert({
      title: "Confirm to submit",
      message:
        "Are you sure you want to confirm answer for Player " +
        this.state.currentPlayer,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.submitAnswer()
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }; //confirmSubmitAnswer

  confirmReducePlayerLevel = () => {
    confirmAlert({
      title: "Confirm to submit",
      message:
        "Are you sure you want to reduce level of Player " +
        this.state.currentPlayer,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.reducePlayerLevel()
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }; //confirmSubmitAnswer

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

  reducePlayerLevel = () => {
    let update = {};
    switch (this.state.currentPlayer) {
      case 1:
        if (this.state.player1Level != 0) {
          update.player1Level = this.state.player1Level - 1;
        }

        break;

      case 2:
        if (this.state.player2Level != 0) {
          update.player2Level = this.state.player2Level - 1;
        }
        break;

      case 3:
        if (this.state.player3Level != 0) {
          update.player3Level = this.state.player3Level - 1;
        }

        break;

      default:
        break;
    }

    this.updateGame(update);
  }; //reducePlayerLevel

  confirmRemovePlayer = player => {
    if (this.state.currentPlayer != player) {
      confirmAlert({
        title: "Confirm to submit",
        message: "Are you sure you want to remove Player " + player,
        buttons: [
          {
            label: "Yes",
            onClick: () => this.removePlayer(player)
          },
          {
            label: "No",
            onClick: () => {}
          }
        ]
      });
    } else {
      alert(
        "You can't remove a player currently in play. Switch player before you remove"
      );
    }
  }; //confirmRemovePlayer

  removePlayer = player => {
    let update = {};
    switch (player) {
      case 1:
        update.player1Removed = true;
        break;

      case 2:
        update.player2Removed = true;
        break;

      case 3:
        update.player3Removed = true;

        break;

      default:
        break;
    }

    this.updateGame(update);
  };

  confirmLifelineUsed = (e, lifeline) => {
    confirmAlert({
      title: "Confirm to submit",
      message:
        "Are you sure you want to remove this lifeline for Player " +
        this.state.currentPlayer,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.lifeLineUsed(e, lifeline)
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }; //confirmLifelineUsed

  lifeLineUsed = (e, lifeline) => {
    let update = {};
    let lifeLinesUpdate;
    console.log(lifeline);
    let lifeLineIndex = this.state.currentPlayerLifelines.indexOf(lifeline);
    //Update the actual player's lifelines
    switch (this.state.currentPlayer) {
      case 1:
        if (this.state.currentPlayerLifelines.length == 1) {
          lifeLinesUpdate = [];
        } else {
          //this.state.player1Lifelines.splice(lifeLineIndex, 1);
          delete this.state.player1Lifelines[lifeLineIndex];
          lifeLinesUpdate = replaceUndefined(this.state.player1Lifelines);
        }

        update.player1Lifelines = lifeLinesUpdate;

        break;

      case 2:
        if (this.state.currentPlayerLifelines.length == 1) {
          lifeLinesUpdate = [];
        } else {
          //this.state.player2Lifelines.splice(lifeLineIndex, 1);
          delete this.state.player2Lifelines[lifeLineIndex];
          lifeLinesUpdate = replaceUndefined(this.state.player2Lifelines);
        }
        update.player2Lifelines = lifeLinesUpdate;
        break;

      case 3:
        if (this.state.currentPlayerLifelines.length == 1) {
          lifeLinesUpdate = [];
        } else {
          //this.state.player3Lifelines.splice(lifeLineIndex, 1);
          delete this.state.player3Lifelines[lifeLineIndex];
          lifeLinesUpdate = replaceUndefined(this.state.player3Lifelines);
        }
        update.player3Lifelines = lifeLinesUpdate;
        break;

      default:
        break;
    }

    //Set the update to that of the current player
    console.log(lifeLinesUpdate);
    update.currentPlayerLifelines = lifeLinesUpdate;
    this.updateGame(update);

    function replaceUndefined(array) {
      let newArray = array.filter(item => {
        if (item === undefined) {
          return null;
        } else {
          return item;
        }
      });

      return newArray;
    }
  }; //lifeLineUsed

  savePlayerNames = e => {
    e.preventDefault();
    let update = {
      player1Name: this.state.player1Name,
      player2Name: this.state.player2Name,
      player3Name: this.state.player3Name
    };
    console.log(this.state);
    this.updateGame(update);
  }; //savePlayerNames

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }; //updateInput

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
            <div className="row">
              <div className="card">
                <div className="card-header">Lifelines</div>
                <ul className="list-group list-group-flush">
                  {this.state.currentPlayerLifelines.map(index => {
                    let lifeline = _.find(this.lifelines, { id: index });
                    return lifeline ? (
                      <li
                        key={index}
                        className="list-group-item"
                        onClick={e => {
                          this.confirmLifelineUsed(e, index);
                        }}
                      >
                        <i className={`fas ${lifeline.icon}`} /> {lifeline.name}
                      </li>
                    ) : (
                      ""
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="row">&nbsp;</div>
            <div className="row">
              <div className="card">
                <div className="card-header">Player Names</div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        name="player1Name"
                        onChange={this.updateInput}
                        className="form-control"
                        value={this.state.player1Name}
                        placeholder="Player 1 Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="player2Name"
                        onChange={this.updateInput}
                        className="form-control"
                        value={this.state.player2Name}
                        placeholder="Player 2 Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="player3Name"
                        onChange={this.updateInput}
                        className="form-control"
                        value={this.state.player3Name}
                        placeholder="Player 3 Name"
                      />
                    </div>
                    <button
                      class="btn btn-primary"
                      onClick={this.savePlayerNames}
                    >
                      Save
                    </button>
                  </form>
                </div>
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
                        <br />
                        Artist : <b>{this.state.currentQuestion.artist}</b>
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
                      {this.state.player1Name}
                    </th>
                    <th scope="col" className="text-danger">
                      {this.state.player2Name}
                    </th>
                    <th scope="col" className="text-primary">
                      {this.state.player3Name}
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
                {!this.state.player1Removed ? (
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-8">
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
                      </div>
                      <div className="col-md-2">
                        <button
                          className="btn btn-danger"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Remove Player 1"
                          onClick={() => {
                            this.confirmRemovePlayer(1);
                          }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                {!this.state.player2Removed ? (
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-8">
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
                      </div>
                      <div className="col-md-2">
                        <button
                          className="btn btn-danger"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Remove Player 2"
                          onClick={() => {
                            this.confirmRemovePlayer(2);
                          }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                {!this.state.player3Removed ? (
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-8">
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
                      </div>
                      <div className="col-md-2">
                        <button
                          className="btn btn-danger"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Remove Player 3"
                          onClick={() => {
                            this.confirmRemovePlayer(3);
                          }}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>

            <div className="row">&nbsp;</div>

            <div className="card">
              <div className="card-header">Game Controls</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.confirmSubmitAnswer}
                  >
                    Confirm Answer
                  </button>
                </li>
                <li className="list-group-item">
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={this.confirmReducePlayerLevel}
                  >
                    Reduce Player Level
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
                    onClick={this.confirmChangeGameLevel}
                  >
                    Next Game Level
                  </button>
                </li>
                <li className="list-group-item">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={this.confirmStartNewGame}
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
