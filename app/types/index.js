// @flow

import { Record } from "immutable"

export class AccessPointRecord
	extends Record({ ssid: "", bssid: "", follow: false }) {
	ssid: string
	bssid: string
	follow: boolean
}
