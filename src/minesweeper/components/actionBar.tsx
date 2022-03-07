import React from 'react'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GameLevels } from 'config'

export interface ActionBarProps {
  onStartGame: (_: string) => void
}

const useStyles = makeStyles({
  actionBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
})

const ActionBar: React.FC<ActionBarProps> = ({ onStartGame }) => {
  const classes = useStyles()

  return (
    <div className={classes.actionBar}>
      {Object.keys(GameLevels).map(level => (
        <Button
          key={level}
          variant="outlined"
          size="small"
          color="secondary"
          data-testid="level-button"
          onClick={() => onStartGame(level)}
        >
          {level}
        </Button>
      ))}
    </div>
  )
}

export default ActionBar
