// @flow

import React from "react"
import { Content, List, ListItem } from "native-base"
import { View, Text } from "react-native"

type Props = {
	accessPoints: any,
	loadAccessPoints: Function
}

export default class AccessPointList extends React.Component {
	props: Props

	componentDidMount() {
		this.props.loadAccessPoints()
	}

	renderAccessPointList() {
		const { accessPoints } = this.props

		return accessPoints.toArray().map((item, index) => (
			<ListItem style={{ flex: 1 }}>
				<Text style={{ alignSelf: "center" }}>
					{item}
				</Text>
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
