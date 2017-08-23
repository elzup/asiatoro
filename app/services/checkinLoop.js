// @flow

import { AppRegistry } from 'react-native'
import { bgSleep } from '../utils'
import { postCheckin } from '../action'

class CheckinTaskManager {
  constructor() {
    AppRegistry.registerHeadlessTask('postCheckin', event => async data => {
      CheckinTaskManager.checkinJobLoop({ event, ...data })
    })
  }

  setStore(store) {
    this.store = store
  }

  static async checkinJobLoop({ dispatch, event }) {
    console.log('---- checkinJobLoop')
    while (true) {
      await bgSleep(1000 * 60 * 5)
      dispatch(postCheckin())
    }
  }

  start() {
    AppRegistry.startHeadlessTask(1, 'postCheckin', {
      dispatch: this.store.dispatch,
    })
  }
}

export default new CheckinTaskManager()
