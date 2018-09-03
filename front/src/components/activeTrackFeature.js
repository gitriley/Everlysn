import React, { Component } from 'react';
import BarGraphFeature from './barGraphFeature.js'
import TextFeature from './textFeature.js' 
import * as descriptions from '../featureDescriptions.js'

class ActiveTrackFeature extends Component {

    constructor(props) {
        super(props);
    }


    getFeatureType(feature) {
        switch(feature) {
        case 'key':
        case 'mode':
        case 'time_signature':
            return 'text'
        default:
            return 'numerical'
        }
    }

    representation(value, feature) {
        if (this.getFeatureType(feature) === 'text') {
            return <TextFeature className="graph-bar" 
                                val={value}
                                feature={feature}/>
        } else {
            return <BarGraphFeature className="graph-bar" 
                                    val={value}
                                    feature={feature}/>
        }
    }

    getDisplayText(feature) {
        switch(feature) {
            case 'mode':
                return 'major/minor'
            case 'valence':
                return 'positivity'
            case 'time_signature':
                return 'time signature'
            default:
                return feature
        }
    }
 
    render() {
        const feature = this.props.feature;
        console.log(feature);
        return (
            <div className="track-feature-row">
                <div className='track-feature_info-wrapper'>
                    {this.props.activeFeatureDescr === feature
                    ? 
                        <div className='feature-description__wrapper'>
                            <span className='feature-description__title'>{this.getDisplayText(feature)}</span>
                            <p className='feature-description__text'>{descriptions[feature]}</p>
                        </div> : <div></div>}

                    <div onClick={() => this.props.showFeatureDescription(feature)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                            <circle cy="24" cx="24" r="24"/>
                            <g fill="#fff">
                                <circle cx="24" cy="11.6" r="4.7"/>
                                <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                            </g>
                        </svg>
                    </div>
                </div>
                <span className="attribute"> {this.getDisplayText(feature)}: </span>
                <div className='track-feature_checkbox-wrapper'>
                {this.props.featureSelectionMode 
                ? <input    type='checkbox'
                            className='track-feature_checkbox'
                            checked={this.props.checked}
                            onChange={() => this.props.toggle(feature)}/> 
                : ''}
                </div>

                {this.representation(this.props.featureVal, feature)}

                {/* <BarGraphFeature className="graph-bar" 
                                val={this.props.featureVal}
                                feature={feature}/> */}

                {(this.getFeatureType(feature) === 'numerical')
                    ? <div className='numerical'>{this.props.featureVal.toFixed(2)}</div>
                    : ''}
                {/* <div className='numerical'>{this.props.featureVal.toFixed(2)}</div> */}
            </div>
        )
    }
}

export default ActiveTrackFeature;
