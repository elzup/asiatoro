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
		loadingFollow: state.loadingFollow,
		loadingAccessPoints: state.loadingAccessPoints,
		user: state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		postFollow: (ap, follow) => dispatch(postFollow(ap, follow)),
		logout: () => dispatch(logout()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessPointList)
