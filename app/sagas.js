// @flow

import { call, put, takeLatest } from "redux-saga/effects"
import { fromJS } from "immutable"
import types from "./constants"
import { setAccessPoints } from "./action"
import { NativeModules } from "react-native"

const { ReadAccessPoint } = NativeModules

function* fetchAccessPoint() {
	const accessPoints = yield call(ReadAccessPoint.getAccessPoints)
	console.log(accessPoints)
	debugger
	yield put(setAccessPoints(fromJS(accessPoints.accessPoints)))
}

function* sagas() {
	yield takeLatest(types.LOAD_ACCESS_POINTS, fetchAccessPoint)
}

export default sagas
