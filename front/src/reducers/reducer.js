import { combineReducers } from 'redux'
// import {
//   LOAD_TRACK_IN_PLAYER
// } from '../actions/index'

// function visibilityFilter(state = SHOW_ALL, action) {
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       return action.filter
//     default:
//       return state
//   }
// }
// ​
// function todos(state = [], action) {
//   switch (action.type) {
//     case ADD_TODO:
//       return [
//         ...state,
//         {
//           text: action.text,
//           completed: false
//         }
//       ]
//     case TOGGLE_TODO:
//       return state.map((todo, index) => {
//         if (index === action.index) {
//           return Object.assign({}, todo, {
//             completed: !todo.completed
//           })
//         }
//         return todo
//       })
//     default:
//       return state
//   }
// }

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

const rootReducer = combineReducers({
    audioPlayerId,
    featureSelectionMode
})

export default rootReducer