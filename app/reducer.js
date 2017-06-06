// @flow

import { fromJS } from "immutable"
import { ActionTypes } from "./constants"
import { UserRecord } from "./types"

const initialState = fromJS({
	accessPoints: [],
	followAccessPoints: [],
	user: new UserRecord(),
	userRegisterError: false,
	loadingFollow: false,
})

export default function(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_ACCESS_POINTS:
			let followSSIDs = state.get("followAccessPoints").map(v => v.ssid)
			let aps = action.accessPoints.map(ap =>
				ap.set("follow", followSSIDs.includes(ap.ssid))
			)
			return state.set("accessPoints", aps)

		case ActionTypes.LOAD_FOLLOW_ACCESS_POINTS_END:
			followSSIDs = action.followAccessPoints.map(v => v.ssid)
			aps = state
				.get("accessPoints")
				.map(ap => ap.set("follow", followSSIDs.includes(ap.ssid)))
			return state
				.set("followAccessPoints", action.followAccessPoints)
				.set("accessPoints", aps)

		case ActionTypes.POST_FOLLOW:
			return state.set("loadingFollow", true)
		case ActionTypes.TOGGLE_FOLLOW:
			const { accessPoint } = action
			aps = state.get("accessPoints").map(ap => {
				if (ap === accessPoint) {
					return accessPoint.set("follow", !accessPoint.follow)
				}
				return ap
			})
			return state.set("loadingFollow", false).set("accessPoints", aps)

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
