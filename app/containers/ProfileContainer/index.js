// @flow

import { connect } from "react-redux"
import { loadAccessPoints } from "../../action"
import Profile from "../../components/Profile"

function mapStateToProps(state) {
	return {
		accessPoints: state.get("accessPoints"),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadAccessPoints: accessPoints => dispatch(loadAccessPoints()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
