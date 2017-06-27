// @flow

import { connect } from "react-redux"
import AccessPointList from "../../components/AccessPointList"
import { postFollow, logout } from "../../action"
import { AccessPointRecord } from "../../types"

function mapStateToProps(state) {
	return {
		followAccessPoints: state.followAccessPoints.map(
			ap => new AccessPointRecord(ap)
		),
		accessPoints: state.accessPoints.map(ap => new AccessPointRecord(ap)),
		loadingAccessPoints: state.loadingAccessPoints,
		loadingCheckins: state.loadingCheckins,
		user: state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		postFollow: (ap, follow) => dispatch(postFollow(ap, follow)),
		logout: () => dispatch(logout()),
	}
}

export const NetworksScreen = connect(mapStateToProps, mapDispatchToProps)(
	AccessPointList
)
