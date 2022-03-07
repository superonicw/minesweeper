import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConnectionStatus } from 'types'
import { Board } from '../Board'

describe('ActionBar', () => {
  const onCellClick = jest.fn()

  it('should render disconnected state', () => {
    const { getByText } = render(
      <Board
        board={null}
        connectionStatus={ConnectionStatus.Disconnected}
        onCellClick={onCellClick}
      />,
    )
    expect(getByText('Connection lost. Please reload')).toBeInTheDocument()
  })

  it('should render initial state', () => {
    const { getByText } = render(
      <Board
        board={null}
        connectionStatus={ConnectionStatus.Connected}
        onCellClick={onCellClick}
      />,
    )
    expect(getByText('Please start game')).toBeInTheDocument()
  })

  it('should render game started state', () => {
    const board = [
      ['□', '□'],
      ['□', '□'],
    ]
    const { queryAllByTestId } = render(
      <Board
        board={board}
        connectionStatus={ConnectionStatus.Connected}
        onCellClick={onCellClick}
      />,
    )
    expect(queryAllByTestId('cell')).toHaveLength(4)
  })

  it('should render busted state', () => {
    const board = [
      ['□', '□', '*'],
      ['□', '□', '□'],
      ['□', '□', '□'],
    ]
    const { getByText } = render(
      <Board
        board={board}
        connectionStatus={ConnectionStatus.Connected}
        onCellClick={onCellClick}
      />,
    )
    expect(getByText(`You're busted`)).toBeInTheDocument()
  })

  it('should render completed state', () => {
    const board = [
      ['1', '1', '*'],
      ['1', '2', '1'],
      ['*', '1', '1'],
    ]
    const { getByText } = render(
      <Board
        board={board}
        connectionStatus={ConnectionStatus.Connected}
        onCellClick={onCellClick}
      />,
    )
    expect(getByText('Congratulations! Well done')).toBeInTheDocument()
  })

  it('should click cell', () => {
    const board = [
      ['□', '□', '□'],
      ['□', '□', '□'],
      ['□', '□', '□'],
    ]
    const { queryAllByTestId } = render(
      <Board
        board={board}
        connectionStatus={ConnectionStatus.Connected}
        onCellClick={onCellClick}
      />,
    )
    userEvent.click(queryAllByTestId('cell')[0])
    expect(onCellClick).toHaveBeenCalledWith({ x: 0, y: 0 })
  })
})
