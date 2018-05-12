import React, { Component } from 'react';

class TrackContent extends Component {

    constructor(props) {
        super(props);
        this.enterFeatureSelectionMode = this.enterFeatureSelectionMode.bind(this);
    }

    state = {
        featureSelectionMode: false
    }

    listArtists() {
        if (!this.props.track.artists) {
            return
        }
        let artists = this.props.track.artists.map((artist, index) => {
            console.log(index);
            if (index > 0) {
                console.log('should render dot before', artist.name)
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
    
    enterFeatureSelectionMode() {
        this.props.enterFeatureSelectionMode(true)
    }

    render() {
        console.log('TRACK DATA:', this.props.track)
        if (Object.keys(this.props.track).length === 0 && this.props.track.constructor === Object) {
            return ('')
        }
        return ( 
            <div>
                <img className='track__img' src={this.props.track.album.images[1].url}/>
            </div>
        )
    }
}

export default TrackContent;
