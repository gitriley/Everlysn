import React, { Component } from 'react';
import * as descriptions from '../featureDescriptions.js'

class FeatureDescription extends Component {

    constructor(props) {
        super(props);
        this.setActiveFeature = this.setActiveFeature.bind(this)
    }

    setActiveFeature = (e) => {
        e.preventDefault();
        this.props.setActiveFeature(e.target.value)
    }

    render() {
        console.log(this.props)
        return (
            <div className='feature__wrapper'> 
                <p>tracks similar to: {this.props.track.name}</p>
                <span>view recommendations by feature:</span>
                <select onChange={this.setActiveFeature}
                value={this.props.activeFeature}>
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
            </div>
        )
    }
}

export default FeatureDescription;


{/* <div className='feature-description__wrapper'>
    <span className='feature-description__title'>{this.props.activeFeature}</span>
    <p className='feature-description__text'>{descriptions[this.props.activeFeature]}</p>
</div> */}