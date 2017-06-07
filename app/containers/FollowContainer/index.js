// @flow

import {connect} from "react-redux"
import FollowAccessPointList from "../../components/FollowAccessPointList"
import {AccessPointRecord} from "../../types"

function mapStateToProps(state) {
	return {
		followAccessPoints: state.followAccessPoints.map(
      ap => new AccessPointRecord(ap)
    ),
		user: state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		post: user => dispatch(setUser(user)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FollowAccessPointList
)
