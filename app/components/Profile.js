// @flow

import React from "react"
import Spinner from "react-native-loading-spinner-overlay"

import { UserRecord } from "../types"
import { Content, Text } from "native-base"

type State = {
	name: string
}

export class Profile extends React.Component {
	props: {
		user: UserRecord,
		error: string,
		loadingUser: boolean,
		setUser: (user: UserRecord) => {},
		setError: (error: string) => {},
		createUser: (name: string) => {}
	}
	state: State = {
		name: "",
	}

	componentDidMount() {}

	componentWillReceiveProps(props) {
		const { name } = props.user
		this.setState({ name })
		if (!this.props.loadingUser && !this.props.user.isRegistered()) {
			// no Login
			this.props.navigation.navigate("LoginModal")
		}
	}

	render() {
		return (
			<Content style={{ padding: 5 }}>
				<Text>Registered: {this.props.user.name}</Text>
				<Spinner
					visible={this.props.loadingUser}
					textContent={"Loading..."}
					textStyle={{ color: "#FFF" }}
				/>
			</Content>
		)
	}
}
