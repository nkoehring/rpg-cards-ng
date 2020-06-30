import Dexie from 'dexie'
import { IDeck, ICard } from './types'

interface IDeckTable {
  id?: number;
  name: string;
  description: string;
  color: string;
  icon: string;
  cards: number[]; // array of card IDs
  cardSize: string;
  arrangement: string;
  pageSize: string;
  roundedCorners: boolean;
}

export class DeckDB extends Dexie {
  public decks: Dexie.Table<IDeckTable, number>
  public cards: Dexie.Table<ICard, number>
  public tags: Dexie.Table<string>

  public constructor () {
    super('DeckDB')
    console.log('initializing deck db')

    this.version(1).stores({
      decks: '++id,name',
      cards: '++id,name,*tags',
      tags: '&tag'
    })

    this.decks = this.table('decks')
    this.cards = this.table('cards')
    this.tags = this.table('tags')
    console.log('deck db initialized', this)
  }

  public async putDeck (deck: IDeck) {
    const cards = await this.cards.bulkPut(deck.cards, { allKeys: true })
    await this.decks.put({ ...deck, cards })
  }

  public async putCard (card: ICard, deckId: number) {
    const cardId = await this.cards.put(card)
    const deck = await this.decks.get(deckId)

    if (deck && deck.cards.indexOf(cardId) < 0) {
      deck.cards.push(cardId)
      await this.decks.put(deck)
    }
  }
}
