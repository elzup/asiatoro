// @flow

import React from "react"
import FAIcon from "react-native-vector-icons/FontAwesome"
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
  View
} from "native-base"
import _ from "lodash"
import { TimelineChart } from "./TimlineChart"

import { AccessPointRecord, CheckinRecord, UserRecord } from "../types"

export default class FollowAccessPointList extends React.Component {
  props: {
    loadUser: Function,
    loadingCheckins: boolean,
    followAccessPoints: Array<AccessPointRecord>,
    user: UserRecord
  }

  renderCheckinCardItem(ci: CheckinRecord) {
    return (
      <View
        key={ci.user.name}
        style={{
          width: 70,
          borderRadius: 3,
          margin: 2,
          padding: 2,
          alignItems: "center"
        }}
      >
        <Icon
          active
          name="person"
          style={{ color: ci.justNow() ? "black" : "#ddd" }}
        />
        <Text>
          {ci.user.name}
        </Text>
        <Text style={{ fontSize: 10 }}>
          {ci.timestamp().fromNow()}
        </Text>
      </View>
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
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              {_.sortBy(
                ap.last_checkins,
                (c: CheckinRecord) => -c.timestamp()
              ).map(ci => this.renderCheckinCardItem(ci))}
            </View>
            <TimelineChart checkins={ac.today_checkins} />
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
      <View style={{ flex: 1, justifyContent: "center" }}>
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
          style={{ backgroundColor: "#5067FF" }}
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
