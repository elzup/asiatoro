// @flow

import React, { Component } from "react"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { Provider } from "react-redux"
import { composeWithDevTools } from "remote-redux-devtools"

import AppContainer from "./containers/AppContainer"
import reducer from "./reducer"
import sagas from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(sagas)

export default class Index extends Component {
	render() {
		return (
			<Provider store={store}>
				<AppContainer />
			</Provider>
		)
	}
}
