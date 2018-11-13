import React, { Component } from "react";
import * as descriptions from "../featureDescriptions.js";
import { connect } from "react-redux";

import InfoSVG from "./icons/infoSVG.js";

class ControlPanel_RelatedTracks extends Component {
  constructor(props) {
    super(props);
    this.setActiveFeature = this.setActiveFeature.bind(this);
    this.showFeatureDescription = this.showFeatureDescription.bind(this);
    this.sortTracks = this.sortTracks.bind(this);
  }

  state = {
    displayDescr: "none",
    sortMode: "ascending"
  };

  setActiveFeature = e => {
    e.preventDefault();
    this.props.setActiveFeature(e.target.value);
  };

  showFeatureDescription() {
    if (this.state.displayDescr === "none") {
      this.setState({ displayDescr: "block" });
    } else {
      this.setState({ displayDescr: "none" });
    }
  }

  sortTracks(activeFeature) {
    if (this.state.sortMode === "ascending") {
      this.props.sortTracksDescending(activeFeature);
      this.setState({ sortMode: "descending" });
    } else {
      this.props.sortTracksAscending(activeFeature);
      this.setState({ sortMode: "ascending" });
    }
  }

  renderCorrect() {
    return (
      <div className="feature__wrapper">
        <div className="feature__header-text">
          <p className="feature__header-info-text">Similar Tracks:</p>
        </div>
        <div className="feature__select">
          <span className="feature__select-text">feature:</span>
          <div className="feature__select-inner">
            <select
              className="feature__select-dropdown"
              onChange={this.setActiveFeature}
              value={this.props.activeFeature}
            >
              <option value="acousticness">acousticness</option>
              <option value="danceability">danceability</option>
              <option value="energy">energy</option>
              <option value="instrumentalness">instrumentalness</option>
              <option value="liveness">liveness</option>
              <option value="loudness">loudness</option>
              <option value="speechiness">speechiness</option>
              <option value="tempo">tempo</option>
              <option value="valence">positivity</option>
              <option value="key">key</option>
              <option value="mode">major/minor</option>
              <option value="time_signature">time signature</option>
            </select>
            <span
              className="feature__select-svg__wrapper"
              onClick={this.showFeatureDescription}
            >
              <InfoSVG />
            </span>
            <div
              className="feature-description__wrapper"
              style={{ display: this.state.displayDescr }}
            >
              <div className="feature-description__top">
                <span className="feature-description__title">
                  {this.props.activeFeature}
                </span>
                <span
                  className="close-popover"
                  onClick={this.showFeatureDescription}
                >
                  X
                </span>
              </div>
              <p className="feature-description__text">
                {descriptions[this.props.activeFeature]}
              </p>
            </div>
          </div>
        </div>
        <div className="sort__wrapper">
          <span
            className="sort__wrapper"
            onClick={() => this.sortTracks(this.props.activeFeature)}
          >
            {this.state.sortMode === "ascending" ? "▼" : "▲"}
          </span>
        </div>
      </div>
    );
  }

  render() {
    return <div className="feature__wrapper-outer">{this.renderCorrect()}</div>;
  }
}

function mapStateToProps(store) {
  return {
    featureSelectionMode: store.featureSelectionMode
  };
}

export default connect(mapStateToProps)(ControlPanel_RelatedTracks);
