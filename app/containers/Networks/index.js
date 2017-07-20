// @flow

import { connect } from 'react-redux'
import type { Dispatch } from 'redux'

import AccessPointList from '../../components/AccessPointList'
import { postFollow, logout, loadAccessPoints } from '../../action'
import { AccessPointRecord } from '../../types'

function mapStateToProps(state) {
  return {
    followAccessPoints: state.followAccessPoints.map(
      ap => new AccessPointRecord(ap)
    ),
    accessPoints: state.accessPoints.map(ap => new AccessPointRecord(ap)),
    loadingAccessPoints: state.loadingAccessPoints,
    loadingCheckins: state.loadingCheckins,
    user: state.user,
  }
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    postFollow: (ap, follow) => dispatch(postFollow(ap, follow)),
    logout: () => dispatch(logout()),
    loadAccessPoints: () => dispatch(loadAccessPoints()),
  }
}

export const NetworksScreen = connect(mapStateToProps, mapDispatchToProps)(
  AccessPointList
)
