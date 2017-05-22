// @flow

import { connect } from "react-redux"
import { setUser, createUser, setError } from "../../action"
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
		setError: error => dispatch(setError(error)),
		createUser: user => dispatch(createUser(user)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
