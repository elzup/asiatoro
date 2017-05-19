// @flow

import { NativeModules, Platform } from "react-native"
import { AccessPointRecord } from "../../types"

const { ReadAccessPoint, NativeUtilModuleAndroid } = NativeModules

export function* getAccessPoints(): Array<AccessPointRecord> {
	if (Platform.OS === "ios") {
		const res = yield ReadAccessPoint.getAccessPoints()
		return JSON.parse(res)
	} else {
		const res = yield NativeUtilModuleAndroid.getAccessPoints()
		if (res === null) {
			if (__DEV__) {
				return [
					new AccessPointRecord({ ssid: "Hoge", bssid: "aa:bb:cc:d1" }),
					new AccessPointRecord({ ssid: "Fuga", bssid: "aa:bb:cc:d2" }),
					new AccessPointRecord({ ssid: "Piyo", bssid: "aa:bb:cc:d3" }),
				]
			}
			return []
		}
		console.log(res)
		return res.split("##").map(v => {
			ssid, (bssid = v.split("#"))
			return new AccessPointRecord({ ssid, bssid })
		})
	}
}
