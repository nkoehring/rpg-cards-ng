import { Ref } from 'vue'
import { Notification, State, IDeck, KV } from '../types'
import { defaultDeck } from '../lib/deck'

type Decks = State['decks']

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
  // returns index of newly created deck
  'decks/new' (decks: Ref<Decks>): string {
    const newDeck = defaultDeck()
    const id = newDeck.id
    decks.value[id] = newDeck
    return newDeck.id
  },
  // updates decks[updatedDeck.id]
  'decks/update' (decks: Ref<Decks>, updatedDeck: IDeck): boolean {
    const id = updatedDeck.id
    if (!id || !decks.value[id]) return false // can't update non-existing deck

    decks.value[id] = {
      ...decks.value[id],
      ...updatedDeck
    }
    return true
  },
  'decks/remove' (decks: Ref<Decks>, deckId: string) {
    delete decks.value[deckId]
  },

  // POPUP ACTIONS
  'popup/show' (popup: Ref<boolean>): boolean {
    popup.value = true
    return popup.value
  },
  'popup/hide' (popup: Ref<boolean>): boolean {
    popup.value = false
    return popup.value
  },
  'popup/toggle' (popup: Ref<boolean>): boolean {
    popup.value = !popup.value
    return popup.value
  },
}
