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

    async componentWillMount() {
        if (!this.props.trackId) {
            console.log('dont call yet')
            return
        }
        const url = `https://api.spotify.com/v1/audio-features/${this.props.trackId}`
        const response = await fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.token, 
            })
        });
        const data = await response.json()
        console.log(data)
        // let features = this.state.trackFeatures.map((attr) => {
        //     return (
        //         <p>
        //             <span> {attr} </span><span>: {data[attr]} </span>
        //         </p>
        //     )
        // })
        this.setState({features: data})


    }


    render() {



        if (Object.keys(this.state).length === 0 && this.state.constructor === Object) {
            return ('')
        }
        return ( 
            <div className="track-features">
                <div className="feature-row">
                    <span className="attribute"> acousticness: </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div className="graph-bar" style={{width: (this.state.features['acousticness']*100) + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> energy: </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div className="graph-bar" style={{width: this.state.features['energy']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> danceability: </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div className="graph-bar" style={{width: this.state.features['danceability']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> instrumentalness: </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div className="graph-bar" style={{width: this.state.features['instrumentalness']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> liveness: </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div className="graph-bar" style={{width: this.state.features['liveness']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> speechiness: </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div className="graph-bar" style={{width: this.state.features['speechiness']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> valence: </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div className="graph-bar" style={{width: this.state.features['valence']*100 + '%'}}> </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> tempo: </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div> {this.state.features['tempo']} </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> major/minor </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div> {this.state.features['mode']} </div>
                </div>
                <div className="feature-row">
                    <span className="attribute"> key </span>
                    {this.props.featureSelectionMode ? <input type='checkbox'/> : ''}
                    <div> {this.state.features['key']} </div>
                </div>
            </div>
        )
    }
}

export default TrackFeatures;
