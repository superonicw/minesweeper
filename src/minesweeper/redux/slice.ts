import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CellCoords, ConnectionStatus, MainInitialState } from 'types'
import {
  START_WS_COMMUNICATION,
  START_GAME,
  GET_CURRENT_MAP,
  OPEN_CELL,
} from './constants'

const initialState: MainInitialState = {
  board: null,
  connectionStatus: ConnectionStatus.Init,
}

/* Actions */
export const startWSCommunication = createAction(START_WS_COMMUNICATION)

export const startGame = createAction<number>(START_GAME)

export const getCurrentMap = createAction<number>(GET_CURRENT_MAP)

export const openCell = createAction<CellCoords>(OPEN_CELL)

export const minesweeperSlice = createSlice({
  name: 'minesweeper',
  initialState,
  reducers: {
    messageReceived: (state, action: PayloadAction<string>) => {
      const { payload } = action

      if (payload.startsWith('map:')) {
        const board = payload
          .split('\n')
          .slice(1)
          .map(row => row.split(''))
        state.board = board
      }

      state.connectionStatus = ConnectionStatus.Connected
    },
    connectionChanged: (state, action: PayloadAction<ConnectionStatus>) => {
      state.connectionStatus = action.payload
    },
  },
})

export const { messageReceived, connectionChanged } = minesweeperSlice.actions

export const reducer = minesweeperSlice.reducer
