// @flow

import { create } from 'apisauce'
import { UserRecord, AccessPointRecord } from '../types'
import _ from 'lodash'
import type { Watch } from '../types'

// const host = __DEV__ ? "http://localhost:3000" : "https://asiatoro.herokuapp.com"
const host = 'https://asiatoro.herokuapp.com'

class AsiatoroClient {
  api: any

  constructor() {
    this.api = create({
      baseURL: host,
      timeout: 50000,
    })
  }

  setUser(user: UserRecord) {
    this.api.setHeader('Authorization', `Bearer:${user.id}:${user.token}`)
  }

  async getFollowAccessPoint() {
    console.log()
    const res = await this.api.get('/v1/access_points')
    console.log('res', res)
    return res
  }

  async postUser({ name, pass }: { name: string, pass: string }) {
    const res = await this.api.post('/v1/users', {
      name,
      pass,
    })
    console.log('res', res)
    return res
  }

  async putFcmUser({ token }) {
    const res = await this.api.put('/v1/users', {
      fcm_token: token,
    })
    console.log('res', res)
    return res
  }

  async putRenameUser({ name }: { name: string }) {
    const res = await this.api.put('/v1/users', {
      name,
    })
    console.log('res', res)
    return res
  }

  async postFollow({ ap }: { ap: AccessPointRecord }) {
    const res = await this.api.post('/v1/follows', {
      ssid: ap.ssid,
    })
    console.log('res', res)
    return res
  }

  async deleteFollow({ ap }: { ap: AccessPointRecord }) {
    const res = await this.api.delete('/v1/follows', {
      ssid: ap.ssid,
    })
    console.log('res', res)
    return res
  }

  async postWatch({ user, ap }: Watch) {
    const res = await this.api.post('/v1/watches', {
      user_id: user.id,
      access_point_id: ap.id,
    })
    console.log('res', res)
    return res
  }

  async deleteWatch({ user, ap }: Watch) {
    const res = await this.api.delete('/v1/watches', {
      user_id: user.id,
      access_point_id: ap.id,
    })
    console.log('res', res)
    return res
  }

  async postCheckin({ ap }: { ap: AccessPointRecord }) {
    const res = await this.api.post('/v1/checkins', {
      ssid: ap.ssid,
    })
    console.log('res', res)
    return res
  }

  async postCheckinBalk({ aps }: { aps: Array<AccessPointRecord> }) {
    const res = await this.api.post('/v1/checkins/balk', {
      ssids: _.map(aps, 'ssid'),
    })
    console.log('res', res)
    return res
  }
}

export const ac = new AsiatoroClient()
