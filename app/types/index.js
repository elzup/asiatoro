// @flow

import { Record } from "immutable"
import moment from "moment"

export class UserRecord extends Record({ id: 0, name: "", token: "" }) {
	id: number
	name: string
	token: boolean
}

export class CheckinRecord extends Record({ user: null, created_at: "" }) {
	user: UserRecord
	created_at: string

	timestamp() {
		return moment(this.created_at)
	}

	justNow() {
		return this.timestamp() < moment().add(-15, "m")
	}
}

export class AccessPointRecord
	extends Record({ ssid: "", bssid: "", follow: false, checkins: [] }) {
	ssid: string
	bssid: string
	follow: boolean
	checkins: Array<CheckinRecord>
}
