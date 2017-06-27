// @flow

import React from "react"
const {
	Form,
	Content,
	Input,
	Button,
	Label,
	Text,
	Item,
	Icon,
} = require("native-base")
import { View } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"

import { UserRecord } from "../types"
import { ErrorTypes } from "../constants"

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

	componentDidMount() {
		if (!this.props.user.isRegistered()) {
			this.props.navigation.navigate("LoginModal")
		}
	}

	componentWillReceiveProps(props) {
		const { name } = props.user
		this.setState({ name })
	}

	render() {
		return (
			<Content style={{ padding: 5 }}>
				<Text>Registered: {user.name}</Text>
				<Spinner
					visible={this.props.loadingUser}
					textContent={"Loading..."}
					textStyle={{ color: "#FFF" }}
				/>
			</Content>
		)
	}
}
