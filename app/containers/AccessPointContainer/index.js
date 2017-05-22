// @flow

import { connect } from "react-redux"
import AccessPointList from "../../components/AccessPointList"

function mapStateToProps(state) {
	return {
		followAccessPoints: state.get("followAccessPoints"),
		accessPoints: state.get("accessPoints"),
	}
}

function mapDispatchToProps() {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessPointList)
