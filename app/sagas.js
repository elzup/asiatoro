// @flow

import { call, put, takeLatest } from "redux-saga/effects"
import { fromJS } from "immutable"
import { AsyncStorage } from "react-native"
import AsiatoroClient from "./networks/Client"
import { CheckinRecord } from "./types"
import randomString from "random-string"

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
	yield put(setFollowAccessPoints(followAccessPoints))
}

function* loadUser() {
	const id = yield AsyncStorage.getItem("user_id")
	const token = yield AsyncStorage.getItem("user_token")
	const name = yield AsyncStorage.getItem("user_name")
	if (id === null || token === null) {
		yield put(setUser(new UserRecord()))
		return
	}
	const user = new UserRecord({ id: parseInt(id), token, name })
	yield put(setUser(user))
	AsiatoroClient.setUser(user)
	yield fetchFollowAccessPoints()
}

function* registerUser({ user }) {
	yield AsyncStorage.setItem("user_id", user.id.toString())
	yield AsyncStorage.setItem("user_token", user.token)
	yield AsyncStorage.setItem("user_pass", user.pass)
	yield AsyncStorage.setItem("user_name", user.name)
	yield put(setUser(user))
	AsiatoroClient.setUser(user)
	yield fetchFollowAccessPoints()
}

function* createUser({ name }: { name: string }) {
	const pass = randomString(10)
	const res = yield AsiatoroClient.postUser({ name, pass })
	if (res.status === 400) {
		yield put(setError(ErrorTypes.USER_NAME_DUPLICATE))
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
		yield AsiatoroClient.postFollow({ ap: accessPoint })
	} else {
		yield AsiatoroClient.deleteFollow({ ap: accessPoint })
	}
	yield put(toggleFollow(accessPoint))
	yield fetchFollowAccessPoints()
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
}

export default sagas
