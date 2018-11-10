import React from "react";
import { connect } from "react-redux";
import { loadTrackInPlayer } from "../actions";
import AudioSVG from '../components/icons/audioSVG.js'


const IconLoadTrackInPlayer = ({ dispatch, trackId }) => {

    return (
        <div
            className="load-track_wrapper"
            onClick={e => {
                e.preventDefault();
                dispatch(loadTrackInPlayer(trackId));
            }}
        >
            <AudioSVG />
        </div>
  );
};

export default connect()(IconLoadTrackInPlayer);
