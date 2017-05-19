// @flow

import { fromJS } from "immutable"
import types from "./constants"

const initialState = fromJS({
	accessPoints: [],
	followAccessPoints: [],
	user: [],
})

export default function(state = initialState, action) {
	switch (action.type) {
		case types.SET_ACCESS_POINTS:
			return state.set("accessPoints", action.accessPoints)
		case types.LOAD_FOLLOW_ACCESS_POINTS_END:
			return state.set("followAccessPoints", action.followAccessPoints)
			return state.set("user", action.user)
		case types.SET_USER:
			return state.set("user", action.user)
		default:
	}
	return state
}
