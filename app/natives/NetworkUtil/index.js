import { NativeModules, Platform } from "react-native"

const { ReadAccessPoint, NativeUtilModuleAndroid } = NativeModules

export function* getAccessPoints() {
	if (Platform.OS === "ios") {
		const res = yield ReadAccessPoint.getAccessPoints()
		return JSON.parse(res)
	} else {
		const res = yield NativeUtilModuleAndroid.getAccessPoints()
		return res.split("#")
	}
}
