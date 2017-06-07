// @flow

import React from "react"
// NOTE: why import not working in webstorm
const {
  Content,
  Icon,
  Button,
  List,
  ListItem,
  Right,
  Left,
  Text,
} = require("native-base")
import FAIcon from "react-native-vector-icons/FontAwesome"

import {View} from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import {AccessPointRecord} from "../types"

export default class AccessPointList extends React.Component {
	props: {
    accessPoints: Array<AccessPointRecord>,
    postFollow: (ap: AccessPointRecord) => {},
    loading: boolean,
    user: UserRecord
  }

	componentDidMount() {}

	renderNavigateRegister() {
		if (this.props.user.isRegistered()) {
			return null
		}
		return <Text style={{margin: 10}}>Profile タブでユーザ登録しよう！</Text>
	}

	renderAccessPointList() {
		if (!this.props.user.isRegistered()) {
			return null
		}
		const {accessPoints} = this.props

		return accessPoints.map((ap: AccessPointRecord, index) =>
			<ListItem key={ap.ssid}>
				<Left>
					<View style={{display: "flex", flexDirection: "column"}}>
						<Text
							style={{
								alignSelf: "center",
								overflow: "hidden",
								textAlign: "left",
							}}
            >
							{ap.ssid}
						</Text>
						<Text style={{fontSize: 10, overflow: "hidden", textAlign: "left"}}>
              ({ap.bssid})
            </Text>
					</View>
				</Left>
				<Right>
					<Button
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
						transparent
						onPress={() => {
							this.props.postFollow(ap, !ap.follow)
						}}
          >
						<FAIcon active name={ap.powerIconType()} size={20} color="black" />
						<Icon active={ap.follow} name="star" />
					</Button>
				</Right>
			</ListItem>
    )
	}

	render() {
		return (
			<Content contentContainerStyle={{justifyContent: "space-between"}}>
				{this.renderNavigateRegister()}
				<View>
					<List>
						{this.renderAccessPointList()}
					</List>
				</View>
				<Spinner
					visible={this.props.loading}
					textContent={"Loading..."}
					textStyle={{color: "#FFF"}}
        />
			</Content>
		)
	}
}
