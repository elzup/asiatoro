// @flow

import { connect } from "react-redux"
import { loadAccessPoints } from "./action"
import AccessPointList from "./components/AccessPointList"

function mapStateToProps(state) {
	return {
		accessPoints: state.get("accessPoints"),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadAccessPoints: accessPoints => dispatch(loadAccessPoints()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessPointList)
