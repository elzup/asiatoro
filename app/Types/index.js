// @flow

import { Record } from "immutable"

const AccessPoint = Record({
	ssid: "",
	mac: false,
})

export default class ToDo extends ToDoRecord {
	getText() {
		return this.get("text") || "New ToDo"
	}
}
