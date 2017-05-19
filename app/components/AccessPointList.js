// @flow

import React from "react"
import { Content, List, ListItem } from "native-base"
import { View, Text } from "react-native"
import { AccessPointRecord } from "../types"

type Props = {
	accessPoints: any,
	loadAccessPoints: Function
}

export default class AccessPointList extends React.Component {
	props: Props

	componentDidMount() {
		this.props.loadAccessPoints()
	}

	renderAccessPointList() {
		const { accessPoints } = this.props

		return accessPoints.toArray().map((item: AccessPointRecord, index) => (
			<ListItem style={{ flex: 1 }} key={item.bssid}>
				<Text style={{ alignSelf: "center" }}>
					{item.ssid}({item.bssid})
				</Text>
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
