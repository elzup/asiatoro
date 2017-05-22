// @flow

import React from "react"
import { Content, Icon, Button, List, ListItem, Right, Text } from "native-base"
import { View } from "react-native"
import { AccessPointRecord } from "../types"

type Props = {
	accessPoints: Array<AccessPointRecord>,
	postFollow: (ap: AccessPointRecord) => {}
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
				<Right>
					<Button
						onPress={() => {
							this.props.postFollow(ap, !ap.follow)
						}}
					>
						<Icon active={ap.follow} name="star" color="yellow" />
					</Button>
				</Right>
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
