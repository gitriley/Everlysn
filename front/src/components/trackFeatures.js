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
            'loudness',
            'speechiness',
            'valence',
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

    render() {
        console.log(this.props);
        if (Object.keys(this.props.features).length === 0 && this.props.features.constructor === Object) {
            return ('')
        }
        return ( 
            <div className="track-features">
                <div className='track-features_wrapper'>

                    <ActiveTrackFeature feature='acousticness'
                                        featureVal={this.props.features['acousticness']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['acousticness']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='energy'
                                        featureVal={this.props.features['energy']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['energy']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='danceability'
                                        featureVal={this.props.features['danceability']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['danceability']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='instrumentalness'
                                        featureVal={this.props.features['instrumentalness']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['instrumentalness']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='liveness'
                                        featureVal={this.props.features['liveness']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['liveness']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='speechiness'
                                        featureVal={this.props.features['speechiness']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['speechiness']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='valence'
                                        featureVal={this.props.features['valence']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['valence']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='tempo'
                                        featureVal={this.props.features['tempo']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['tempo']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='mode'
                                        featureVal={this.props.features['mode']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['mode']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='key'
                                        featureVal={this.props.features['key']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['key']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                    <ActiveTrackFeature feature='time_signature'
                                        featureVal={this.props.features['time_signature']}
                                        showFeatureDescription={this.showFeatureDescription}
                                        activeFeatureDescr={this.state.activeFeatureDescr}
                                        toggle={this.toggle}
                                        checked={this.props.queryFeatures['time_signature']}
                                        featureSelectionMode={this.props.featureSelectionMode}/>

                </div>
            </div>
        )
    }
}

export default TrackFeatures;
