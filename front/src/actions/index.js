
/*
 * action creators
 */

// let nextTodoId = 0
// export const addTodo = text => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })
// ​
// export const setVisibilityFilter = filter => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// })
// ​
// export const toggleTodo = id => ({
//   type: 'TOGGLE_TODO',
//   id
// })

export const toggleFeatureSelectionMode = boolVal => ({
  type: 'TOGGLE_FEATURE_SELECTION_MODE',
  featureSelectionMode: boolVal
})

export const toggleQueryFeatures = queryFeature => ({
  type: 'TOGGLE_QUERY_FEATURE',
  feature: queryFeature
})

const LOAD_TRACK_IN_PLAYER = 'LOAD_TRACK_IN_PLAYER'
export const loadTrackInPlayer = trackId => ({
    type: LOAD_TRACK_IN_PLAYER,
    trackId: trackId
})