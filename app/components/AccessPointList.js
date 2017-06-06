// @flow

import React from "react"
import {Content, Icon, Button, List, ListItem, Right, Text} from "native-base"
import {View} from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import {AccessPointRecord} from "../types"

type Props = {
  accessPoints: Array<AccessPointRecord>,
  postFollow: (ap: AccessPointRecord) => {},
  loading: boolean
}

export default class AccessPointList extends React.Component {
	props: Props

	componentDidMount() {}

	renderAccessPointList() {
		const {accessPoints} = this.props

		return accessPoints.map((ap: AccessPointRecord, index) =>
			<ListItem style={{flex: 1}} key={ap.ssid}>
				<Text style={{alignSelf: "center"}}>
					{ap.ssid}({ap.bssid})
        </Text>
				<Right>
					<Button
						transparent
						onPress={() => {
							this.props.postFollow(ap, !ap.follow)
						}}
          >
						<Icon active={ap.follow} name="star" color="yellow" />
					</Button>
				</Right>
			</ListItem>
    )
	}

	render() {
		return (
			<Content contentContainerStyle={{justifyContent: "space-between"}}>
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
