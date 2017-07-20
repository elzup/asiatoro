// @flow

import React from "react"
import _ from "lodash"
import { Scatterplot } from "react-native-pathjs-charts"
import type { CheckinRecord } from "../types"
import { View } from "native-base"

type Props = {
  checkins: Array<CheckinRecord>
}

export function TimelineChart({ checkins }: Props) {
  const data = [
    [
      {
        title: "Amapá",
        rating: 4.47,
        episode: 0
      }
    ]
  ]
  let options = {
    width: 290,
    height: 290,
    r: 2,
    margin: {
      top: 20,
      left: 40,
      bottom: 30,
      right: 30
    },
    fill: "#2980B9",
    stroke: "#3E90F0",
    animate: {
      type: "delayed",
      duration: 200
    },
    label: {
      fontFamily: "Arial",
      fontSize: 8,
      fontWeight: true,
      fill: "#34495E"
    },
    axisX: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: "bottom",
      label: {
        fontFamily: "Arial",
        fontSize: 8,
        fontWeight: true,
        fill: "#34495E"
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: "left",
      label: {
        fontFamily: "Arial",
        fontSize: 8,
        fontWeight: true,
        fill: "#34495E"
      }
    }
  }
  return (
    <View>
      <Scatterplot data={data} options={options} xKey="episode" yKey="rating" />
    </View>
  )
}
