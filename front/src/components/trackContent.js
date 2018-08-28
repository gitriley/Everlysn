import React, { Component } from 'react';

class TrackContent extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        featureSelectionMode: false
    }

    listArtists() {
        if (!this.props.track.artists) {
            return
        }
        let artists = this.props.track.artists.map((artist, index) => {
            if (index > 0) {
                return (
                    <span> • {artist.name} </span>
                )
            } else {
                return (
                    <span> {artist.name} </span>
                )
            }
        })
        return (
            <span className="track-artists">{artists}</span>
        )
    }
    

    render() {
        if (Object.keys(this.props.track).length === 0 && this.props.track.constructor === Object) {
            return ('')
        }
        return ( 
            <div className='track__img__wrapper'>
                <img className='track__img' src={this.props.track.album.images[1].url}/>
            </div>
        )
    }
}

export default TrackContent;
