// @flow

import { call, put, takeLatest } from "redux-saga/effects"
import { fromJS } from "immutable"
import { AsyncStorage } from "react-native"
import types from "./constants"
import { setAccessPoints, setUser } from "./action"
import { getAccessPoints } from "./natives/NetworkUtil"
import { UserRecord, AccessPointRecord } from "./types"

function* fetchAccessPoint() {
	const accessPoints = yield call(getAccessPoints)
	yield put(setAccessPoints(fromJS(accessPoints)))
}

function* fetchFollowAccessPoints({ user }) {
	yield AsyncStorage.setItem("user_id", user.id.toString())
	yield AsyncStorage.setItem("user_token", user.token)
}

function* loadUser() {
	const id = parseInt(yield AsyncStorage.getItem("user_id"))
	const token = yield AsyncStorage.getItem("user_token")
	yield put(setUser(new UserRecord({ id, token })))
}

function* sagas() {
	yield takeLatest(types.LOAD_ACCESS_POINTS, fetchAccessPoint)
	yield takeLatest(types.SET_USER, fetchFollowAccessPoints)
	yield takeLatest(types.LOAD_USER, loadUser)
}

export default sagas
