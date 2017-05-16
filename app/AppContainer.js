// @flow

import { connect } from "react-redux"
import { setAccessPoints } from "./action"
import AccessPointList from "./components/AccessPointList"

function mapStateToProps(state) {
	return {
		accessPoints: state.get("accessPoints"),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setAccessPoints: accessPoints => dispatch(setAccessPoints(accessPoints)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessPointList)
