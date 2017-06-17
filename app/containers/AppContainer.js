// @flow

import React, {Component} from "react"
import {AppState} from "react-native"
const {Container, Header, Tab, Tabs, Title, Body} = require("native-base")
import {connect} from "react-redux"

import AccessPointContainer from "./AccessPointContainer"
import ProfileContainer from "./ProfileContainer"
import FollowContainer from "./FollowContainer"
import {loadUser, loadAccessPoints, postCheckin} from "../action"
import {UserRecord} from "../types/index"

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
		AppState.addEventListener("change", this._handleAppStateChange)
	}

	componentWillUnmount() {
		AppState.removeEventListener("change", this._handleAppStateChange)
	}

	_handleAppStateChange = (nextAppState: AppEventState) => {
		console.log("state")
		console.log(nextAppState)

		if (nextAppState === "background") {
			console.log("scheduled")
		} else {
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
