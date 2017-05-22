// @flow

import { fromJS } from "immutable"
import { ActionTypes } from "./constants"
import { UserRecord } from "./types"

const initialState = fromJS({
	accessPoints: [],
	followAccessPoints: [],
	user: new UserRecord(),
	userRegisterError: false,
})

export default function(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_ACCESS_POINTS:
			return state.set("accessPoints", action.accessPoints)
		case ActionTypes.LOAD_FOLLOW_ACCESS_POINTS_END:
			return state.set("followAccessPoints", action.followAccessPoints)
		case ActionTypes.SET_USER:
			return state.set("user", action.user)
		case ActionTypes.CREATE_USER:
			return state.set("userRegisterError", false)
		case ActionTypes.SET_ERROR:
			return state.set("userRegisterError", action.error)
		default:
	}
	return state
}
