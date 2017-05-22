// @flow

import { Record } from "immutable"
import moment from "moment"

moment.locale("ja", {
	weekdays: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
	weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
	relativeTime: {
		future: "%s",
		past: "%s前",
		s: "%d秒",
		m: "1分",
		mm: "%d分",
		h: "1時間",
		hh: "%d時間",
		d: "1日",
		dd: "%d日",
	},
})

export class UserRecord
	extends Record({ id: 0, name: "", pass: "", token: "" }) {
	id: number
	name: string
	pass: string
	token: boolean

	isRegistered(): boolean {
		return this.id !== 0
	}
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
