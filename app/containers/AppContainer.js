// @flow

import React, { Component } from "react"
import { Container, Header, Tab, Tabs } from "native-base"
import AccessPointContainer from "./AccessPointContainer"
import ProfileContainer from "./ProfileContainer"
import FollowContainer from "./FollowContainer"
import { connect } from "react-redux"
import { loadUser, loadAccessPoints, postCheckin } from "../action"

type Props = {
	loadUser: Function,
	loadAccessPoints: Function,
	postCheckin: Function
}

class AppContainer extends Component {
	props: Props

	componentDidMount() {
		this.props.loadUser()
		this.props.loadAccessPoints()
		this.props.postCheckin()
	}

	render() {
		return (
			<Container>
				<Header hasTabs />
				<Tabs>
					<Tab heading="Home">
						<FollowContainer />
					</Tab>
					<Tab heading="Networks">
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

function mapStateToProps() {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		loadUser: () => dispatch(loadUser()),
		loadAccessPoints: accessPoints => dispatch(loadAccessPoints()),
		postCheckin: accessPoints => dispatch(postCheckin()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
