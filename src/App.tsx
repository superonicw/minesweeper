import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startWSCommunication } from 'store/modules/main'
import { Minesweeper } from 'containers'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startWSCommunication())
  }, []) // eslint-disable-line

  return <Minesweeper />
}

export default App
