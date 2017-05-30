// @flow

import { create } from "apisauce"
import { UserRecord, AccessPointRecord } from "../types"

// const host = __DEV__ ? "http://localhost:3000" : "https://asiatoro.herokuapp.com"
const host = "https://asiatoro.herokuapp.com"

class AsiatoroClient {
	api: any

	constructor() {
		this.api = create({
			baseURL: host,
			timeout: 10000,
		})
	}

	setUser(user: UserRecord) {
		this.api.setHeader("Authorization", `Bearer:${user.id}:${user.token}`)
	}

	async getFollowAccessPoint() {
		const res = await this.api.get("/v1/access_points")
		console.log("res", res)
		if (!res.ok) {
			throw new Error("can't request")
		}
		return res
	}

	async postUser(params: { name: string, pass: string }) {
		const res = await this.api.post("/v1/users", params)
		console.log("res", res)
		return res
	}

	async postFollow({ ap }: { ap: AccessPointRecord }) {
		const res = await this.api.post("/v1/follows", {
			ssid: ap.ssid,
			bssid: ap.bssid,
		})
		console.log("res", res)
		return res
	}

	async deleteFollow({ ap }: { ap: AccessPointRecord }) {
		const res = await this.api.delete("/v1/follows", {
			ssid: ap.ssid,
			bssid: ap.bssid,
		})
		console.log("res", res)
		return res
	}

	async postCheckin({ ap }: { ap: AccessPointRecord }) {
		const res = await this.api.post("/v1/checkins", {
			ssid: ap.ssid,
			bssid: ap.bssid,
		})
		return res
	}
}

export default new AsiatoroClient()
