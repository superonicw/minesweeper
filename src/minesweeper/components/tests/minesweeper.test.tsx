import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameLevels } from 'config'
import { openCell, startGame } from 'minesweeper/redux'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ConnectionStatus } from 'types'
import Minesweeper from '../minesweeper'

const mockStore = configureStore([])

describe('Minesweeper', () => {
  const defaultStore = mockStore({
    minesweeper: {
      board: [
        ['□', '□'],
        ['□', '□'],
      ],
      connectionStatus: ConnectionStatus.Connected,
    },
  })

  beforeEach(() => {
    defaultStore.dispatch = jest.fn()
  })

  it('should render loading state', () => {
    const store = mockStore({
      minesweeper: {
        board: null,
        connectionStatus: ConnectionStatus.Init,
      },
    })
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Minesweeper />
      </Provider>,
    )

    expect(getByText('Minesweeper')).toBeTruthy()
    expect(getByTestId('loader')).toBeTruthy()
  })

  it('should render board', () => {
    const { queryAllByTestId } = render(
      <Provider store={defaultStore}>
        <Minesweeper />
      </Provider>,
    )

    expect(queryAllByTestId('level-button').length).toBe(
      Object.keys(GameLevels).length,
    )
    expect(queryAllByTestId('cell').length).toBe(4)
  })

  it('should start game', () => {
    const { queryAllByTestId } = render(
      <Provider store={defaultStore}>
        <Minesweeper />
      </Provider>,
    )

    userEvent.click(queryAllByTestId('level-button')[0])
    expect(defaultStore.dispatch).toHaveBeenCalledWith(startGame(1))
  })

  it('should open cell', () => {
    const { queryAllByTestId } = render(
      <Provider store={defaultStore}>
        <Minesweeper />
      </Provider>,
    )

    userEvent.click(queryAllByTestId('cell')[1])
    expect(defaultStore.dispatch).toHaveBeenCalledWith(openCell({ x: 1, y: 0 }))
  })
})
