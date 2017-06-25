// @flow

import { connect } from "react-redux"
import FollowAccessPointList from "../../components/FollowAccessPointList"
import { AccessPointRecord } from "../../types"
import { loadUser } from "../../action"

function mapStateToProps(state) {
	return {
		followAccessPoints: state.followAccessPoints.map(
			ap => new AccessPointRecord(ap)
		),
		user: state.user,
		loadingCheckins: state.loadingCheckins,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadUser: () => dispatch(loadUser()),
	}
}

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(
	FollowAccessPointList
)
