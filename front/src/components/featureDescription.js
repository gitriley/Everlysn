import React, { Component } from 'react';
import * as descriptions from '../featureDescriptions.js'

class FeatureDescription extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return ( 
            <div className='feature-description__wrapper'>
                <span className='feature-description__title'>{this.props.activeFeature}</span>
                <p className='feature-description__text'>{descriptions[this.props.activeFeature]}</p>
            </div>
        )
    }
}

export default FeatureDescription;
