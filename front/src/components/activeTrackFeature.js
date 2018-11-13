import React, { Component } from 'react';
import { connect } from "react-redux";
import BarGraphFeature from './barGraphFeature.js'
import TextFeature from './textFeature.js'
import FeatureCheckbox from './featureCheckbox.js'
import * as descriptions from '../featureDescriptions.js'
import InfoSVG from './icons/infoSVG.js'

class ActiveTrackFeature extends Component {

    constructor(props) {
        super(props);
    }


    getFeatureType(feature) {
        switch (feature) {
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
                feature={feature} />
        } else {
            return <BarGraphFeature className="graph-bar"
                val={value}
                feature={feature} />
        }
    }

    getDisplayText(feature) {
        switch (feature) {
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
        return (
            <div className="track-feature-row">
                <div className='track-feature_info-wrapper'>
                    {this.props.activeFeatureDescr === feature
                        &&
                        <div className='feature-description__wrapper'>
                            <div className='feature-description__top'>
                                <span className='feature-description__title'>{this.getDisplayText(feature)}</span>
                                <span className='close-popover'
                                    onClick={() => this.props.showFeatureDescription(feature)}>X</span>
                            </div>
                            <p className='feature-description__text'>{descriptions[feature]}</p>
                        </div> }

                    <div onClick={() => this.props.showFeatureDescription(feature)}>
                        <InfoSVG />
                    </div>
                </div>
                <span className="attribute"> {this.getDisplayText(feature)}: </span>
                <div className='track-feature_checkbox-wrapper'>
                    {this.props.featureSelectionMode
                        && 
                            <FeatureCheckbox feature={feature}/>
                        }
                </div>

                {this.representation(this.props.featureVal, feature)}


                {(this.getFeatureType(feature) === 'numerical')
                    ? <div className='numerical'
                        data-testid={`${feature}-value`}>{this.props.featureVal.toFixed(2)}</div>
                    : ''}
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
      featureSelectionMode: store.featureSelectionMode
    };
  }
  
export default connect(mapStateToProps)(ActiveTrackFeature);
  