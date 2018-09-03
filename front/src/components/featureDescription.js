import React, { Component } from 'react';
import * as descriptions from '../featureDescriptions.js'

class FeatureDescription extends Component {

    constructor(props) {
        super(props);
        this.setActiveFeature = this.setActiveFeature.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.showFeatureDescription = this.showFeatureDescription.bind(this);
        this.sortTracks = this.sortTracks.bind(this);
    }

    state = {
        displayDescr: 'none',
        sortMode: 'asscending'
    }

    setActiveFeature = (e) => {
        e.preventDefault();
        this.props.setActiveFeature(e.target.value)
    }

    enterFeatureSelectionMode() {
        this.props.enterFeatureSelectionMode(true)
    }

    submitQuery() {
        this.props.findSimilarTracks()
    }

    onButtonClick() {
        this.props.featureSelectionMode ? this.submitQuery() : this.enterFeatureSelectionMode()  
    }

    showFeatureDescription() {
        if (this.state.displayDescr === 'none') {
            this.setState({displayDescr: 'block'});
        } else {
            this.setState({displayDescr: 'none'});
        }
        
    }

    sortTracks(activeFeature) {
        if (this.state.sortMode === 'ascending') {
            this.props.sortTracksDescending(activeFeature);
            this.setState({sortMode: 'descending'});
        } else {
            this.props.sortTracksAscending(activeFeature);
            this.setState({sortMode: 'ascending'});
        }
    }

    renderCorrect() {
        let featureSelectionMode = this.props.featureSelectionMode
        if ((this.props.mode === 'trackFeatures') && (this.props.featureSelectionMode)) {
            return (
            <div className='feature__wrapper'> 
                <p className='feature__header-info-text'>Choose features to customize your search:</p>
                <button className='rel-track__btn'
                        onClick={this.onButtonClick}>
                        {featureSelectionMode ? 'Submit Query' : 'Find Similar Tracks'}
                </button>     
            </div>)
        } else if ((this.props.mode === 'trackFeatures') && (!this.props.featureSelectionMode)) {
            return (
            <div className='feature__wrapper'> 
                <p className='feature__header-info-text'>Features for this track:</p>
                <button className='rel-track__btn'
                        onClick={this.onButtonClick}>
                        {featureSelectionMode ? 'Submit Query' : 'Find Similar Tracks'}
                </button>     
            </div>)
        } else if (this.props.mode === 'relatedTracks') {
            return (
            <div className='feature__wrapper'> 
                <div className='feature__header-text'>
                    <p className='feature__header-info-text'>Similar Tracks:</p>
                    {/* <p className='feature__header-info-track'>{this.props.track.name}:</p> */}
                </div>
                <div className='feature__select'>
                    <span className='feature__select-text'>feature:</span>
                    <div className='feature__select-inner'>
                        <select className='feature__select-dropdown' onChange={this.setActiveFeature}
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
                            <option value='mode'>major/minor</option>
                            <option value='time_signature'>time signature</option>
                        </select>
                        <span className='feature__select-svg__wrapper'  onClick={this.showFeatureDescription}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                <circle cy="24" cx="24" r="24"/>
                                <g fill="#fff">
                                    <circle cx="24" cy="11.6" r="4.7"/>
                                    <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                </g>
                            </svg>
                        </span>
                        <div className='feature-description__wrapper' style={{ display: this.state.displayDescr }}>
                            <span className='feature-description__title'>{this.props.activeFeature}</span>
                            <p className='feature-description__text'>{descriptions[this.props.activeFeature]}</p>
                        </div>
                    </div>
                    
                </div>
                <div class='sort__wrapper'>
                    <span class='sort__wrapper' onClick={() => this.sortTracks(this.props.activeFeature)}>
                        {(this.state.sortMode ==='ascending') ? '▼' : '▲'}
                    </span>
                </div>
            </div>
            )
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

export default FeatureDescription;


