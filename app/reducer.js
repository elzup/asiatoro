// @flow

import { fromJS } from "immutable"
import types from "./constants"

const initialState = fromJS({
	accessPoints: [],
})

export default function(state = initialState, action) {
	switch (action.type) {
		case types.SET_ACCESS_POINTS:
			return state.set("accessPoints", action.accessPoints)
		default:
	}
	return state
}
