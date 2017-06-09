// @flow

import React from "react"
// NOTE: why import not working in webstorm

const {
  Content,
  Icon,
  Button,
  List,
  ListItem,
  Spinner,
  Right,
  Left,
  Text,
} = require("native-base")
import FAIcon from "react-native-vector-icons/FontAwesome"

import {View} from "react-native"
import OverlaySpinner from "react-native-loading-spinner-overlay"
import {UserRecord, AccessPointRecord} from "../types"

export default class AccessPointList extends React.Component {
	props: {
    accessPoints: Array<AccessPointRecord>,
    postFollow: (ap: AccessPointRecord) => {},
    loadingFollow: boolean,
    loadingAccessPoints: boolean,
    user: UserRecord
  }

	componentDidMount() {}

	renderNavigateTexts() {
		const {user, accessPoints, loadingAccessPoints} = this.props
		if (!user.isRegistered()) {
			return (
				<View style={{margin: 10}}>
					<Text>
						<FAIcon name="exclamation-circle" color="orange" size={20} />Profile
            タブでユーザ登録しよう！
          </Text>
				</View>
			)
		}
		if (!accessPoints || accessPoints.length === 0) {
			return (
				<View style={{margin: 10}}>
					<Text>
						<FAIcon
							name="exclamation-circle"
							color="orange"
							size={20}
            />アクセスポイントが見つかりません。電波状態、または Wi-Fi の設定が OFF になっていないか確認してください。
          </Text>
				</View>
			)
		}
		return (
			<View style={{margin: 10}}>
				{loadingAccessPoints && <Spinner color="blue" />}
			</View>
		)
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
				{this.renderNavigateTexts()}
				<View>
					<List>
						{this.renderAccessPointList()}
					</List>
				</View>
				<OverlaySpinner
					visible={this.props.loadingFollow}
					textContent={"Loading..."}
					textStyle={{color: "#FFF"}}
        />
			</Content>
		)
	}
}
