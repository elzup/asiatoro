// @flow

import React, {Component} from "react"
import {AppState} from "react-native"
import {Container, Header, Tab, Tabs} from "native-base"
import {connect} from "react-redux"
import BackgroundJob from "react-native-background-job"

import AccessPointContainer from "./AccessPointContainer"
import ProfileContainer from "./ProfileContainer"
import FollowContainer from "./FollowContainer"
import {loadUser, loadAccessPoints, postCheckin} from "../action"

type Props = {
  loadUser: Function,
  loadAccessPoints: Function,
  postCheckin: Function
}

BackgroundJob.setGlobalWarnings(false)

type AppEventState = "change" | "background"

class AppContainer extends Component {
	props: Props

	componentDidMount() {
		this.props.loadUser()
		this.props.loadAccessPoints()
		BackgroundJob.register({
			jobKey: "checkinJob",
			job: this.checkinJob.bind(this),
			networkType: BackgroundJob.NETWORK_TYPE_ANY,
		})
		AppState.addEventListener("change", this._handleAppStateChange)
	}

	componentWillUnmount() {
		AppState.removeEventListener("change", this._handleAppStateChange)
	}

	_handleAppStateChange = (nextAppState: AppEventState) => {
		console.log("state")
		console.log(nextAppState)
		BackgroundJob.cancelAll()

		if (nextAppState === "background") {
			console.log("scheduled")
			BackgroundJob.schedule({
				jobKey: "checkinJob",
				timeout: 5000,
				period: 10000,
				alwaysRunning: true,
			})
		}
	}

	checkinJob() {
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
		postCheckin: () => dispatch(postCheckin()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
