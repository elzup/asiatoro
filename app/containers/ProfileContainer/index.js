// @flow

import { connect } from "react-redux"
import { setUser } from "../../action"
import Profile from "../../components/Profile"

function mapStateToProps(state) {
	return {
		user: state.get("user"),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setUser: accessPoints => dispatch(setUser()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
