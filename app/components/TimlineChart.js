// @flow

import React from 'react'
import _ from 'lodash'
import { Scatterplot } from 'react-native-pathjs-charts'
import type { CheckinRecord, UserRecord } from '../types'
import { Content, View, Grid, Col, Text } from 'native-base'

type Props = {
  checkins: Array<CheckinRecord>,
}

export function TimelineChart({ checkins }: Props) {
  const userNames: Array<string> = _.uniq(_.map(checkins, v => v.user.name))
  const users = {}
  _.each(userNames, name => {
    users[name] = new Array(24).fill(false)
  })
  _.each(checkins, (v: CheckinRecord) => {
    users[v.user.name][v.timestamp().hour()] = true
  })
  return (
    <Content style={{ background: 'red', width: '100%' }}>
      {_.map(userNames, name =>
        <Grid key={name}>
          <Col style={{ width: '20%' }}>
            <Text>
              {name}
            </Text>
          </Col>
          <Col>
            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              {_.map(_.range(0, 24), h =>
                <View
                  key={h}
                  style={{
                    flex: 1,
                    backgroundColor: users[name][h] ? 'red' : 'white',
                  }}
                >
                  <Text>
                    {users[name][h] ? h : ''}
                  </Text>
                </View>
              )}
            </View>
          </Col>
        </Grid>
      )}
    </Content>
  )
}
