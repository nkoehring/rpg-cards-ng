const KEY = 'rpg-cards-ng'

export default class StorageHandler {
  private cache: StoredStuff = {
    decks: [],
    defaults: {
      color: '#3C1C00'
    }
  }

  constructor () {
    if (localStorage.getItem(KEY) === undefined) this.persist()

    const stored = localStorage.getItem(KEY)
    if (stored !== null) this.cache = JSON.parse(stored)
  }

  get decks (): Deck[] {
    return this.cache.decks
  }

  set decks (decks: Deck[]) {
    this.cache.decks = decks
    this.persist()
  }

  saveDeck (newDeck: Deck) {
    const decks = this.cache.decks
    const index = decks.findIndex(deck => deck.id === newDeck.id)

    if (index >= 0) decks[index] = newDeck
    else decks.push(newDeck)

    this.persist()
  }

  findDeck (id: string): Deck | null {
    for (const deck of this.cache.decks) {
      if (deck.id === id) return deck
    }
    return null
  }

  persist () {
    localStorage.setItem(KEY, JSON.stringify(this.cache))
  }
}
