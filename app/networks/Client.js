// @flow

import { create } from "apisauce"
import { UserRecord } from "../types"

class AsiatoroClient {
	api: any
	host = __DEV__ ? "http://localhost:3000" : "https://asiatoro.heroku.com"

	constructor() {
		this.api = create({
			baseURL: this.host,
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
}

export default new AsiatoroClient()
