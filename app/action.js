// @flow

import types from "./constants"
import { AccessPointRecord, UserRecord } from "./types"

export function setAccessPoints(accessPoints: AccessPointRecord) {
	return {
		type: types.SET_ACCESS_POINTS,
		accessPoints,
	}
}

export function loadFollowAccessPoints() {
	return {
		type: types.LOAD_FOLLOW_ACCESS_POINTS,
	}
}

export function loadFollowAccessPointsEnd(followAccessPoints) {
	return {
		type: types.LOAD_FOLLOW_ACCESS_POINTS_END,
		followAccessPoints,
	}
}

export function loadAccessPoints() {
	return {
		type: types.LOAD_ACCESS_POINTS,
	}
}

export function updateUser(user: UserRecord) {
	return {
		type: types.SET_USER,
		user,
	}
}

export function setUser(user: UserRecord) {
	return {
		type: types.SET_USER,
		user,
	}
}

export function loadUser() {
	return {
		type: types.LOAD_USER,
	}
}

export function createUser(user: UserRecord) {
	return {
		type: types.CREATE_USER,
		user,
	}
}

export function createUserEnd(error) {
	return {
		type: types.CREATE_USER_END,
		error,
	}
}
