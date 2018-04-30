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
                <div className="featureRow">
                    <span className="attribute"> acousticness: </span>
                    <div className="graph-bar" style={{width: (this.state.features['acousticness']*100) + '%'}}> </div>
                </div>
                <div className="featureRow">
                    <span className="attribute"> energy: </span>
                    <div className="graph-bar" style={{width: this.state.features['energy']*100 + '%'}}> </div>
                </div>
                <div className="featureRow">
                    <span className="attribute"> danceability: </span>
                    <div className="graph-bar" style={{width: this.state.features['danceability']*100 + '%'}}> </div>
                </div>
                <div className="featureRow">
                    <span className="attribute"> instrumentalness: </span>
                    <div className="graph-bar" style={{width: this.state.features['instrumentalness']*100 + '%'}}> </div>
                </div>
                <div className="featureRow">
                    <span className="attribute"> liveness: </span>
                    <div className="graph-bar" style={{width: this.state.features['liveness']*100 + '%'}}> </div>
                </div>
                <div className="featureRow">
                    <span className="attribute"> speechiness: </span>
                    <div className="graph-bar" style={{width: this.state.features['speechiness']*100 + '%'}}> </div>
                </div>
                <div className="featureRow">
                    <span className="attribute"> valence: </span>
                    <div className="graph-bar" style={{width: this.state.features['valence']*100 + '%'}}> </div>
                </div>
                <div className="featureRow">
                    <span className="attribute"> tempo: </span>
                    <div> {this.state.features['tempo']} </div>
                </div>
                <div className="featureRow">
                    <span className="attribute"> major/minor </span>
                    <div> {this.state.features['mode']} </div>
                </div>
                <div className="featureRow">
                    <span className="attribute"> key </span>
                    <div> {this.state.features['key']} </div>
                </div>
            </div>
        )
    }
}

export default TrackFeatures;
