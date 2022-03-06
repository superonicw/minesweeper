import { combineReducers } from 'redux'
import { reducer as mainReducer } from './modules/main'

export default combineReducers({
  main: mainReducer,
})
