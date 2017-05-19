// @flow

import React from "react"
import { Content, Card, CardItem, Icon, Col, Grid } from "native-base"
import { View, Text } from "react-native"
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
			<View
				style={{
					width: 70,
					borderRadius: 3,
					margin: 2,
					padding: 2,
					alignItems: "center",
				}}
			>
				<Icon name="person" />
				<Text>{ci.user.name}</Text>
			</View>
		)
	}

	renderAccessPointCard(ap: AccessPointRecord) {
		console.log(ap.checkins)
		return (
			<Card key={ap.bssid}>
				<CardItem header>
					<Icon name="wifi" />
					<Text>{ap.ssid}({ap.bssid})</Text>
				</CardItem>
				<View
					style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
				>
					{ap.checkins.map(ci => this.renderCheckinCardItem(ci))}
				</View>
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
