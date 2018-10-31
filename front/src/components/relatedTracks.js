import React, { Component } from 'react';
import BarGraphFeature from './barGraphFeature.js' 
import TextFeature from './textFeature.js'
import AudioSVG from './icons/audioSVG.js'
import SpotifySVG from './icons/spotifySVG.js'

class RelatedTracks extends Component {

    constructor(props) {
        super(props)
        this.representation = this.representation.bind(this);
        this.getFeatureType = this.getFeatureType.bind(this);
        this.selectTrack = this.selectTrack.bind(this);
        this.setActiveFeature = this.setActiveFeature.bind(this);
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

    representation(track, activeFeature) {
        const value = track.features[activeFeature]
        if (this.getFeatureType(activeFeature) === 'text') {
            return <TextFeature className="graph-bar" 
                                val={value}
                                feature={activeFeature}/>
        } else {
            return <BarGraphFeature className="graph-bar" 
                                    val={value}
                                    feature={activeFeature}/>
        }
    }

    getFeatureType(activeFeature) {
        switch(activeFeature) {
        case 'key':
        case 'mode':
        case 'time_signature':
            return 'text'
        default:
            return 'numerical'
        }
    }

    RelatedTrackList() {
        return this.props.relatedTracks.map((track) => {
            return (
                <div className='feature-row' key={track.id}>
                    <div className='load-track_wrapper' onClick={() => this.props.loadTrackInPlayer(track.id)}>
                        <AudioSVG/>
                    </div>
                    <div className='external-link_wrapper'>
                        <a href={track.external_urls.spotify} target="_blank">
                            <SpotifySVG/>
                        </a>
                    </div>
                    <div className='rel-track_text'>
                        <p  id={track.id}
                            className='rel-track_name'
                            onClick={this.selectTrack}
                            title={track.name}>{track.name}</p>
                        <p className='rel-track_artist'>{track.artists[0].name}</p>
                    </div>
                    
                    {this.representation(track, this.props.activeFeature)}

                    {(this.getFeatureType(this.props.activeFeature) === 'numerical')
                    ? <div className='rel-track_val'>{track.features[this.props.activeFeature].toFixed(2)}</div>
                    : ''}
                    
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
        if (this.props.relatedTracks.length > 0) {
            return (
                <div className='related-tracks'>
                    <div>{this.RelatedTrackList()}</div>
                </div>
            )
        } else {
            return <p style={{margin: '15px'}}>Sorry, we could not find any tracks similar to this one. Please try a different track.</p>
        }
    }
}

export default RelatedTracks;
