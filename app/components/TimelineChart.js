// @flow

import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import type { CheckinRecord } from '../types'
import { Col, Content, Grid, Text, View } from 'native-base'

type Props = {
  checkins: Array<CheckinRecord>,
}

function heat(n) {
  // max 12 per hour (once 5 minutes)
  return ['#fff', '#ddf', '#88f', '#44f', '#00f'][Math.min(Math.ceil(n / 3), 4)]
}

export function TimelineChart({ checkins }: Props) {
  const userNames: Array<string> = _.uniq(_.map(checkins, v => v.user.name))
  const users = {}
  _.each(userNames, name => {
    users[name] = new Array(24).fill(false)
  })
  _.each(checkins, (v: CheckinRecord) => {
    users[v.user.name][v.timestamp().hour()] += 1
  })
  users['el1'] = { 6: 6, 7: 12, 8: 12, 9: 12, 10: 3 }
  userNames.push('el1')
  users['elw'] = {
    0: 12,
    1: 12,
    2: 12,
    3: 12,
    4: 12,
    5: 12,
    6: 11,
    7: 12,
    8: 6,
    9: 6,
    10: 12,
    15: 8,
    16: 12,
    17: 12,
  }
  userNames.push('elw')
  return (
    <Content style={{ width: '100%' }}>
      <Grid>
        <Col style={{ width: '20%' }}>
          <Text>
            {moment().format('MM/DD')}
          </Text>
        </Col>
        <Col>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>0</Text>
            <Text>6</Text>
            <Text>12</Text>
            <Text>18</Text>
            <Text>24</Text>
          </View>
        </Col>
      </Grid>
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
                    backgroundColor: heat(users[name][h]),
                  }}
                />
              )}
            </View>
          </Col>
        </Grid>
      )}
    </Content>
  )
}
