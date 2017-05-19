// @flow

import React, { Component } from "react"
import { Container, Header, Tab, Tabs } from "native-base"
import AccessPointContainer from "./AccessPointContainer"
import ProfileContainer from "./ProfileContainer"

export default class AppContainer extends Component {
	render() {
		return (
			<Container>
				<Header hasTabs />
				<Tabs>
					<Tab heading="Network 一覧">
						<AccessPointContainer />
					</Tab>
					<Tab heading="Profile">
						<ProfileContainer />
					</Tab>
				</Tabs>
			</Container>
		)
	}
}
