// @flow

import React from "react"
import { Container, Header, Title, Content, List, ListItem } from "native-base"
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
			<Container>
				<Header>
					<Title>Access Points</Title>
				</Header>

				<Content contentContainerStyle={{ justifyContent: "space-between" }}>
					<View>
						<List>
							{this.renderAccessPointList()}
						</List>
					</View>
				</Content>
			</Container>
		)
	}
}
