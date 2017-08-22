import { postCheckin } from '../action'

export default async function checkinJobLoop(store) {
  console.log('---- checkinJobLoop')
  while (true) {
    sleep(1000)
    store.dispatch(postCheckin())
  }
}
