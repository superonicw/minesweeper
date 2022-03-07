import { RootState } from 'store'

export const selectBoard = (state: RootState) => state.minesweeper.board

export const selectConnectionStatus = (state: RootState) =>
  state.minesweeper.connectionStatus
