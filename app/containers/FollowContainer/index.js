// @flow

import {connect} from "react-redux"
import FollowAccessPointList from "../../components/FollowAccessPointList"

function mapStateToProps(state) {
	return {
		followAccessPoints: state.followAccessPoints,
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
