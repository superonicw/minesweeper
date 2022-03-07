import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'store'
import App from './App'

test('renders minesweeper heading', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  expect(getByText(/minesweeper/i)).toBeInTheDocument()
})
