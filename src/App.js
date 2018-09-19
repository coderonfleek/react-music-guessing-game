import React, { Component } from "react";

//import "./App.css";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Umpire from "./components/Umpire";
import AnsweredQuestions from "./components/AnsweredQuestions";
import ScoreBoard from "./components/Scoreboard";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container" id="appContainer">
          <div className="row">
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/umpire" component={Umpire} />
            <Route path="/answered" component={AnsweredQuestions} />
            <Route path="/scoreboard" component={ScoreBoard} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
