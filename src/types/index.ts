export enum ConnectionStatus {
  Init = 'Init',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export interface Action {
  type: string
  payload: any
}

export type Board = Array<Array<string>> | null

export interface CellCoords {
  x: number
  y: number
}

export interface StartGameActionPayload {
  type: string
  payload: number
}

export interface OpenCellActionPayload {
  type: string
  payload: CellCoords
}

export interface MainInitialState {
  board: Board
  connectionStatus: ConnectionStatus
}
