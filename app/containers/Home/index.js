// @flow

import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import FollowAccessPointList from '../../components/FollowAccessPointList'
import { AccessPointRecord } from '../../types'
import { loadUser, watchCheckin, unwatchCheckin } from '../../action'

function mapStateToProps(state) {
  return {
    followAccessPoints: state.followAccessPoints.map(
      ap => new AccessPointRecord(ap)
    ),
    user: state.user,
    watches: state.watches,
    loadingCheckins: state.loadingCheckins,
    loadingUser: state.loadingUser,
  }
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    loadUser: () => dispatch(loadUser()),
    watchCheckin: (user, ap) => dispatch(watchCheckin(user, ap)),
    unwatchCheckin: (user, ap) => dispatch(unwatchCheckin(user, ap)),
  }
}

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(
  FollowAccessPointList
)
