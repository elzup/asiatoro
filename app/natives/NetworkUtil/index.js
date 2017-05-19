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
		if (__DEV__) {
			return [
				new AccessPointRecord({ ssid: "Hoge", bssid: "Fuga" }),
				new AccessPointRecord({ ssid: "Hoge", bssid: "Fuga" }),
				new AccessPointRecord({ ssid: "Hoge", bssid: "Fuga" }),
			]
		}
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
