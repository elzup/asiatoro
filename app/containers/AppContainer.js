// @flow

import React, {Component} from "react"
import {AppState} from "react-native"
const {Container, Header, Tab, Tabs, Title, Body} = require("native-base")
import {connect} from "react-redux"
import BackgroundJob from "react-native-background-job"

import AccessPointContainer from "./AccessPointContainer"
import ProfileContainer from "./ProfileContainer"
import FollowContainer from "./FollowContainer"
import {loadUser, loadAccessPoints, postCheckin} from "../action"
import {UserRecord} from "../types/index"

BackgroundJob.setGlobalWarnings(false)

type AppEventState = "change" | "background"

class AppContainer extends Component {
	props: {
    user: UserRecord,
    loadUser: Function,
    loadAccessPoints: Function,
    postCheckin: Function
  }

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
		console.log("WillMount remove jobs")
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
				period: 1000 * 5,
				alwaysRunning: true,
			})
		} else {
			console.log("reload app")
			this.props.loadUser()
			this.props.loadAccessPoints()
		}
	}

	checkinJob() {
		try {
			console.log("checkin log.")
			this.props.postCheckin()
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		return (
			<Container>
				<Header hasTabs>
					<Body style={{flex: 1}}>
						<Title>Asiatoro</Title>
					</Body>
				</Header>
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

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadUser: () => dispatch(loadUser()),
		loadAccessPoints: accessPoints => dispatch(loadAccessPoints()),
		postCheckin: () => dispatch(postCheckin()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
