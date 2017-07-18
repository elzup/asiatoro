// @flow

import { AccessPointRecord } from "../types"
import _ from "lodash"

const powerScore = (v: AccessPointRecord) => -(v.follow * 1000 + v.power)
const sortByScore = (aps: Array<AccessPointRecord>) => _.sortBy(aps, powerScore)
export const uniqBySSID = (aps: Array<AccessPointRecord>) =>
  _.uniqBy(aps, "ssid")
export const sortWithUniq = (aps: Array<AccessPointRecord>) =>
  uniqBySSID(sortByScore(aps))
