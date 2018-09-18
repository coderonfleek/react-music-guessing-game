import React, { Component } from "react";
import questions from "../questions";
import scoreLevels from "../scorelevels";
import "../App.css";

import { firestore } from "../firebase";
import config from "../config";

class Umpire extends Component {
  questions;
  gameID;
  gameRef;
  selectedOptionElement;
  audio = new Audio();
  constructor() {
    super();
    this.questions = questions;
    this.state = {
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
      selectedBonus: 30
    };

    firestore.settings({
      timestampsInSnapshots: true
    });

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
  }
  componentDidMount() {}

  setBonusValue = e => {
    this.setState({
      selectedBonus: e.target.value
    });
  }; //setAnswer

  lifeLineUsed = (e, num, points) => {
    console.log(num);
    let update;
    let subtraction;
    switch (num) {
      case 1:
        update = { lifeline1Used: true };

        break;

      case 2:
        update = { lifeline2Used: true };

        break;

      case 3:
        update = { lifeline3Used: true };

        break;

      case 4:
        update = { lifeline4Used: true };
        break;

      default:
        break;
    }

    if (update !== null) {
      //Subtract 200 points for each life line
      if (this.state.bonusPoints > points) {
        update.bonusPoints = this.state.bonusPoints - points;
        this.updateGame(update);
        e.target.classList.add("used-lifeline");
      }
    }
  }; //lifeLineUsed

  returnToGamePage = () => {
    let update = { songSelected: false, gamePage: true };

    this.updateGame(update);
  };

  selectSong = question => {
    if (this.selectedOptionElement) {
      this.selectedOptionElement.classList.remove("selectedAnswer");
    }

    this.setState({
      currentQuestion: question,
      answerSelected: false,
      selectedAnswer: null
    });

    this.audio.src = question.file;
    this.audio.play();

    setTimeout(() => {
      this.audio.pause();
    }, 20000);
  };

  chooseAnswer = (e, option) => {
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
    let totalQuestionsAnsweredInLevel =
      Number(this.state.noOfQuestionsAnsweredInLevel) + 1;

    console.log(totalQuestionsAnsweredInLevel);

    let update = {
      allAnsweredQuestions: [
        ...this.state.allAnsweredQuestions,
        this.state.currentQuestion
      ],
      totalScore:
        Number(this.state.totalScore) +
        Number(this.state.currentQuestion.scoreWeight)
    };

    //If all questions in level are already answered, move to next level
    if (totalQuestionsAnsweredInLevel === 3) {
      update.noOfQuestionsAnsweredInLevel = 0;
      update.currentLevel = Number(this.state.currentLevel) + 1;
    } else {
      update.noOfQuestionsAnsweredInLevel = totalQuestionsAnsweredInLevel;
    }
    this.updateGame(update);
  }; //submitAnswer

