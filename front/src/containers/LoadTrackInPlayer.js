import React from 'react'
import { connect } from 'react-redux'
import { loadTrackInPlayer } from '../actions'
const LoadTrackInPlayer = ({ dispatch, trackId }) => {
  return (
    <div>      
      <button 
        className="header__load-track-btn"
        onClick={e => {
          e.preventDefault()          
          dispatch(loadTrackInPlayer(trackId))
        }}

      >Load track in audio player</button>
    </div>
  )
}

export default connect()(LoadTrackInPlayer)