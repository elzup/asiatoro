// @flow

import React, { Component } from "react"
import { AppState, Platform } from "react-native"
import { StackNavigator, TabNavigator } from "react-navigation"
import { connect } from "react-redux"
import BackgroundJob from "react-native-background-job"

import { NetworksScreen } from "./Networks"
import { ProfileScreen } from "./Profile"
import { LoginScreen } from "./Login"
import { HomeScreen } from "./Home"
import { loadAccessPoints, loadUser, postCheckin } from "../action"
import { UserRecord } from "../types/index"

BackgroundJob.setGlobalWarnings(false)

type AppEventState = "change" | "background"

const Tabs = TabNavigator(
	{
		Home: {
			screen: HomeScreen,
			path: "",
		},
		Networks: {
			screen: NetworksScreen,
			path: "networks",
		},
		Profile: {
			screen: ProfileScreen,
			path: "profile",
		},
	},
	{
		tabBarOptions: {
			style: {
				backgroundColor: "#0000BE",
			},
		},
	}
)

const RootStack = StackNavigator(
	{
		Home: {
			screen: Tabs,
		},
		LoginModal: {
			screen: LoginScreen,
			model: "modal",
		},
	},
	{
		headerMode: "none",
	}
)

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
				period: __DEV__ ? 1000 * 5 : 1000 * 60, // 5 sec if debug OR 1 min
				// period: 1000 * 60 * 5, // 5 min
				alwaysRunning: true, // TODO: remove waiting solve lib issue
			})
		} else {
			console.log("reload app")
			this.props.loadUser()
			this.props.loadAccessPoints()
		}
	}

	checkinJob() {
		if (!this.props.user.isRegistered()) {
			console.log("don't registered yat")
			return
		}
		try {
			console.log("checkin log.")
			this.props.postCheckin()
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		return <RootStack />
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
