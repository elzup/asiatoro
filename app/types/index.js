// @flow

import moment from "moment"
import {IconType} from "../themes/icon"

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

export class UserRecord {
	id: number
	name: string
	pass: string
	token: boolean

	constructor(params) {
		Object.assign(this, params)
	}

	isRegistered(): boolean {
		return !!this.id
	}
}

export class CheckinRecord {
	user: UserRecord
	created_at: string

	constructor(params) {
		Object.assign(this, params)
	}

	timestamp() {
		return moment(this.created_at)
	}

	justNow() {
		return this.timestamp() >= moment().add(-15, "m")
	}
}

export class AccessPointRecord {
	constructor(params) {
		Object.assign(this, params)
	}

	setFollow(follow) {
		this.follow = follow
		return this
	}

	powerIconType() {
		if (this.power <= -75) {
			return IconType.face.bad
		} else if (this.power <= -60) {
			return IconType.face.normal
		} else {
			return IconType.face.good
		}
	}

	ssid: string
	bssid: string
	power: number
	follow: boolean
	checkins: Array<CheckinRecord>
}
