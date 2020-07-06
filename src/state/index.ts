import { ref } from 'vue'
import { State, KV } from '../types'
import { DeckDB } from '../storage'
import { defaultDeck } from '../lib/deck'
import { defaultCard } from '../lib/card'
import stateActions from './actions'

export const state: State = {
  settings: ref({}),
  decks: ref({}),
  notifications: ref([]),
  icons: ref(['mouth-watering', 'robe', 'thorny-triskelion']),
  popup: ref(false),
  loading: ref(false)
}

export function useState (prop: string): { [key: string]: any } {
  const collection = state[prop]
  const actions = Object.keys(stateActions).reduce((acc, key) => {
    if (key.startsWith(`${prop}/`)) {
      const newKey = key.slice(prop.length + 1)
      acc[newKey] = (payload: KV<any>) => stateActions[key](collection, payload)
    }
    return acc
  }, {})

  return { collection, actions }
}

export const deckDB = new DeckDB()
deckDB.getDecks().then(decks => {
  state.decks.value = decks
})

const testDeck = defaultDeck()
testDeck.cards.push(defaultCard())

/*
deckDB.putDeck(testDeck).then(() => {
  return deckDB.getDecks()
}).then(decks => {
  console.log('Created Decks DB', decks)
}).catch(error => {
  console.error('Cannot use in-browser database. This happens for example in Firefox when used in private mode. Unfortunately there is no fix. Please use this app outside of private mode. You can read more about the issue here: https://bugzilla.mozilla.org/show_bug.cgi?id=781982 and here: https://bugzilla.mozilla.org/show_bug.cgi?id=1639542', error)
})
*/

export default state
