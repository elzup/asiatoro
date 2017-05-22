// @flow

import { ActionTypes } from "./constants"
import { AccessPointRecord, UserRecord } from "./types"

export function loadAccessPoints() {
	return {
		type: ActionTypes.LOAD_ACCESS_POINTS,
	}
}

export function setAccessPoints(accessPoints: AccessPointRecord) {
	return {
		type: ActionTypes.SET_ACCESS_POINTS,
		accessPoints,
	}
}

export function loadFollowAccessPoints() {
	return {
		type: ActionTypes.LOAD_FOLLOW_ACCESS_POINTS,
	}
}

export function setFollowAccessPoints(followAccessPoints) {
	return {
		type: ActionTypes.LOAD_FOLLOW_ACCESS_POINTS_END,
		followAccessPoints,
	}
}

export function updateUser(user: UserRecord) {
	return {
		type: ActionTypes.UPDATE_USER,
		user,
	}
}

export function setUser(user: UserRecord) {
	return {
		type: ActionTypes.SET_USER,
		user,
	}
}

export function loadUser() {
	return {
		type: ActionTypes.LOAD_USER,
	}
}

export function createUser(name: string) {
	return {
		type: ActionTypes.CREATE_USER,
		name,
	}
}

export function setError(error: string | false) {
	return {
		type: ActionTypes.SET_ERROR,
		error,
	}
}
