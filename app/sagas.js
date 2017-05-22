// @flow

import { call, put, takeLatest } from "redux-saga/effects"
import { fromJS } from "immutable"
import { AsyncStorage } from "react-native"
import AsiatoroClient from "./networks/Client"
import { CheckinRecord } from "./types"
import randomString from "random-string"

import { ActionTypes } from "./constants"
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
	const user = new UserRecord({ id: parseInt(id), token })
	yield put(setUser(new UserRecord()))
	AsiatoroClient.setUser(user)
	yield put(loadFollowAccessPoints(user))
}

function* updateUser({ user }) {
	yield AsyncStorage.setItem("user_id", user.id.toString())
	yield AsyncStorage.setItem("user_token", user.token)
	AsiatoroClient.setUser(user)
	yield put(loadFollowAccessPoints(user))
}

function* createUser({ name }: { name: string }) {
	const user = new UserRecord({ name, pass: randomString(10) })
	const res = yield AsiatoroClient.postUser({
		name: user.name,
		pass: user.pass,
	})
	debugger
}

function* sagas() {
	yield takeLatest(ActionTypes.LOAD_ACCESS_POINTS, fetchAccessPoint)
	yield takeLatest(ActionTypes.UPDATE_USER, updateUser)
	yield takeLatest(ActionTypes.LOAD_USER, loadUser)
	yield takeLatest(
		ActionTypes.LOAD_FOLLOW_ACCESS_POINTS,
		fetchFollowAccessPoints
	)
	yield takeLatest(ActionTypes.CREATE_USER, createUser)
}

export default sagas
