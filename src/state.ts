import { reactive, ref, Ref } from 'vue'
import { State, Notification, Deck } from './types'
import { defaultDeck } from './lib/deck'

interface Payload {
  [key: string]: any;
}

const state: State = {
  settings: ref({}),
  decks: ref([]),
  notifications: ref([])
}

/// actions are called like action['sub/foo'](state.sub, payload)
export const stateActions = {
  'notifications/add' (notifications: Ref<Notification[]>, payload: Payload) {
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
  'decks/new' (): Deck {
    return defaultDeck()
  }
}

export function useState (field: string): { [key: string]: any } {
  const collection = ref(state[field])
  const actions = Object.keys(stateActions).reduce((acc, key) => {
    if (key.startsWith(`${field}/`)) {
      const newKey = key.split('/')[1]
      acc[newKey] = (payload: Payload) => stateActions[key](collection, payload)
    }
    return acc
  }, {})

  return { collection, actions }
}

export default reactive(state)
