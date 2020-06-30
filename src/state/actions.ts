import { Ref } from 'vue'
import { Notification, IDeck, KV } from '../types'
import { defaultDeck } from '../lib/deck'

/// actions are called like action['sub/foo'](state.sub, payload)
export default {

  // NOTIFICATION ACTIONS
  'notifications/add' (notifications: Ref<Notification[]>, payload: KV<any>) {
    notifications.value.push({
      level: 'info',
      title: '',
      content: '',
      dismissed: false,
      ...payload
    })
  },

  'notifications/dismiss' (notifications: Ref<Notification[]>, notification: Notification) {
    notification.dismissed = true
    notifications.value = notifications.value.filter(note => !note.dismissed)
  },

  // DECK ACTIONS
  'decks/new' (): IDeck {
    return defaultDeck()
  }
}
