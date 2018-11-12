import React, { Component } from 'react';
import * as descriptions from '../featureDescriptions.js'
import { connect } from 'react-redux';
import { toggleFeatureSelectionMode } from '../actions'

import InfoSVG from './icons/infoSVG.js';

class FeatureDescription extends Component {

    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    submitQuery() {
        this.props.findSimilarTracks()
    }

    onButtonClick() {
        this.props.featureSelectionMode ? this.submitQuery() : this.props.dispatch(toggleFeatureSelectionMode(true))
    }


    render() {
        let featureSelectionMode = this.props.featureSelectionMode
        let buttonText = featureSelectionMode ? 'Submit Query' : 'Find Similar Tracks'
        let infoText = featureSelectionMode ? 
            'Choose features to customize your search:' : 
            'Features for this track:'

        return (
            <div className='feature__wrapper-outer'>
                <div className='feature__wrapper'>
                    <p className='feature__header-info-text'>{infoText}</p>
                    <button className='rel-track__btn'
                        onClick={this.onButtonClick}>
                        {buttonText}
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        featureSelectionMode: store.featureSelectionMode
    }
}  

export default connect(mapStateToProps)(FeatureDescription);


