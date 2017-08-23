// @flow

import _ from 'lodash'
import BackgroundTimer from 'react-native-background-timer'
import { AccessPointRecord, UserRecord } from '../types'

const powerScore = (v: AccessPointRecord) => -(v.follow * 1000 + v.power)
const sortByScore = (aps: Array<AccessPointRecord>) => _.sortBy(aps, powerScore)
export const uniqBySSID = (aps: Array<AccessPointRecord>) =>
  _.uniqBy(aps, 'ssid')
export const sortWithUniq = (aps: Array<AccessPointRecord>) =>
  uniqBySSID(sortByScore(aps))
export const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))
export const bgSleep = msec =>
  new Promise(resolve => BackgroundTimer.setInterval(resolve, msec))

export const checkinKey = (user: UserRecord, ap: AccessPointRecord) =>
  `${user.id}#${ap.ssid}`
