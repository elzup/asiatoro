// @flow

import { connect } from "react-redux"
import FollowAccessPointList from "../../components/FollowAccessPointList"

function mapStateToProps(state) {
	return {
		followAccessPoints: state.get("followAccessPoints"),
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	FollowAccessPointList
)
