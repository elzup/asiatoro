// @flow

import types from "./constants"

export function setAccessPoints(accessPoints) {
	return {
		type: types.SET_ACCESS_POINTS,
		accessPoints,
	}
}
