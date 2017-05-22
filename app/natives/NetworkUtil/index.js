// @flow

import { NativeModules, Platform } from "react-native"
import { AccessPointRecord } from "../../types"

const { ReadAccessPoint, NativeUtilModuleAndroid } = NativeModules

export function* getAccessPoints(): Array<AccessPointRecord> {
	if (__DEV__) {
		return [
			new AccessPointRecord({ ssid: "Hoge", bssid: "aa:bb:cc:d1" }),
			new AccessPointRecord({ ssid: "Fuga", bssid: "aa:bb:cc:d2" }),
			new AccessPointRecord({ ssid: "Piyo", bssid: "aa:bb:cc:d3" }),
			new AccessPointRecord({ ssid: "1号館", bssid: "bssid1" }),
		]
	}
	if (Platform.OS === "ios") {
		const res = yield ReadAccessPoint.getAccessPoints()
		return JSON.parse(res).map(v => new AccessPointRecord(v))
	} else {
		const res = yield NativeUtilModuleAndroid.getAccessPoints()
		if (res === null) {
			return []
		}
		console.log(res)
		return res.split("##").map(v => {
			ssid, (bssid = v.split("#"))
			return new AccessPointRecord({ ssid, bssid })
		})
	}
}
