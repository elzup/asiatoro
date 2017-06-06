// @flow

import React, { Component } from "react"
import { AppState } from "react-native"
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

var backgroundSchedule = {
	jobKey: "checkinJob",
	timeout: 5000,
	period: 10000,
}
BackgroundJob.setGlobalWarnings(false)
BackgroundJob.cancelAll()

type AppEventState = "change" | "background"

class AppContainer extends Component {
	props: Props

	componentDidMount() {
		this.props.loadUser()
		this.props.loadAccessPoints()

		BackgroundJob.register({
			jobKey: "checkinJob",
			job: this.checkinJob,
		})
		AppState.addEventListener("change", (state: AppEventState) => {
			console.log("state")
			console.log(state)
			if (state === "background") {
				console.log("scheduled")
				BackgroundJob.schedule(backgroundSchedule)
			} else {
				console.log("canceled")
				BackgroundJob.cancelAll()
			}
		})
	}

	componentWillUnmount() {}

	async checkinJob() {
		console.log("checkin log.")
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
