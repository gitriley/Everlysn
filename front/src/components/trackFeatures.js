import React, { Component } from 'react';

class TrackFeatures extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        // trackFeatures: {
        //     'acousticness': '',
        //     'danceability': '',
        //     'duration': '',
        //     'energy': '',
        //     'instrumentalness': '',
        //     'key': '',
        //     'liveness': '',
        //     'loudness': '',
        //     'major-minor': '',
        //     'popularity': '',
        //     'speechiness': '',
        //     'tempo': '',
        //     'time-signature': '',
        //     'valence': '',
        // }
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
        let features = this.state.trackFeatures.map((attr) => {
            return (
                <p>
                    <span> {attr} </span><span>: {data[attr]} </span>
                </p>
            )
        })
        this.setState({features})


    }

    render() {
        if (Object.keys(this.state).length === 0 && this.state.constructor === Object) {
            return ('')
        }
        return ( 
            <div className="track-features">
                {this.state.features}
            </div>
        )
    }
}

export default TrackFeatures;
