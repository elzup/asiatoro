// @flow

import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import { renameUser, setError } from '../../action'
import { Profile } from '../../components/Profile'

function mapStateToProps(state) {
  return {
    user: state.user,
    error: state.userRegisterError,
    loadingUser: state.loadingUser,
  }
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    renameUser: user => dispatch(renameUser(user)),
    setError: error => dispatch(setError(error)),
  }
}

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  Profile
)
