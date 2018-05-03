import React, { Component } from 'react';

class RelatedTracks extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        trackFeatures : [
            'acousticness',
            'danceability',
            'energy',
            'instrumentalness',
            'key',
            'liveness',
            'loudness',
            'mode',
            'speechiness',
            'tempo',
            'time_signature',
            'valence',
        ],
        activeFeature: 'danceability'
    }

    toggle(feature) {
        this.props.toggleQueryFeatures(feature)
    }

    buildList() {
        let tracks = this.props.relatedTracks.map((track) => {
            return (
                <div>
                    <span>{track.name}</span>
                    <span>{track.artists[0].name}</span>
                    <span>{track.features[this.state.activeFeature]}</span>
                </div>)
        })
        console.log(tracks)
        return tracks
    }

    render() {
        console.log(this.props.relatedTracks)
        console.log(this.props.relatedTracks.length)
        console.log(this.props.relatedTracks.length > 18)
        if (this.props.relatedTracks.length > 18) {
            const list = this.buildList()
            return (
                <div className="related-tracks">{list}</div>
            )
        } else {
            return ''
        }
        
    }
}

export default RelatedTracks;
