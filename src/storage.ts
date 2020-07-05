import Dexie from 'dexie'
import { CardSize, Arrangement, PageSize } from './consts'
import { IDeck, ICard } from './types'

interface IDeckTable {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  cards: string[]; // array of card IDs
  cardSize: CardSize;
  arrangement: Arrangement;
  pageSize: PageSize;
  roundedCorners: boolean;
}

export class DeckDB extends Dexie {
  public decks: Dexie.Table<IDeckTable, string>
  public cards: Dexie.Table<ICard, string>
  public tags: Dexie.Table<string>

  public constructor () {
    super('DeckDB')
    console.log('initializing deck db')

    this.version(1).stores({
      decks: '&id,name',
      cards: '&id,name,*tags',
      tags: '&tag'
    })

    this.decks = this.table('decks')
    this.cards = this.table('cards')
    this.tags = this.table('tags')
    console.log('deck db initialized', this)
  }

  // explicitely ignore ID and add deck to database
  public async addDeck (deck: IDeck) {
    const deckWithoutId: IDeckTable = {
      ...deck,
      cards: deck.cards.map(card => card.id)
    }
    delete deckWithoutId.id
    await this.decks.add(deckWithoutId)
  }

  // add or update deck
  public async putDeck (deck: IDeck) {
    const cards = await this.cards.bulkPut(deck.cards, { allKeys: true })
    await this.decks.put({ ...deck, cards })
  }

  // add or update card
  public async putCard (card: ICard, deckId: string) {
    const cardId = await this.cards.put(card)
    const deck = await this.decks.get(deckId)

    if (deck && deck.cards.indexOf(cardId) < 0) {
      deck.cards.push(cardId)
      await this.decks.put(deck)
    }
  }

  public async getDecks () {
    const deckEntries = await this.decks.toArray()

    const decks = await Promise.all(deckEntries.map(async deckTable => {
      const cardIds = deckTable.cards
      const deck: IDeck = {
        ...deckTable,
        cards: await this.cards.bulkGet(cardIds)
      }
      return deck
    }))

    // returns object with deck ids as keys
    const decksById = decks.reduce((acc, deck) => {
      acc[deck.id] = deck
      return acc
    }, {})

    return decksById
  }
}
