import React from 'react'
import { connect } from 'react-redux'


const FooterAudioPlayer = ({trackId}) => {
  const iframeURL = 'https://open.spotify.com/embed?uri=spotify:track:' + trackId + '&theme=white'
  if (!trackId) {
      return (null)
  }
  return (
      <div className='footer' data-testid='footer'>
          <iframe src={iframeURL} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"
      data-testid='audio-player'></iframe>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    trackId: state.audioPlayerId
  }
}

export default connect(
  mapStateToProps
)(FooterAudioPlayer)