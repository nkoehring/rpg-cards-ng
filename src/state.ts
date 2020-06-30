import { reactive, ref, Ref } from 'vue'
import { State, Notification, IDeck } from './types'
import { defaultDeck } from './lib/deck'
import { DeckDB } from './storage'

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
  'decks/new' (): IDeck {
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

const deckDB = new DeckDB()
console.log('deck db', deckDB)
deckDB.putDeck(defaultDeck()).then(() => {
  return deckDB.decks.toArray()
}).then(decks => {
  console.log('Created Decks DB', decks)
}).catch(error => {
  console.error('Cannot use in-browser database. This happens for example in Firefox when used in private mode. Unfortunately there is no fix. Please use this app outside of private mode. You can read more about the issue here: https://bugzilla.mozilla.org/show_bug.cgi?id=781982 and here: https://bugzilla.mozilla.org/show_bug.cgi?id=1639542', error)
})

export default reactive(state)
