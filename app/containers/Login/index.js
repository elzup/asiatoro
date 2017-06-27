// @flow

import { connect } from "react-redux"
import { setUser, createUser, setError } from "../../action"
import { Login } from "../../components/Login"

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

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login)
