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

    renderCorrect() {
        let featureSelectionMode = this.props.featureSelectionMode
        if (this.props.featureSelectionMode) {
            return (
                <div className='feature__wrapper'>
                    <p className='feature__header-info-text'>Choose features to customize your search:</p>
                    <button className='rel-track__btn'
                        onClick={this.onButtonClick}>
                        {featureSelectionMode ? 'Submit Query' : 'Find Similar Tracks'}
                    </button>
                </div>)
        } else if (!this.props.featureSelectionMode) {
            return (
                <div className='feature__wrapper'>
                    <p className='feature__header-info-text'>Features for this track:</p>
                    <button className='rel-track__btn'
                        onClick={this.onButtonClick}>
                        {featureSelectionMode ? 'Submit Query' : 'Find Similar Tracks'}
                    </button>
                </div>)
        } 
    }

    render() {
        return (
            <div className='feature__wrapper-outer'>
                {this.renderCorrect()}
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


