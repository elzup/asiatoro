// @flow

import { Record } from "immutable"

export class AccessPointRecord extends Record({ ssid: "", bssid: "" }) {
	ssid: string
	bssid: string
}
