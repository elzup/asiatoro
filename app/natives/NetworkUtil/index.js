// @flow

import { NativeModules, Platform } from 'react-native'
import { AccessPointRecord } from '../../types'

const { ReadAccessPoint, NativeUtilModuleAndroid } = NativeModules

export function* getAccessPoints(): Array<AccessPointRecord> {
  if (__DEV__) {
    return [
      new AccessPointRecord({
        ssid: 'dummy-Hoge',
        power: -50,
        bssid: 'aa:bb:cc:d1',
      }),
      new AccessPointRecord({ ssid: 'dummy-1号館', power: -50, bssid: 'bssid1' }),
      new AccessPointRecord({ ssid: 'dummy-2号館', power: -50, bssid: 'bssid2' }),
      new AccessPointRecord({ ssid: 'dummy-3号館', power: -50, bssid: 'bssid3' }),
    ]
  }

  const res = yield NativeUtilModuleAndroid.getAccessPoints()
  if (res === null) {
    return []
  }
  // 空文字 SSID を除去
  return res.split('##').map(v => {
    const [ssid, bssid, power] = v.split('#')
    return new AccessPointRecord({ ssid, bssid, power: parseInt(power) })
  })
}
