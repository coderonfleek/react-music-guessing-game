import React, { Component } from "react";
import { firestore } from "../firebase";
import config from "../config";
import logo from "../new-logo.png";
import "../scoreboard.css";

export default class ScoreBoard extends Component {
  constructor() {
    super();

    this.state = {
      scoreLevels: []
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
      <div className="container-fluid" id="scoredboard">
        <div className="row">
          <div className="col-md-3">
            <img src={logo} className="img-fluid" />
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header" id="scoreboard-header">
                Score board
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" className="bg-gold">
                      #
                    </th>
                    <th scope="col" className="text-success bg-light">
                      Player 1
                    </th>
                    <th scope="col" className="text-danger bg-light">
                      Player 2
                    </th>
                    <th scope="col" className="text-primary bg-light">
                      Player 3
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.scoreLevels.map(level => {
                    return (
                      <tr key={level.level}>
                        <th scope="row" className="prizesColumn">
                          <span className="prizeMoney">{level.prize}</span>{" "}
                        </th>
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
        </div>
      </div>
    );
  }
}
