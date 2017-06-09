// @flow

import React from "react"
import {View, RefreshControl} from "react-native"
import {AccessPointRecord, CheckinRecord, UserRecord} from "../types"
import FAIcon from "react-native-vector-icons/FontAwesome"

const {Content, Text, Card, CardItem, Icon} = require("native-base")

export default class FollowAccessPointList extends React.Component {
	props: {
    loadUser: Function,
    loadingCheckins: boolean,
    followAccessPoints: Array<AccessPointRecord>,
    user: UserRecord
  }

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
					{_.sortBy(ap.checkins, (c: CheckinRecord) => -c.timestamp()).map(ci =>
            this.renderCheckinCardItem(ci)
          )}
				</View>
			</Card>
		)
	}

	renderNavigateTexts() {
		if (!this.props.user.isRegistered()) {
			return (
				<View style={{margin: 10}}>
					<Text>
						<FAIcon name="exclamation-circle" color="orange" size={20} />
            Profile タブでユーザ登録しよう！
          </Text>
				</View>
			)
		}
		if (
      this.props.user.isRegistered() &&
      this.props.followAccessPoints.length === 0
    ) {
			return (
				<View style={{margin: 10}}>
					<Text>
						<FAIcon name="exclamation-circle" color="orange" size={20} />
            Networks タブでネットワークをフォローしよう！
          </Text>
				</View>
			)
		}
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
				refreshControl={
					<RefreshControl
						refreshing={this.props.loadingCheckins}
						onRefresh={() => {
							this.props.loadUser()
						}}
          />
        }
      >
				{this.renderNavigateTexts()}
				{this.renderCards()}
			</Content>
		)
	}
}
