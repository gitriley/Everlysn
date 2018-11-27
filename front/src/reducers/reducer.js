import { combineReducers } from 'redux'

const defaultQueryFeatures = {
    acousticness: false,
    danceability: false,
    energy: false,
    instrumentalness: false,
    key: false,
    liveness: false,
    loudness: false,
    mode: false,
    speechiness: false,
    tempo: false,
    time_signature: false,
    valence: false
  }


function featureSelectionMode(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_FEATURE_SELECTION_MODE':
            return action.featureSelectionMode
        default:
            return state
    }
}

function audioPlayerId(state = null, action) {
    switch (action.type) {
        case 'LOAD_TRACK_IN_PLAYER':
            return action.trackId
        default:
            return state
    }
}

function queryFeatures(state = defaultQueryFeatures, action) {
    switch (action.type) {
        case 'TOGGLE_QUERY_FEATURE':
            const newVal = !state[action.feature]
            let newQueryFeatures = Object.assign({}, state);    //creating copy of object
            newQueryFeatures[action.feature] = newVal;
            return newQueryFeatures
        default: 
            return state
    }
}

function theme(state = 'dark', action) {
    switch (action.type) {
        case 'SET_THEME':
            return action.theme
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    audioPlayerId,
    featureSelectionMode,
    queryFeatures,
    theme
})

export default rootReducer