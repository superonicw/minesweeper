import { combineReducers } from 'redux'
import { reducer as minesweeperReducer } from 'minesweeper/redux'

export default combineReducers({
  minesweeper: minesweeperReducer,
})
