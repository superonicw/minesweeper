import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { COLOR_MAP } from 'config'

const useStyles = makeStyles({
  cell: {
    minWidth: '20px !important',
    height: 20,
    padding: '0 !important',
  },
  bomb: {
    width: '16px !important',
    height: '16px !important',
  },
})

export interface CellProps {
  value: string
  disabled: boolean
  onClick: () => void
}

const Cell: React.FC<CellProps> = ({ value, disabled, onClick }) => {
  const classes = useStyles()

  if (value === '□') {
    return (
      <Button
        variant="outlined"
        className={classes.cell}
        data-testid="cell"
        disabled={disabled}
        onClick={onClick}
      />
    )
  }

  if (value === '*') {
    return (
      <Button
        variant="outlined"
        className={classes.cell}
        disabled
        data-testid="cell"
        onClick={onClick}
      >
        <img src="/assets/images/bomb.svg" alt="bomb" />
      </Button>
    )
  }

  return (
    <Button
      variant="outlined"
      disabled
      className={classes.cell}
      data-testid="cell"
    >
      {value !== '0' && (
        <span style={{ color: COLOR_MAP[Number(value) - 1] }}>{value}</span>
      )}
    </Button>
  )
}

export default Cell
