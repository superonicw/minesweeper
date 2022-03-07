import { useMemo } from 'react'
import { Alert } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Board as BoardType, CellCoords, ConnectionStatus } from 'types'
import { Cell } from './Cell'

const useStyles = makeStyles({
  board: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
  },
  alert: {
    width: 265,
    margin: '0 auto 16px auto',
    textAlign: 'center',
  },
})

export interface BoardProps {
  board: BoardType
  connectionStatus: ConnectionStatus
  onCellClick: (_: CellCoords) => void
}

export const Board: React.FC<BoardProps> = ({
  connectionStatus,
  board,
  onCellClick,
}) => {
  const classes = useStyles()

  const boardStatus = useMemo(() => {
    if (!board) {
      return { isBusted: false, isCompleted: false }
    }

    const allCells = board.reduce((acc, row) => {
      acc = [...acc, ...row]
      return acc
    }, [])

    const bombCount = allCells.filter(cell => cell === '*').length
    const allOpened = allCells.filter(cell => cell === '□').length === 0

    return {
      isBusted: bombCount === 1,
      isCompleted: allOpened && bombCount > 1,
    }
  }, [board])

  const isDisconnected = connectionStatus === ConnectionStatus.Disconnected

  if (isDisconnected) {
    return (
      <Alert variant="filled" severity="warning">
        Connection lost. Please reload
      </Alert>
    )
  }

  if (!board) {
    return (
      <Alert severity="info" variant="filled" className={classes.alert}>
        Please start game
      </Alert>
    )
  }

  return (
    <>
      <div className={classes.board}>
        {boardStatus.isBusted && (
          <Alert severity="error" variant="filled" className={classes.alert}>
            You're busted
          </Alert>
        )}
        {boardStatus.isCompleted && (
          <Alert severity="success" variant="filled" className={classes.alert}>
            Congratulations! Well done
          </Alert>
        )}
        {board.map((row, rowId) => (
          <div key={rowId} className={classes.row}>
            {row.map((cell, colId) => (
              <Cell
                key={colId}
                value={cell}
                disabled={
                  boardStatus.isBusted ||
                  boardStatus.isCompleted ||
                  isDisconnected
                }
                onClick={() => onCellClick({ x: colId, y: rowId })}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
