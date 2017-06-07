// @flow

import {NativeModules, Platform} from "react-native"
import {AccessPointRecord} from "../../types"

const {ReadAccessPoint, NativeUtilModuleAndroid} = NativeModules

export function* getAccessPoints(): Array<AccessPointRecord> {
	if (false && __DEV__) {
		return [
			new AccessPointRecord({ssid: "Hoge", power: -50, bssid: "aa:bb:cc:d1"}),
			new AccessPointRecord({ssid: "1号館", power: -50, bssid: "bssid1"}),
			new AccessPointRecord({ssid: "2号館", power: -50, bssid: "bssid2"}),
			new AccessPointRecord({ssid: "3号館", power: -50, bssid: "bssid3"}),
		]
	}
	if (Platform.OS === "ios") {
		const res = yield ReadAccessPoint.getAccessPoints()
		return JSON.parse(res)
      .map(v => new AccessPointRecord(v))
      .map(v => new AccessPointRecord(v))
	} else {
		const res = yield NativeUtilModuleAndroid.getAccessPoints()
		if (res === null) {
			return []
		}
		return res.split("##").map(v => {
			const [ssid, bssid, power] = v.split("#")
			return new AccessPointRecord({ssid, bssid, power: parseInt(power)})
		})
	}
}
