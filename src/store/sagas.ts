import { all } from 'redux-saga/effects'
import { saga as mainSaga } from './modules/main'

export default function* rootSaga() {
  yield all([mainSaga()])
}
