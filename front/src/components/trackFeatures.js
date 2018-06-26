import React, { Component } from 'react';
import BarGraphFeature from './barGraphFeature.js'

class TrackFeatures extends Component {

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
        features: ''
    }

    // https://api.spotify.com/v1/audio-features/06AKEBrKUckW0KREUWRnvT

    // async componentWillMount() {
    //     if (!this.props.trackId) {
    //         console.log('dont call yet')
    //         return
    //     }
    //     const url = `https://api.spotify.com/v1/audio-features/${this.props.trackId}`
    //     const response = await fetch(url, {
    //         headers: new Headers({
    //             'Authorization': 'Bearer ' + this.props.token, 
    //         })
    //     });
    //     const data = await response.json()
    //     console.log(data)
    //     this.setState({features: data})
    // }

    toggle(feature) {
        this.props.toggleQueryFeatures(feature)
    }

    render() {
        console.log(this.props.features)
        if (Object.keys(this.props.features).length === 0 && this.props.features.constructor === Object) {
            return ('')
        }
        return ( 
            <div className="track-features">
                <div className='track-features_wrapper'>
                <div className="track-feature-row">
                    <span className="attribute"> acousticness: </span>
                    <div>
                    {this.props.featureSelectionMode 
                    ? <input    type='checkbox'
                                className='track-feature_checkbox'
                                checked={this.props.queryFeatures['acousticness']}
                                onChange={() => this.toggle('acousticness')}/> 
                    : ''}
                    </div>
                    <BarGraphFeature className="graph-bar" 
                                    val={this.props.features['acousticness']}
                                    feature='acousticness'/>
                    <span className='numerical'>{this.props.features['acousticness']}</span>
                </div>
                <div className="track-feature-row">
                    <span className="attribute"> energy: </span>
                    <div>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['energy']}
                                    onChange={() => this.toggle('energy')}/> 
                        : ''}
                    </div>
                    <BarGraphFeature className="graph-bar" 
                                    val={this.props.features['energy']}
                                    feature='energy'/>
                    <span className='numerical'>{this.props.features['energy']}</span>
                </div>
                <div className="track-feature-row">
                    <span className="attribute"> danceability: </span>
                    <div>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['danceability']}
                                    onChange={() => this.toggle('danceability')}/> 
                        : ''}
                    </div>
                    <BarGraphFeature className="graph-bar" 
                                    val={this.props.features['danceability']}
                                    feature='danceability'/>
                    <span className='numerical'>{this.props.features['danceability']}</span>
                </div>
                <div className="track-feature-row">
                    <span className="attribute"> instrumentalness: </span>
                    <div>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['instrumentalness']}
                                    onChange={() => this.toggle('instrumentalness')}/> 
                        : ''}
                    </div>
                    <BarGraphFeature className="graph-bar" 
                                    val={this.props.features['instrumentalness']}
                                    feature='instrumentalness'/>
                    <span className='numerical'>{this.props.features['instrumentalness']}</span>
                </div>

                <div className="track-feature-row">
                    <span className="attribute"> liveness: </span>
                    <div>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['liveness']}
                                    onChange={() => this.toggle('liveness')}/> 
                        : ''}
                    </div>
                    <BarGraphFeature className="graph-bar" 
                                    val={this.props.features['liveness']}
                                    feature='liveness'/>
                    <span className='numerical'>{this.props.features['liveness']}</span>
                </div>

                <div className="track-feature-row">
                    <span className="attribute"> speechiness: </span>
                    <div>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['speechiness']}
                                    onChange={() => this.toggle('speechiness')}/> 
                        : ''}
                    </div>
                    <BarGraphFeature className="graph-bar" 
                                    val={this.props.features['speechiness']}
                                    feature='speechiness'/>
                    <span className='numerical'>{this.props.features['speechiness']}</span>
                </div>

                <div className="track-feature-row">
                    <span className="attribute"> valence: </span>
                    <div>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['valence']}
                                    onChange={() => this.toggle('valence')}/> 
                        : ''}
                    </div>
                    <BarGraphFeature className="graph-bar" 
                                    val={this.props.features['valence']}
                                    feature='valence'/>
                    <span className='numerical'>{this.props.features['valence']}</span>
                </div>

                <div className="track-feature-row">
                    <span className="attribute"> tempo: </span>
                    <div>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['tempo']}
                                    onChange={() => this.toggle('tempo')}/>  
                        : ''}
                    </div>
                    <BarGraphFeature className="graph-bar" 
                                    val={this.props.features['tempo']}
                                    feature='tempo'/>
                    <span className='numerical'>{this.props.features['tempo']}</span>
                </div>

                <div className="track-feature-row">
                    <span className="attribute"> major/minor </span>
                    <div>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['mode']}
                                    onChange={() => this.toggle('mode')}/>  
                        : ''}
                    </div>
                    <div> {this.props.features['mode']} </div>
                </div>

                <div className="track-feature-row">
                    <span className="attribute"> key </span>
                    <div>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['key']}
                                    onChange={() => this.toggle('key')}/>  
                        : ''}
                    </div>
                    <div> {this.props.features['key']} </div>
                </div>
                </div>
            </div>
        )
    }
}

export default TrackFeatures;
