import React from 'react'
import { connect } from 'react-redux'
import { toggleQueryFeature } from '../actions'
const FeatureCheckBox = ({ dispatch, queryFeatures, feature }) => {
  return (
    <input 
        id={feature}
        type='checkbox'
        className='track-feature_checkbox'
        data-testid={`${feature}-checkbox`}
        checked={queryFeatures[feature]}
        onChange={e => {
            dispatch(toggleQueryFeature(feature))
        }} />
  )
}

function mapStateToProps(state) {
    return {
        queryFeatures: state.queryFeatures
    }
}

export default connect(mapStateToProps)(FeatureCheckBox)