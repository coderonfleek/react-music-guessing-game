import React, { Component } from "react";
import { firestore } from "../firebase";
import config from "../config";

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
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
        </div>
      </div>
    );
  }
}
