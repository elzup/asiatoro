// @flow

import { call, put, takeLatest } from "redux-saga/effects"
import { fromJS } from "immutable"
import types from "./constants"
import { setAccessPoints } from "./action"
import { getAccessPoints } from "./natives/NetworkUtil"

function* fetchAccessPoint() {
	const accessPoints = yield call(getAccessPoints)
	console.log(accessPoints)
	yield put(setAccessPoints(fromJS(accessPoints)))
}

function* sagas() {
	yield takeLatest(types.LOAD_ACCESS_POINTS, fetchAccessPoint)
}

export default sagas
