import React, { Component } from 'react';
import BarGraphFeature from './barGraphFeature.js'
import TextFeature from './textFeature.js' 
import ActiveTrackFeature from './activeTrackFeature'
import * as descriptions from '../featureDescriptions.js'

class TrackFeatures extends Component {

    constructor(props) {
        super(props);
        this.showFeatureDescription = this.showFeatureDescription.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    state = {
        trackFeatures : [
            'acousticness',
            'danceability',
            'energy',
            'instrumentalness',
            'liveness',
            'speechiness',
            'valence',
            'loudness',
            'tempo',
            'key',
            'mode',
            'time_signature'
        ],
        features: '',
        displayDescr: 'none',
        activeFeatureDescr: null
    }



    showFeatureDescription(feature) {
        console.log('showFeatureDescription', feature);
        if (!this.state.activeFeatureDescr) {
            this.setState({activeFeatureDescr: feature})
        } else {
            this.setState({activeFeatureDescr: null})
        }
    }

    toggle(feature) {
        console.log('toggle function, calling parent');
        this.props.toggleQueryFeatures(feature)
    }

    RenderFeatures(features) {
        return features.map((feature) => {
            return (
                <ActiveTrackFeature feature={feature}
                                    featureVal={this.props.features[feature]}
                                    showFeatureDescription={this.showFeatureDescription}
                                    activeFeatureDescr={this.state.activeFeatureDescr}
                                    toggle={this.toggle}
                                    checked={this.props.queryFeatures[feature]}
                                    featureSelectionMode={this.props.featureSelectionMode}/>
            )
        })
    }

    render() {
        console.log(this.props);
        if (Object.keys(this.props.features).length === 0 && this.props.features.constructor === Object) {
            return ('')
        }
        return ( 
            <div className="track-features">
                <div className='track-features_wrapper'>
                    {this.RenderFeatures(this.state.trackFeatures)}
                </div>
            </div>
        )
    }
}

export default TrackFeatures;
