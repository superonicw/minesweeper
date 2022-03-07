import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameLevels } from 'config'
import ActionBar from '../actionBar'

describe('ActionBar', () => {
  const onStartGame = jest.fn()

  beforeEach(() => {
    onStartGame.mockReset()
  })

  it('should render component', () => {
    const { queryAllByTestId } = render(<ActionBar onStartGame={onStartGame} />)
    expect(queryAllByTestId('level-button')).toHaveLength(
      Object.keys(GameLevels).length,
    )
  })

  it('should call start game', () => {
    const { queryAllByTestId } = render(<ActionBar onStartGame={onStartGame} />)
    userEvent.click(queryAllByTestId('level-button')[0])
    expect(onStartGame).toHaveBeenCalledWith(Object.keys(GameLevels)[0])
  })
})
