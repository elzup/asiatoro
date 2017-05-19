// @flow

import React from "react"
import { Content, Card, CardItem, Icon, Right } from "native-base"
import { Text } from "react-native"
import { AccessPointRecord, CheckinRecord } from "../types"

type Props = {
	followAccessPoints: Array<AccessPointRecord>
}

export default class FollowAccessPointList extends React.Component {
	props: Props

	componentDidMount() {}

	renderCheckinCardItem(ci: CheckinRecord) {
		console.log(ci)
		return (
			<CardItem key={ci.user.name}>
				<Text>{ci.user.name}</Text>
			</CardItem>
		)
	}

	renderAccessPointCard(ap: AccessPointRecord) {
		console.log(ap.checkins)
		return (
			<Card key={ap.bssid}>
				<CardItem header>
					<Text>{ap.ssid}({ap.bssid})</Text>
				</CardItem>
				{ap.checkins.map(ci => this.renderCheckinCardItem(ci))}
			</Card>
		)
	}

	render() {
		return (
			<Content contentContainerStyle={{ justifyContent: "space-between" }}>
				{this.props.followAccessPoints.map(ap =>
					this.renderAccessPointCard(ap)
				)}
			</Content>
		)
	}
}
