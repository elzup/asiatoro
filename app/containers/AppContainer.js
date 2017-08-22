// @flow

import React, { Component } from 'react'
import { AppState, Platform } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import type { Dispatch } from 'redux'
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from 'react-native-fcm'

import { NetworksScreen } from './Networks'
import { ProfileScreen } from './Profile'
import { LoginScreen } from './Login'
import { HomeScreen } from './Home'
import {
  loadAccessPoints,
  loadUser,
  postCheckin,
  fcmSetup,
  fcmRemove,
  fcmSetToken,
} from '../action'
import { UserRecord } from '../types/index'
import { sleep } from '../utils'

type AppEventState = 'change' | 'background'

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      path: '',
    },
    Networks: {
      screen: NetworksScreen,
      path: 'networks',
    },
    Profile: {
      screen: ProfileScreen,
      path: 'profile',
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#0000BE',
      },
    },
  }
)

const RootStack = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    LoginModal: {
      screen: LoginScreen,
    },
  },
  {
    headerMode: 'none',
  }
)

class AppContainer extends Component {
  props: {
    user: UserRecord,
    loadUser: Function,
    loadAccessPoints: Function,
    postCheckin: Function,
    fcmSetup: Function,
    fcmRemove: Function,
    fcmSetToken: Function,
  }

  componentDidMount() {
    this.props.loadUser()
    this.props.loadAccessPoints()
    this.fcmSetup()
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  async fcmSetup() {
    console.log(FCM)
    FCM.getFCMToken().then(token => {
      console.log(token)
      this.props.fcmSetToken(token)
      this.props.fcmSetup()
      // store fcm token in your server
    })
    this.notificationListener = FCM.on(FCMEvent.Notification, async notif => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      if (notif.local_notification) {
        //this is a local notification
      }
      if (notif.opened_from_tray) {
        //app is open/resumed because user clicked banner
      }
      // debugger
    })
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
      console.log(token)
      this.props.fcmSetToken(token)
      // fcm token may not be available on first load, catch it here
    })
  }

  componentWillUnmount() {
    console.log('WillMount remove jobs')
    AppState.removeEventListener('change', this._handleAppStateChange)
    this.props.fcmRemove()
    this.notificationListener.remove()
    this.refreshTokenListener.remove()
  }

  _handleAppStateChange = (nextAppState: AppEventState) => {
    console.log('state')
    console.log(nextAppState)

    if (nextAppState === 'background') {
      console.log('scheduled')
      // TODO
    } else {
      console.log('reload app')
      this.props.loadUser()
      this.props.loadAccessPoints()
    }
  }

  render() {
    return <RootStack />
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    loadUser: () => dispatch(loadUser()),
    fcmSetup: () => dispatch(fcmSetup()),
    fcmRemove: () => dispatch(fcmRemove()),
    fcmSetToken: token => dispatch(fcmSetToken(token)),
    loadAccessPoints: accessPoints => dispatch(loadAccessPoints()),
    postCheckin: () => dispatch(postCheckin()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
