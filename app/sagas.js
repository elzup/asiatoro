// @flow

import { call, put, takeLatest } from "redux-saga/effects"
import { fromJS } from "immutable"
import types from "./constants"
import { setAccessPoints } from "./action"
import { NativeModules, Platform } from "react-native"

const { ReadAccessPoint } = NativeModules

function* fetchAccessPoint() {
	let accessPoints = ["none"]
	if (Platform.OS === "ios") {
		const res = yield call(ReadAccessPoint.getAccessPoints)
		accessPoints = JSON.parse(res)
	}
	console.log(accessPoints)
	yield put(setAccessPoints(fromJS(accessPoints)))
}

function* sagas() {
	yield takeLatest(types.LOAD_ACCESS_POINTS, fetchAccessPoint)
}

export default sagas
