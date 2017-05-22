// @flow

import React from "react"
import { Content, Icon, List, ListItem } from "native-base"
import { View, Text } from "react-native"
import { AccessPointRecord } from "../types"

type Props = {
	accessPoints: Array<AccessPointRecord>
}

export default class AccessPointList extends React.Component {
	props: Props

	componentDidMount() {}

	renderAccessPointList() {
		const { accessPoints } = this.props

		return accessPoints.toArray().map((ap: AccessPointRecord, index) => (
			<ListItem style={{ flex: 1 }} key={ap.bssid}>
				<Text style={{ alignSelf: "center" }}>
					{ap.ssid}({ap.bssid})
				</Text>
				{ap.follow ? <Icon name="star" /> : null}
			</ListItem>
		))
	}

	render() {
		return (
			<Content contentContainerStyle={{ justifyContent: "space-between" }}>
				<View>
					<List>
						{this.renderAccessPointList()}
					</List>
				</View>
			</Content>
		)
	}
}
