/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from "react"
import { TouchableHighlight } from "react-native"

export default function Button(props) {
	return (
		<TouchableHighlight onPress={props.onPress}>
			{props.children}
		</TouchableHighlight>
	)
}

Button.defaultProps = {
	children: null,
	onPress: () => {},
}
