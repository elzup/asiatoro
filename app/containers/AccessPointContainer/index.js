// @flow

import { connect } from "react-redux"
import AccessPointList from "../../components/AccessPointList"
import { postFollow } from "../../action"

function mapStateToProps(state) {
	return {
		followAccessPoints: state.get("followAccessPoints"),
		accessPoints: state.get("accessPoints"),
		loading: state.get("loadingFollow"),
	}
}
function mapDispatchToProps(dispatch) {
	return {
		postFollow: (ap, follow) => dispatch(postFollow(ap, follow)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessPointList)
