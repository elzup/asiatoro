// @flow

import types from "./constants"

export function setAccessPoints(accessPoints) {
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
