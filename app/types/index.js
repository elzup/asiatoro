// @flow

import { Record } from "immutable"

export class AccessPointRecord
	extends Record({ ssid: "", bssid: "", follow: false }) {
	ssid: string
	bssid: string
	follow: boolean
}

export class UserRecord extends Record({ id: 0, name: "", token: "" }) {
	id: number
	name: string
	token: boolean
}
