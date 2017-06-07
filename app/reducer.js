// @flow

import {ActionTypes} from "./constants"
import {UserRecord, AccessPointRecord} from "./types"
import _ from "lodash"
import {sortWithUniq} from "./utils/index"

const initialState = {
	accessPoints: [],
	followAccessPoints: [],
	user: new UserRecord(),
	userRegisterError: false,
	loadingFollow: false,
}

export default function(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_ACCESS_POINTS:
			let fssids = state.followAccessPoints.map(v => v.ssid)
			const apfollowOpted = _.map(action.accessPoints, v =>
        v.setFollow(fssids.includes(v.ssid))
      )
			return {...state, accessPoints: sortWithUniq(apfollowOpted)}
		case ActionTypes.LOAD_FOLLOW_ACCESS_POINTS_END:
			const fssids2 = action.followAccessPoints.map(v => v.ssid)
			const aps = _.map(state.accessPoints, v =>
        v.setFollow(fssids2.includes(v.ssid))
      )
			return {
				...state,
				followAccessPoints: action.followAccessPoints,
				accessPoints: sortWithUniq(aps),
			}

		case ActionTypes.POST_FOLLOW:
			return {
				...state,
				loadingFollow: true,
			}
		case ActionTypes.TOGGLE_FOLLOW:
			const {accessPoint} = action
			const aps2 = state.accessPoints.map(ap => {
				if (ap === accessPoint) {
					return {
						...accessPoint,
						follow: !accessPoint.follow,
					}
				}
				return ap
			})
			return {
				...state,
				loadingFollow: false,
				accessPoints: aps2,
			}

		case ActionTypes.SET_USER:
			return {...state, user: action.user}
		case ActionTypes.CREATE_USER:
			return {...state, userRegisterError: false}
		case ActionTypes.SET_ERROR:
			return {...state, userRegisterError: action.error}
		default:
	}
	return state
}
