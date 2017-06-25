// @flow

import { connect } from "react-redux"
import { setUser, createUser, setError } from "../../action"
import Profile from "../../components/Profile"

function mapStateToProps(state) {
	return {
		user: state.user,
		error: state.userRegisterError,
		loadingUser: state.loadingUser,
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
