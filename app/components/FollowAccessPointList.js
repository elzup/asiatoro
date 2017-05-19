// @flow

import React from "react"
import { Content, List, ListItem } from "native-base"
import { View, Text } from "react-native"
import { AccessPointRecord, CheckinRecord } from "../types"

type Props = {
	followAccessPoints: Array<AccessPointRecord>
}

export default class FollowAccessPointList extends React.Component {
	props: Props

	componentDidMount() {}

	renderCheckinCardItem(ci: CheckinRecord) {
		return (
			<CardItem>
				<Icon active name="logo-googleplus" />
				<Text>{ci.user}</Text>
				<Right>
					<Icon name="arrow-forward" />
				</Right>
			</CardItem>
		)
	}

	renderAccessPointCard(ap: AccessPointRecord) {
		return (
			<Card dataArray={ap.checkins} renderRow={this.renderCheckinCardItem} />
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
