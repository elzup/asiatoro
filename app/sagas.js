// @flow

import { call, put, takeLatest } from "redux-saga/effects"
import { fromJS } from "immutable"
import { AsyncStorage } from "react-native"
import AsiatoroClient from "./networks/Client"
import { CheckinRecord } from "./types"

import types from "./constants"
import {
	setAccessPoints,
	setUser,
	loadFollowAccessPoints,
	loadFollowAccessPointsEnd,
} from "./action"
import { getAccessPoints } from "./natives/NetworkUtil"
import { UserRecord, AccessPointRecord } from "./types"

function* fetchAccessPoint() {
	const accessPoints = yield call(getAccessPoints)
	yield put(setAccessPoints(fromJS(accessPoints)))
}

function* fetchFollowAccessPoints() {
	const res = yield AsiatoroClient.getFollowAccessPoint()
	const followAccessPoints = res.data.map(ap => {
		const checkins = ap.last_checkins.filter(v => !!v).map(ci => {
			return new CheckinRecord({ ...ci, user: new UserRecord(ci.user) })
		})
		return new AccessPointRecord({ ...ap, checkins })
	})
	yield put(loadFollowAccessPointsEnd(followAccessPoints))
}

function* loadUser() {
	const id = yield AsyncStorage.getItem("user_id")
	const token = yield AsyncStorage.getItem("user_token")
	if (id === null || token === null) {
		yield put(setUser(new UserRecord()))
		return
	}
	let user = new UserRecord({ id: parseInt(id), token })
	yield put(setUser(new UserRecord()))
	AsiatoroClient.setUser(user)
	yield put(loadFollowAccessPoints(user))
}

function* updateUser({ user }) {
	yield AsyncStorage.setItem("user_id", user.id.toString())
	yield AsyncStorage.setItem("user_token", user.token)
	yield put(loadFollowAccessPoints(user))
}

function* sagas() {
	yield takeLatest(types.LOAD_ACCESS_POINTS, fetchAccessPoint)
	yield takeLatest(types.UPDATE_USER, updateUser)
	yield takeLatest(types.LOAD_USER, loadUser)
	yield takeLatest(types.LOAD_FOLLOW_ACCESS_POINTS, fetchFollowAccessPoints)
}

export default sagas
