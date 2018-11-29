// action creators
export const toggleFeatureSelectionMode = boolVal => ({
  type: 'TOGGLE_FEATURE_SELECTION_MODE',
  featureSelectionMode: boolVal
})

export const toggleQueryFeature = queryFeature => ({
  type: 'TOGGLE_QUERY_FEATURE',
  feature: queryFeature
})

const LOAD_TRACK_IN_PLAYER = 'LOAD_TRACK_IN_PLAYER'
export const loadTrackInPlayer = trackId => ({
    type: LOAD_TRACK_IN_PLAYER,
    trackId: trackId
})

export const setTheme = theme => ({
  type: 'SET_THEME',
  theme: theme
})

