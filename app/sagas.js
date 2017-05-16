// @flow

import { call, put, takeLatest } from "redux-saga/effects"
import { fromJS } from "immutable"
import types from "./constants"
import { setAccessPoints } from "./action"

function* fetchAccessPoint(action) {
	yield put(setAccessPoints(fromJS(["hoge", "fuga"])))
}

function* sagas() {
	yield takeLatest(types.LOAD_ACCESS_POINTS, fetchAccessPoint)
}

export default sagas
