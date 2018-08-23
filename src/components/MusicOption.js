import React, { Component } from "react";

export default class MusicOption {
  render() {
    return (
      <div className="songOption" onClick={this.selectSong}>
        <div className="loudHouse">1</div>
      </div>
    );
  }
}
