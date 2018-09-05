import React, { Component } from "react";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    firestore.settings({
      timestampsInSnapshots: true
    });
    //Fetch High Scores with realtime updates

    firestore
      .collection("quizscores")
      .orderBy("score", "desc")
      .limit(5)
      .onSnapshot(querySnapshot => {
        var scores = [];
        querySnapshot.forEach(function(doc) {
          scores.push(doc.data());
        });

        console.log(scores);
        this.setState({ highScores: scores });
      });
  }

  login = e => {
    //_auth0.authorize();
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="jumbotron">
              <h1 className="display-4">Welcome to BeatMatza</h1>
              <p className="lead" align="center">
                Test your Music knowledge by competing in the Beatmatza
                Championship by trying to beat the Competition
              </p>
              <hr className="my-4" />
              <div className="row justify-content-center">
                <button className="btn btn-primary btn-lg" onClick={this.login}>
                  Login To Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
