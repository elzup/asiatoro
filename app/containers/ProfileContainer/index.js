// @flow

import { connect } from "react-redux"
import { setUser } from "../../action"
import Profile from "../../components/Profile"

function mapStateToProps(state) {
	return {
		user: state.get("user"),
		error: state.get("userRegisterError"),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setUser: user => dispatch(setUser(user)),
		createUser: user => dispatch(createUser(user)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
