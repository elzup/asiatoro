// @flow

import {
	call,
	put,
	fork,
	takeLatest,
	takeEvery,
	select,
} from "redux-saga/effects"
import { AsyncStorage } from "react-native"
import { ac } from "./networks/Client"
import { CheckinRecord } from "./types"
import randomString from "random-string"
import { uniqBySSID } from "./utils"

import { ActionTypes, ErrorTypes } from "./constants"
import {
	setAccessPoints,
	setUser,
	setError,
	toggleFollow,
	updateUser,
	setFollowAccessPoints,
} from "./action"
import { getAccessPoints } from "./natives/NetworkUtil"
import { UserRecord, AccessPointRecord } from "./types"

function* fetchAccessPoint() {
	const accessPoints = yield call(getAccessPoints)
	yield put(setAccessPoints(accessPoints))
}

function* fetchFollowAccessPoints() {
	const res = yield call(ac.getFollowAccessPoint.bind(ac))
	if (res.status === 404 || res.status === 401) {
		yield fork(logout)
		return
	}
	const followAccessPoints = res.data.map(ap => {
		const checkins = ap.last_checkins.filter(v => !!v).map(ci => {
			return new CheckinRecord({ ...ci, user: new UserRecord(ci.user) })
		})
		return new AccessPointRecord({ ...ap, checkins })
	})
	yield put(setFollowAccessPoints(followAccessPoints))
	yield fork(postCheckin)
}

function* loadUser() {
	const id = yield call(AsyncStorage.getItem, "user_id")
	const token = yield call(AsyncStorage.getItem, "user_token")
	const name = yield call(AsyncStorage.getItem, "user_name")
	if (id === null || token === null || id === "0" || token === "") {
		yield put(setUser(new UserRecord()))
		return
	}
	const user = new UserRecord({ id: parseInt(id), token, name })
	yield put(setUser(user))
	ac.setUser(user)
	yield fork(fetchFollowAccessPoints)
}

function* registerUser({ user }) {
	yield call(AsyncStorage.setItem, "user_id", user.id.toString())
	yield call(AsyncStorage.setItem, "user_token", user.token)
	yield call(AsyncStorage.setItem, "user_pass", user.pass)
	yield call(AsyncStorage.setItem, "user_name", user.name)
	yield put(setUser(user))
	yield call(ac.setUser.bind(ac), user)
	yield fork(fetchFollowAccessPoints)
}

function* createUser({ name }: { name: string }) {
	const pass = randomString(10)
	const res = yield call(ac.postUser.bind(ac), { name, pass })
	if (res.status === 400) {
		yield put(setError(ErrorTypes.USER_NAME_DUPLICATE))
		return
	}
	if (res.problem === "TIMEOUT_ERROR") {
		yield put(setError(ErrorTypes.REQUEST_TIMEOUT))
		return
	}
	const id = res.data.id
	const token = res.data.token

	const user = new UserRecord({ name, pass, id, token })
	yield put(updateUser(user))
}

function* postFollow({
	accessPoint,
	follow,
	}: {
	accessPoint: AccessPointRecord,
	follow: boolean
}) {
	if (follow) {
		yield call(ac.postFollow.bind(ac), { ap: accessPoint })
	} else {
		yield call(ac.deleteFollow.bind(ac), { ap: accessPoint })
	}
	yield put(toggleFollow(accessPoint))
	yield fork(fetchFollowAccessPoints)
}

function* postCheckin() {
	console.log("postCheckin?")
	const followAccessPints = yield select(state => state.followAccessPoints)
	const accessPoints = yield call(getAccessPoints)
	const ssids = accessPoints.map(ap => ap.ssid)
	console.log(ssids)
	const shouldCheckins = uniqBySSID(
		followAccessPints.filter(ap => ssids.includes(ap.ssid))
	)
	console.log(shouldCheckins)
	shouldCheckins.forEach(async ap => {
		const res = await ac.postCheckin({ ap })
		if (res.problem) {
			return false
		}
	})
}

function* logout() {
	yield call(AsyncStorage.setItem, "user_id", "")
	yield call(AsyncStorage.setItem, "user_token", "")
	yield call(AsyncStorage.setItem, "user_pass", "")
	yield call(AsyncStorage.setItem, "user_name", "")
	yield fork(loadUser)
}

function* sagas() {
	yield takeLatest(ActionTypes.LOAD_ACCESS_POINTS, fetchAccessPoint)
	yield takeLatest(ActionTypes.UPDATE_USER, registerUser)
	yield takeLatest(ActionTypes.LOAD_USER, loadUser)
	yield takeLatest(
		ActionTypes.LOAD_FOLLOW_ACCESS_POINTS,
		fetchFollowAccessPoints
	)
	yield takeLatest(ActionTypes.CREATE_USER, createUser)
	yield takeLatest(ActionTypes.POST_FOLLOW, postFollow)
	yield takeEvery(ActionTypes.POST_CHECKIN, postCheckin)
	yield takeLatest(ActionTypes.USER_LOGOUT, logout)
}

export default sagas
