import React, { Component } from 'react';
import BarGraphFeature from './barGraphFeature.js' 
import TextFeature from './textFeature.js' 

class RelatedTracks extends Component {

    constructor(props) {
        super(props)
        this.representation = this.representation.bind(this)
        this.selectTrack = this.selectTrack.bind(this);
        this.setActiveFeature = this.setActiveFeature.bind(this)
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

    representation(track) {
        const value = track.features[this.props.activeFeature]
        console.log('value', this.props.activeFeature)
        switch(this.props.activeFeature) {
        case 'key':
        case 'mode':
        case 'time_signature':
            return <TextFeature className="graph-bar" 
                                val={value}
                                feature={this.props.activeFeature}/>
        default:
            return <BarGraphFeature className="graph-bar" 
                                    val={value}
                                    feature={this.props.activeFeature}/>
        }
    }

    RelatedTrackList() {
        return this.props.relatedTracks.map((track) => {
            return (
                <div className="feature-row" key={track.id}>
                    <div className='rel-track_text'>
                        <p  id={track.id}
                            className='rel-track_name'
                            onClick={this.selectTrack}>{track.name}</p>
                        <p className='rel-track_artist'>{track.artists[0].name}</p>
                    </div>
                    {this.representation(track)}
                </div>)
        })
    }

    selectTrack = (e) => {
        e.preventDefault();
        this.props.setActiveTrack(e.currentTarget.getAttribute('id'))
    } 

    setActiveFeature = (e) => {
        e.preventDefault();
        this.props.setActiveFeature(e.target.value)
    }

    render() {
        if (this.props.relatedTracks.length > 18) {
            //const list = this.buildList()
            return (
                <div className='related-tracks'>
                    <div>{this.RelatedTrackList()}</div>
                </div>
            )
        } else {
            return ''
        }
        
    }
}

export default RelatedTracks;
//<span>{track.features[this.state.activeFeature]}</span>