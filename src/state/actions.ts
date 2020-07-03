import { Ref } from 'vue'
import { Notification, IDeck, KV } from '../types'
import { defaultDeck, defaultDeckValues } from '../lib/deck'

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
  'decks/new' (decks: Ref<IDeck[]>): number {
    const newDeck = defaultDeck()
    const id = decks.value.push(newDeck) - 1
    newDeck.id = id

    return id
  },
  // updates decks[updatedDeck.id]
  'decks/update' (decks: Ref<IDeck[]>, updatedDeck: IDeck): boolean {
    const id = updatedDeck.id
    if (!id || !decks.value[id]) return false // can't update non-existing deck

    decks.value[id] = {
      ...decks.value[id],
      ...updatedDeck
    }
    return true
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
