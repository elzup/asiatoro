// @flow

import { fromJS } from "immutable"
import { ActionTypes } from "./constants"
import { UserRecord, AccessPointRecord } from "./types"

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
			let followBssids = state.get("followAccessPoints").map(v => v.bssid)
			let aps = action.accessPoints.map(ap =>
				ap.set("follow", followBssids.includes(ap.bssid))
			)
			return state.set("accessPoints", aps)

		case ActionTypes.LOAD_FOLLOW_ACCESS_POINTS_END:
			followBssids = action.followAccessPoints.map(v => v.bssid)
			aps = state
				.get("accessPoints")
				.map(ap => ap.set("follow", followBssids.includes(ap.bssid)))
			return state
				.set("followAccessPoints", action.followAccessPoints)
				.set("accessPoints", aps)

		case ActionTypes.POST_FOLLOW:
			return state.set("loadingFollow", true)
		case ActionTypes.TOGGLE_FOLLOW:
			const { accessPoint } = action
			aps = state
				.get("accessPoints")
				.delete(accessPoint)
				.insert(accessPoint.set("follow", !accessPoint.follow))
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
