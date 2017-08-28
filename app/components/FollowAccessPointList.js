// @flow

import React from 'react'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Fab,
  Icon,
  Spinner,
  Text,
  View,
} from 'native-base'
import _ from 'lodash'
import { TimelineChart } from './TimelineChart'

import { AccessPointRecord, CheckinRecord, UserRecord } from '../types'
import type { Watch } from '../types/index'
import { TouchableOpacity } from 'react-native'
import { checkinKey } from '../utils'

export default class FollowAccessPointList extends React.Component {
  props: {
    loadUser: Function,
    loadingCheckins: boolean,
    followAccessPoints: Array<AccessPointRecord>,
    user: UserRecord,
    watches: Array<Watch>,
    watchCheckin: (user, ap) => {},
    unwatchCheckin: (user, ap) => {},
  }

  renderCheckinCardItem(ci: CheckinRecord, ap: AccessPointRecord) {
    const { watches, watchCheckin, unwatchCheckin } = this.props
    let color = '#ddd'
    if (ci.justNow()) {
      color = 'black'
    }
    const watch = _.includes(watches, checkinKey(ci.user, ap))
    if (watch) {
      color = '#ffb823'
    }
    return (
      <TouchableOpacity
        key={ci.user.name}
        style={{
          width: 70,
          borderRadius: 3,
          margin: 2,
          padding: 2,
          alignItems: 'center',
        }}
        onPress={() => {
          if (ci.justNow()) {
            return
          }
          if (watch) {
            unwatchCheckin(ci.user, ap)
          } else {
            watchCheckin(ci.user, ap)
          }
        }}
      >
        <Icon active name="person" style={{ color }} />
        <Text>
          {ci.user.name}
        </Text>
        <Text style={{ fontSize: 10 }}>
          {ci.timestamp().fromNow()}
        </Text>
      </TouchableOpacity>
    )
  }

  renderAccessPointCard(ap: AccessPointRecord) {
    return (
      <Card key={ap.ssid}>
        <CardItem header>
          <Icon active name="wifi" />
          <Text>
            {ap.ssid}
          </Text>
        </CardItem>
        <CardItem>
          <Body>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {_.sortBy(ap.last_checkins, (c: CheckinRecord) =>
                c.timestamp()
              ).map(ci => this.renderCheckinCardItem(ci, ap))}
            </View>
            <TimelineChart checkins={ap.today_checkins} />
          </Body>
        </CardItem>
      </Card>
    )
  }

  renderNavigateTexts() {
    if (this.props.followAccessPoints.length === 0) {
      return (
        <View style={{ margin: 10 }}>
          <Text>
            <FAIcon name="exclamation-circle" color="orange" size={20} />
            Networks タブでアクセスポイントをお気に入りしよう！
          </Text>
        </View>
      )
    }
  }

  renderCards() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {this.props.followAccessPoints.map(ap =>
          this.renderAccessPointCard(ap)
        )}
      </View>
    )
  }

  render() {
    if (this.props.loadingCheckins) {
      return <Spinner color="blue" />
    }
    return (
      <Container>
        <Content>
          {this.renderNavigateTexts()}
          {this.renderCards()}
        </Content>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => {
            this.props.loadUser()
          }}
        >
          <Icon name="sync" />
        </Fab>
      </Container>
    )
  }
}
