import { ConnectionStatus, MainInitialState } from 'types'
import { connectionChanged, messageReceived, reducer } from '../slice'

describe('counter reducer', () => {
  const initialState: MainInitialState = {
    board: null,
    connectionStatus: ConnectionStatus.Init,
  }
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle connectionChanged', () => {
    const status = ConnectionStatus.Connected
    const actual = reducer(
      initialState,
      connectionChanged(ConnectionStatus.Connected),
    )
    expect(actual.connectionStatus).toBe(status)
  })

  it('should handle messageReceived', () => {
    let actual = reducer(initialState, messageReceived('new: OK'))
    expect(actual.board).toBe(null)
    expect(actual.connectionStatus).toBe(ConnectionStatus.Connected)

    actual = reducer(initialState, messageReceived('map:\n□□□\n□□□\n□□□'))
    expect(actual.board).toEqual([
      ['□', '□', '□'],
      ['□', '□', '□'],
      ['□', '□', '□'],
    ])
  })
})
