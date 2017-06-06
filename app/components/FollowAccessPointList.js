// @flow

import React from "react"
import {Content, Card, CardItem, Icon, Left} from "native-base"
import {View, Text} from "react-native"
import {AccessPointRecord, CheckinRecord, UserRecord} from "../types"

type Props = {
  followAccessPoints: Array<AccessPointRecord>,
  user: UserRecord
}

export default class FollowAccessPointList extends React.Component {
	props: Props

	componentDidMount() {}

	renderCheckinCardItem(ci: CheckinRecord) {
		return (
			<View
				key={ci.user.name}
				style={{
					width: 70,
					borderRadius: 3,
					margin: 2,
					padding: 2,
					alignItems: "center",
				}}
      >
				<Icon
					active
					name="person"
					style={{color: ci.justNow() ? "black" : "#ddd"}}
        />
				<Text>{ci.user.name}</Text>
				<Text style={{fontSize: 10}}>
					{ci.timestamp().fromNow()}
				</Text>
			</View>
		)
	}

	renderAccessPointCard(ap: AccessPointRecord) {
		return (
			<Card key={ap.ssid}>
				<CardItem header>
					<Icon active name="wifi" />
					<Text>{ap.ssid}</Text>
				</CardItem>
				<View style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
					{ap.checkins.map(ci => this.renderCheckinCardItem(ci))}
				</View>
			</Card>
		)
	}

	renderNavigateRegister() {
		if (this.props.user.isRegistered()) {
			return null
		}
		return <Text style={{margin: 10}}>Profile タブでユーザ登録しよう！</Text>
	}

	renderNoFollow() {
		if (
      !this.props.user.isRegistered() ||
      this.props.followAccessPoints.size > 0
    ) {
			return null
		}
		return <Text style={{margin: 10}}>Networks タブでネットワークをフォローしよう！</Text>
	}

	renderCards() {
		return (
			<View>
				{this.props.followAccessPoints.map(ap =>
          this.renderAccessPointCard(ap)
        )}
			</View>
		)
	}

	render() {
		return (
			<Content
				style={{padding: 5}}
				contentContainerStyle={{justifyContent: "space-between"}}
      >
				{this.renderNavigateRegister()}
				{this.renderNoFollow()}
				{this.renderCards()}
			</Content>
		)
	}
}
