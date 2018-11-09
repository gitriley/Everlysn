import { combineReducers } from 'redux'
import {
  LOAD_TRACK_IN_PLAYER
} from './actions'
​
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

function audioPlayerId(state = null, action) {
    switch (action.type) {
        case LOAD_TRACK_IN_PLAYER:
            return action.trackId
        default:
            return state
    }
}
​
const reducer = combineReducers({
    audioPlayerId
})
​
export default reducer