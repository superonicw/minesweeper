import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startWSCommunication } from 'minesweeper/redux'
import Minesweeper from 'minesweeper/components/container'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startWSCommunication())
  }, []) // eslint-disable-line

  return <Minesweeper />
}

export default App
