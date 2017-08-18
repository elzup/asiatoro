// @flow

import React, { Component } from 'react'
import { AppState, Platform, AppRegistry } from 'react-native'
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
  }

  componentDidMount() {
    this.props.loadUser()
    this.props.loadAccessPoints()
    this.fcmSetup()
    AppRegistry.registerHeadlessTask(
      'postCheckin',
      this.checkinJobLoop.bind(this)
    )
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  async fcmSetup() {
    FCM.requestPermissions() // for iOS
    FCM.getFCMToken().then(token => {
      console.log(token)
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
      await someAsyncCall()
    })
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
      console.log(token)
      // fcm token may not be available on first load, catch it here
    })
    this.props.fcmSetup()
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

  async checkinJobLoop() {
    while (true) {
      sleep(1000)
      await this.checkinJob()
    }
  }

  async checkinJob() {
    if (!this.props.user.isRegistered()) {
      console.log("don't registered yat")
      return
    }
    try {
      console.log('checkin log.')
      this.props.postCheckin()
    } catch (e) {
      console.log(e)
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
    loadAccessPoints: accessPoints => dispatch(loadAccessPoints()),
    postCheckin: () => dispatch(postCheckin()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
