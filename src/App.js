import React, { Component } from "react";
import questions from "./questions";
import "./App.css";

class App extends Component {
  questions;
  constructor() {
    super();
    this.questions = questions;
    this.state = {
      currentLevel: 1,
      currentQuestion: null,
      noOfQuestionsPerLevel: 3,
      noOfQuestionsAnsweredInLevel: 0,
      allAnsweredQuestions: []
    };
  }
  componentDidMount() {}

  selectSong = question => {
    this.setState({
      currentQuestion: question
    });
    let audio = new Audio();

    audio.src = question.file;
    audio.play();

    setTimeout(function() {
      audio.pause();
    }, 20000);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card border-secondary mb-3">
              <div className="card-header">Score Level</div>
              <div className="card-body text-secondary">
                <h5 className="card-title">Title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
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
                <div className="row justify-content-md-center">
                  {this.state.currentQuestion ? (
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6 questionOption">
                          {this.state.currentQuestion.options[0].name}.{" "}
                          {this.state.currentQuestion.options[0].body}
                        </div>
                        <div className="col-md-6 questionOption">
                          {this.state.currentQuestion.options[1].name}.{" "}
                          {this.state.currentQuestion.options[1].body}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 questionOption">
                          {this.state.currentQuestion.options[2].name}.{" "}
                          {this.state.currentQuestion.options[2].body}
                        </div>
                        <div className="col-md-6 questionOption">
                          {this.state.currentQuestion.options[3].name}.{" "}
                          {this.state.currentQuestion.options[3].body}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
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
