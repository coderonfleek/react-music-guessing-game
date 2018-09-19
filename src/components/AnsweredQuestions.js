import React, { Component } from "react";
import { firestore } from "../firebase";
import config from "../config";

export default class AnsweredQuestions extends Component {
  constructor() {
    super();

    this.state = {
      allAnsweredQuestions: []
    };

    firestore.settings({
      timestampsInSnapshots: true
    });

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
        this.setState(games[0]);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    Player 1
                  </div>
                  <div className="card-body">
                    {this.state.allAnsweredQuestions.map(answered => {
                      return answered.player == 1 ? (
                        <button
                          key={answered.id}
                          className="btn btn-outline-primary btn-block"
                        >
                          {answered.id}
                        </button>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header bg-danger text-white">
                    Player 2
                  </div>
                  <div className="card-body">
                    {this.state.allAnsweredQuestions.map(answered => {
                      return answered.player === 2 ? (
                        <button
                          key={answered.id}
                          className="btn btn-outline-primary btn-block"
                        >
                          {answered.id}
                        </button>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    Player 3
                  </div>
                  <div className="card-body">
                    {this.state.allAnsweredQuestions.map(answered => {
                      return answered.player === 3 ? (
                        <button
                          key={answered.id}
                          className="btn btn-outline-primary btn-block"
                        >
                          {answered.id}
                        </button>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
