// @flow

import { connect } from "react-redux"
import FollowAccessPointList from "../../components/FollowAccessPointList"

function mapStateToProps(state) {
	return {
		followAccessPoints: state.get("followAccessPoints"),
		user: state.get("user"),
	}
}

function mapDispatchToProps() {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	FollowAccessPointList
)
