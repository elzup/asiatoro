// @flow

import React from "react"
// NOTE: why import not working in webstorm

import {
	Content,
	Icon,
	Button,
	List,
	ListItem,
	Spinner,
	Right,
	Left,
	Text,
	Container,
	Fab,
} from "native-base"
import FAIcon from "react-native-vector-icons/FontAwesome"

import { View } from "react-native"
import { UserRecord, AccessPointRecord } from "../types"

export default class AccessPointList extends React.Component {
	props: {
		accessPoints: Array<AccessPointRecord>,
		postFollow: (ap: AccessPointRecord) => {},
		loadingCheckins: boolean,
		loadingAccessPoints: boolean,
		loadAccessPoints: Function,
		logout: Function,
		user: UserRecord
	}

	componentDidMount() {}

	renderNavigateTexts() {
		const { accessPoints } = this.props
		if (!accessPoints || accessPoints.length === 0) {
			return (
				<View style={{ margin: 10 }}>
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
		return null
	}

	renderAccessPointList() {
		if (!this.props.user.isRegistered()) {
			return null
		}
		const { accessPoints } = this.props

		return accessPoints.map((ap: AccessPointRecord, index) =>
			<ListItem key={ap.ssid}>
				<Left>
					<View>
						<Text
							style={{
								overflow: "hidden",
							}}
						>
							{ap.ssid}
						</Text>
						<Text style={{ fontSize: 10 }}>
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
		const { loadAccessPoints } = this.props
		if (this.props.loadingAccessPoints || this.props.loadingCheckins) {
			return <Spinner color="blue" />
		}
		return (
			<Container>
				<Content contentContainerStyle={{ justifyContent: "space-between" }}>
					{this.renderNavigateTexts()}
					<View>
						<List>
							{this.renderAccessPointList()}
						</List>
					</View>
				</Content>
				<Fab
					direction="up"
					containerStyle={{}}
					style={{ backgroundColor: "#5067FF" }}
					position="bottomRight"
					onPress={() => {
						loadAccessPoints()
					}}
				>
					<Icon name="sync" />
				</Fab>
			</Container>
		)
	}
}
