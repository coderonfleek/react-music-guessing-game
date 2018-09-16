import React, { Component } from "react";
import questions from "../questions";
import scoreLevels from "../scorelevels";
import "../App.css";

export default class Umpire extends Component {
  questions;
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
      scoreLevels: scoreLevels.reverse(),
      totalScore: 0,
      bonusPoints: 0,
      selectedBonus: 30,
      currentPlayer: 1,
      player1Level: 0,
      player2Level: 0,
      player3Level: 0
    };
  }

  setCurrentPlayer = player => {
    this.setState({
      currentPlayer: player
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
                <a href="#" class="btn btn-primary">
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
              </div>
            </div>

            <div className="row">&nbsp;</div>

            <div class="card">
              <div class="card-header">Score board</div>
              <table class="table table-bordered">
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
              <div className="card-header">Set Current Player</div>
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
                  <button className="btn btn-primary btn-block">
                    Confirm Answer
                  </button>
                </li>
                <li className="list-group-item">
                  <button className="btn btn-success btn-block">
                    Change Game Level
                  </button>
                </li>
                <li className="list-group-item">
                  <button className="btn btn-danger btn-block">
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
