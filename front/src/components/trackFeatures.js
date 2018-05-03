import React, { Component } from 'react';

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
                <div className="feature-row">
                    <span className="attribute"> acousticness: </span>
                    {this.props.featureSelectionMode 
                    ? <input    type='checkbox' 
                                checked={this.props.queryFeatures['acousticness']}
                                onChange={() => this.toggle('acousticness')}/> 
                    : ''}
                    <div className="graph-bar" style={{width: (this.props.features['acousticness']*100) + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> energy: </span>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    checked={this.props.queryFeatures['energy']}
                                    onChange={() => this.toggle('energy')}/> 
                        : ''}
                    <div className="graph-bar" style={{width: this.props.features['energy']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> danceability: </span>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    checked={this.props.queryFeatures['danceability']}
                                    onChange={() => this.toggle('danceability')}/> 
                        : ''}
                    <div className="graph-bar" style={{width: this.props.features['danceability']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> instrumentalness: </span>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    checked={this.props.queryFeatures['instrumentalness']}
                                    onChange={() => this.toggle('instrumentalness')}/> 
                        : ''}
                    <div className="graph-bar" style={{width: this.props.features['instrumentalness']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> liveness: </span>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    checked={this.props.queryFeatures['liveness']}
                                    onChange={() => this.toggle('liveness')}/> 
                        : ''}
                    <div className="graph-bar" style={{width: this.props.features['liveness']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> speechiness: </span>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    checked={this.props.queryFeatures['speechiness']}
                                    onChange={() => this.toggle('speechiness')}/> 
                        : ''}
                    <div className="graph-bar" style={{width: this.props.features['speechiness']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> valence: </span>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    checked={this.props.queryFeatures['valence']}
                                    onChange={() => this.toggle('valence')}/> 
                        : ''}
                    <div className="graph-bar" style={{width: this.props.features['valence']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> tempo: </span>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    checked={this.props.queryFeatures['tempo']}
                                    onChange={() => this.toggle('tempo')}/>  
                        : ''}
                    <div> {this.props.features['tempo']} </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> major/minor </span>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    checked={this.props.queryFeatures['mode']}
                                    onChange={() => this.toggle('mode')}/>  
                        : ''}
                    <div> {this.props.features['mode']} </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> key </span>
                    {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    checked={this.props.queryFeatures['key']}
                                    onChange={() => this.toggle('key')}/>  
                        : ''}
                    <div> {this.props.features['key']} </div>
                </div>
            </div>
        )
    }
}

export default TrackFeatures;