  addBonusPoints = () => {
    console.log(this.state.selectedBonus);
    this.updateGame({
      bonusPoints:
        Number(this.state.bonusPoints) + Number(this.state.selectedBonus)
    });
  }; //addBonusPoints

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
            <div className="card border-secondary mb-3">
              <div className="card-header">Score Level</div>
              <div className="card-body text-secondary">
                <h5 className="card-title">Total : {this.state.totalScore}</h5>
                <ul className="list-group list-group-flush">
                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-dark"
                  >
                    Level 3
                  </a>
                  {this.state.scoreLevels.map(score => {
                    if (score.level === 3) {
                      if (score.totalScore === this.state.totalScore) {
                        return (
                          <li
                            key={score.totalScore}
                            className="list-group-item active"
                          >
                            {score.totalScore}
                          </li>
                        );
                      } else {
                        return (
                          <li
                            key={score.totalScore}
                            className="list-group-item"
                          >
                            {score.totalScore}
                          </li>
                        );
                      }
                    }
                  })}
                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-dark"
                  >
                    Level 2
                  </a>
                  {this.state.scoreLevels.map(score => {
                    if (score.level === 2) {
                      if (score.totalScore === this.state.totalScore) {
                        return (
                          <li
                            key={score.totalScore}
                            className="list-group-item active"
                          >
                            {score.totalScore}
                          </li>
                        );
                      } else {
                        return (
                          <li
                            key={score.totalScore}
                            className="list-group-item"
                          >
                            {score.totalScore}
                          </li>
                        );
                      }
                    }
                  })}
                  <a
                    href="#"
                    className="list-group-item list-group-item-action list-group-item-dark"
                  >
                    Level 1
                  </a>
                  {this.state.scoreLevels.map(score => {
                    if (score.level === 1) {
                      if (score.totalScore === this.state.totalScore) {
                        return (
                          <li
                            key={score.totalScore}
                            className="list-group-item active"
                          >
                            {score.totalScore}
                          </li>
                        );
                      } else {
                        return (
                          <li
                            key={score.totalScore}
                            className="list-group-item"
                          >
                            {score.totalScore}
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-secondary mb-3">
              <div className="card-header">Music Numbers</div>
              <div className="card-body text-secondary">
                <h5 className="card-title">Title</h5>
                {this.questions.map(question => {
                  if (question.level === this.state.currentLevel) {
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
                {/*
                <div className="row justify-content-md-center">
                  <div className="col-md-8">
                    {this.state.currentQuestion ? (
                      <p align="center">
                        {this.state.currentQuestion.question}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">&nbsp;</div>
                
                <div className="row justify-content-md-center">
                  {this.state.currentQuestion ? (
                    <div className="col-md-12">
                      <div className="row">
                        <div
                          className="col-md-6 questionOption"
                          onClick={e => {
                            this.chooseAnswer(
                              e,
                              this.state.currentQuestion.options[0]
                            );
                          }}
                        >
                          {this.state.currentQuestion.options[0].name}.{" "}
                          {this.state.currentQuestion.options[0].body}
                        </div>
                        <div
                          className="col-md-6 questionOption"
                          onClick={e => {
                            this.chooseAnswer(
                              e,
                              this.state.currentQuestion.options[1]
                            );
                          }}
                        >
                          {this.state.currentQuestion.options[1].name}.{" "}
                          {this.state.currentQuestion.options[1].body}
                        </div>
                      </div>
                      <div className="row">
                        <div
                          className="col-md-6 questionOption"
                          onClick={e => {
                            this.chooseAnswer(
                              e,
                              this.state.currentQuestion.options[2]
                            );
                          }}
                        >
                          {this.state.currentQuestion.options[2].name}.{" "}
                          {this.state.currentQuestion.options[2].body}
                        </div>
                        <div
                          className="col-md-6 questionOption"
                          onClick={e => {
                            this.chooseAnswer(
                              e,
                              this.state.currentQuestion.options[3]
                            );
                          }}
                        >
                          {this.state.currentQuestion.options[3].name}.{" "}
                          {this.state.currentQuestion.options[3].body}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                */}
                {/* Answer Button */}
                {this.state.currentQuestion ? (
                  <p align="center">
                    <button
                      className="btn btn-primary"
                      onClick={this.submitAnswer}
                    >
                      Confirm Correct Answer
                    </button>
                  </p>
                ) : (
                  ""
                )}

                
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-secondary mb-3">
              <div className="card-header">Points</div>
              <div className="card-body text-secondary">
                <h5 className="card-title">Life Lines</h5>
                <ul className="list-group list-group-flush">
                  <li
                    className="list-group-item"
                    onClick={e => {
                      this.lifeLineUsed(e, 1, 100);
                    }}
                  >
                    <i className="fas fa-phone" /> Repeat Beat
                  </li>
                  <li
                    className="list-group-item"
                    onClick={e => {
                      this.lifeLineUsed(e, 2, 150);
                    }}
                  >
                    <i className="fas fa-users" /> Repeat 5 Seconds
                  </li>
                  <li
                    className="list-group-item"
                    onClick={e => {
                      this.lifeLineUsed(e, 3, 250);
                    }}
                  >
                    <i className="fas fa-percentage" /> Reveal 2 Letters
                  </li>
                  <li
                    className="list-group-item"
                    onClick={e => {
                      this.lifeLineUsed(e, 4, 300);
                    }}
                  >
                    <i className="fas fa-percentage" /> Skip Beat
                  </li>
                </ul>
                <p>&nbsp;</p>
                <p align="center">
                  Bonus : {this.state.bonusPoints}
                  <br />
                  <select
                    onChange={this.setBonusValue}
                    className="form-control"
                  >
                    <option value="30">30 Points</option>
                    <option value="40">40 Points</option>
                    <option value="50">50 Points</option>
                    <option value="60">60 Points</option>
                  </select>
                  <br />
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={this.addBonusPoints}
                  >
                    Add Bonus Points
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Umpire;
