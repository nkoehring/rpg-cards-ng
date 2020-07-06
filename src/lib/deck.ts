import { CardSize, PageSize, Arrangement } from '../consts'
import { IDeck } from '../types'
import randomId from './randomId'

export const defaultDeckValues: IDeck = {
  id: '',
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

export function defaultDeck (): IDeck {
  const newDeck = { ...defaultDeckValues }
  newDeck.cards = [] // make sure not to copy a reference
  newDeck.id = randomId()
  return newDeck
}

export function isValidDeck (deck: any): boolean {
  const example = defaultDeckValues as { [key: string]: any }

  for (const key in example) {
    const type = typeof example[key]
    if (typeof deck[key] !== type) return false
  }

  return true
}
