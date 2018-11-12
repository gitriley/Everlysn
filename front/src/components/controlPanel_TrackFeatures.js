import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFeatureSelectionMode } from "../actions";

class ControlPanel_TrackFeatures extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.props.featureSelectionMode
      ? this.props.findSimilarTracks()
      : this.props.dispatch(toggleFeatureSelectionMode(true))
  }

  render() {
    let featureSelectionMode = this.props.featureSelectionMode;
    let buttonText = featureSelectionMode
      ? "Submit Query"
      : "Find Similar Tracks";
    let infoText = featureSelectionMode
      ? "Choose features to customize your search:"
      : "Features for this track:";

    return (
      <div className="feature__wrapper-outer">
        <div className="feature__wrapper">
          <p className="feature__header-info-text">{infoText}</p>
          <button className="rel-track__btn" onClick={this.onButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    featureSelectionMode: store.featureSelectionMode
  };
}

export default connect(mapStateToProps)(ControlPanel_TrackFeatures);
