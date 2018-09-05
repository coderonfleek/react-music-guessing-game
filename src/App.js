import React, { Component } from "react";

//import "./App.css";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Umpire from "./components/Umpire";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container" id="appContainer">
          <div className="row">
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/umpire" component={Umpire} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
