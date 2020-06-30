import randomId from './randomId'
import { Deck, CardSize, PageSize, Arrangement } from '../types'

export function defaultDeck (): Deck {
  return {
    id: randomId(),
    icon: 'robe',
    name: 'the nameless',
    description: '',
    color: '#3C1C00',
    cards: [],
    cardSize: CardSize.Poker,
    pageSize: PageSize.A4,
    arrangement: Arrangement.DoubleSided,
    roundedCorners: true
  }
}

export function isValidDeck (deck: any): boolean {
  const example = defaultDeck() as { [key: string]: any }

  for (const key in example) {
    const type = typeof example[key]
    return typeof deck[key] === type
  }

  return true
}
