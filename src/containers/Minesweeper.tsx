import { useDispatch, useSelector } from 'react-redux'
import { Container, Grid, Typography, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { get } from 'lodash'
import { GameLevels } from 'config'
import { ConnectionStatus } from 'types'
import { ActionBar, Board } from 'components'
import {
  selectBoard,
  selectConnectionStatus,
  startGame,
} from 'store/modules/main'
const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    paddingTop: 30,
  },
})

const Minesweeper: React.FC = () => {
  const board = useSelector(selectBoard)
  const connectionStatus = useSelector(selectConnectionStatus)

  const dispatch = useDispatch()

  const classes = useStyles()

  const handleStartGame = (level: string) => {
    dispatch(startGame(get(GameLevels, level)))
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom component="h4">
            Minesweeper
          </Typography>
        </Grid>

        {connectionStatus === ConnectionStatus.Init && (
          <Grid item xs={12} justifyContent="center">
            <CircularProgress />
          </Grid>
        )}

        {connectionStatus !== ConnectionStatus.Init && (
          <>
            <Grid item xs={12}>
              <ActionBar onStartGame={handleStartGame} />
            </Grid>

            <Grid item xs={12}>
              <Board board={board} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  )
}

export default Minesweeper
