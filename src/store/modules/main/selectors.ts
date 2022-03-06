import { RootState } from 'store'

export const selectBoard = (state: RootState) => state.main.board

export const selectConnectionStatus = (state: RootState) =>
  state.main.connectionStatus
