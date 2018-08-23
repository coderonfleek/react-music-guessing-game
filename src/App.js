import React, { Component } from "react";
import questions from "./questions";
import scoreLevels from "./scorelevels";
import "./App.css";

class App extends Component {
  questions;
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
      scoreLevels: scoreLevels.reverse()
    };
  }
  componentDidMount() {}

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
                        {this.state.currentQuestion.question}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">&nbsp;</div>
                {/* Options */}
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

                {/* Answer Button */}
                {this.state.currentQuestion ? (
                  <p align="center">
                    <button
                      className="btn btn-primary"
                      onClick={this.submitAnswer}
                    >
                      Submit Answer
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
                <h5 className="card-title">Title</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
