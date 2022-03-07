import { eventChannel } from 'redux-saga'
import { call, put, take, takeEvery } from '@redux-saga/core/effects'
import { WS_URL } from 'config'
import {
  ConnectionStatus,
  OpenCellActionPayload,
  StartGameActionPayload,
} from 'types'
import {
  CONNECTION_CHANGED,
  MESSAGE_RECEIVED,
  START_WS_COMMUNICATION,
  START_GAME,
  GET_CURRENT_MAP,
  OPEN_CELL,
} from './constants'
import { connectionChanged, messageReceived } from './slice'

const ws = new WebSocket(WS_URL)

const initWebsocket = () => {
  return eventChannel(emitter => {
    ws.onopen = () => {
      ws.send('help')
    }

    ws.onerror = error => {
      console.log('ERROR: ', error)
    }

    ws.onclose = () => {
      emitter({
        type: CONNECTION_CHANGED,
        payload: ConnectionStatus.Disconnected,
      })
    }

    ws.onmessage = e => {
      emitter({ type: MESSAGE_RECEIVED, payload: e.data })
    }

    return () => {
      ws.close()
    }
  })
}

const wsSaga = function* (): any {
  const channel = yield call(initWebsocket)

  while (true) {
    const { type, payload } = yield take(channel)

    if (type === MESSAGE_RECEIVED) {
      yield put(messageReceived(payload))
    } else if (type === CONNECTION_CHANGED) {
      yield put(connectionChanged(payload))
    }
  }
}

const startGame = function* ({ payload }: StartGameActionPayload): any {
  yield ws.send(`new ${payload}`)
  yield ws.send('map')
}

const getCurrentMap = function* (): any {
  yield ws.send('map')
}

const openCell = function* ({ payload }: OpenCellActionPayload): any {
  yield ws.send(`open ${payload.x} ${payload.y}`)
  yield ws.send('map')
}

export function* saga() {
  yield takeEvery(START_WS_COMMUNICATION, wsSaga)
  yield takeEvery(START_GAME, startGame)
  yield takeEvery(GET_CURRENT_MAP, getCurrentMap)
  yield takeEvery(OPEN_CELL, openCell)
}
