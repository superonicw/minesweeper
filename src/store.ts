import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

export const store = configureStore({
  reducer,
  middleware,
})

sagaMiddleware.run(sagas)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
