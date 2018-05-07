import React, { Component } from 'react';
import BarGraphFeature from './barGraphFeature.js' 
import TextFeature from './textFeature.js' 

class RelatedTracks extends Component {

    constructor(props) {
        super(props)
        this.representation = this.representation.bind(this)
        this.selectTrack = this.selectTrack.bind(this);
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
        const value = track.features[this.state.activeFeature]

        switch(this.state.activeFeature) {
        case 'key':
        case 'mode':
        case 'time_signature':
            return <TextFeature className="graph-bar" 
                                val={value}
                                feature={this.state.activeFeature}/>
        default:
            return <BarGraphFeature className="graph-bar" 
                                    val={value}
                                    feature={this.state.activeFeature}/>
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

    render() {
        if (this.props.relatedTracks.length > 18) {
            //const list = this.buildList()
            return (
                <div className='related-tracks'>
                    <span>view recommendations by feature:</span>
                    <select onChange={event => this.setState({ activeFeature: event.target.value })}
          value={this.state.activeFeature}>
                        <option value='acousticness'>acousticness</option>
                        <option value='danceability'>danceability</option>
                        <option value='energy'>energy</option>
                        <option value='instrumentalness'>instrumentalness</option>
                        <option value='liveness'>liveness</option>
                        <option value='loudness'>loudness</option>
                        <option value='speechiness'>speechiness</option>
                        <option value='tempo'>tempo</option>
                        <option value='valence'>valence</option>
                        <option value='key'>key</option>
                        <option value='mode'>mode</option>
                        <option value='time_signature'>time_signature</option>
                    </select>
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