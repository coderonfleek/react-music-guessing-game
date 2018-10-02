import React, { Component } from "react";
import lifelines from "../lifelines";

export default class GameAssistants extends Component {
  lifelines;
  constructor(props) {
    super(props);

    this.lifelines = lifelines;

    this.state = {
      data: null
    };
  }

  lifelineUsed = lifeline => {
    if (this.props.playerLifelines) {
      return this.props.playerLifelines.indexOf(lifeline.id) == -1;
    }

    return false;
  };

  componentDidMount() {}

  login = e => {
    //_auth0.authorize();
  };

  render() {
    return (
      <div>
        {this.lifelines.map(lifeline => {
          return !this.lifelineUsed(lifeline) ? (
            <span key={lifeline.id}>
              <b className="text-primary">
                {lifeline.abbreviation} &nbsp; * &nbsp;
              </b>
            </span>
          ) : (
            <span key={lifeline.id}>
              <b className="text-danger">
                {lifeline.abbreviation} &nbsp; * &nbsp;
              </b>
            </span>
          );
        })}
      </div>
    );
  }
}
