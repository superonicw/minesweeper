import { all } from 'redux-saga/effects'
import { saga as mainSaga } from 'minesweeper/redux'

export default function* rootSaga() {
  yield all([mainSaga()])
}
