import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Board as BoardType, ConnectionStatus } from 'types'
import { openCell, selectConnectionStatus } from 'store/modules/main'
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
}

export const Board: React.FC<BoardProps> = ({ board }) => {
  const classes = useStyles()

  const connectionStatus = useSelector(selectConnectionStatus)

  const dispatch = useDispatch()

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

  const handleCellClick = (rowId: number, colId: number) => {
    dispatch(openCell({ x: colId, y: rowId }))
  }

  if (!board) {
    return (
      <Alert severity="info" variant="filled" className={classes.alert}>
        Please start game
      </Alert>
    )
  }

  const isDisconnected = connectionStatus === ConnectionStatus.Disconnected

  return (
    <>
      <div className={classes.board}>
        {boardStatus.isBusted && (
          <Alert severity="error" variant="filled" className={classes.alert}>
            You're Busted
          </Alert>
        )}
        {boardStatus.isCompleted && (
          <Alert severity="success" variant="filled" className={classes.alert}>
            Congratulations! Well done
          </Alert>
        )}
        {isDisconnected && (
          <Alert variant="filled" severity="warning">
            Connection lost. Please reload
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
                onClick={() => handleCellClick(rowId, colId)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
