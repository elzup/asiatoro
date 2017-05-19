// @flow

import types from "./constants"
import { AccessPointRecord, UserRecord } from "./types"

export function setAccessPoints(accessPoints: AccessPointRecord) {
	return {
		type: types.SET_ACCESS_POINTS,
		accessPoints,
	}
}

export function loadAccessPoints() {
	return {
		type: types.LOAD_ACCESS_POINTS,
	}
}

export function setUser(user: UserRecord) {
	return {
		type: types.SET_USER,
		user,
	}
}
