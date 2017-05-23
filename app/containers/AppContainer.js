// @flow

import React, { Component } from "react"
import { Container, Header, Tab, Tabs } from "native-base"
import { connect } from "react-redux"
import BackgroundJob from "react-native-background-job"

import AccessPointContainer from "./AccessPointContainer"
import ProfileContainer from "./ProfileContainer"
import FollowContainer from "./FollowContainer"
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

		BackgroundJob.register({
			jobKey: "checkinJob",
			job: this.checkinJob,
		})
		var backgroundSchedule = {
			jobKey: "checkinJob",
			timeout: 5000,
			period: 20000,
		}
		BackgroundJob.schedule(backgroundSchedule)
	}

	checkinJob() {
		console.log("a")
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
