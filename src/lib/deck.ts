import { CardSize, PageSize, Arrangement } from '../consts'
import { IDeck } from '../types'

export const defaultDeckValues: IDeck = {
  id: 0,
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
  return { ...defaultDeckValues }
}

export function isValidDeck (deck: any): boolean {
  const example = defaultDeckValues as { [key: string]: any }

  for (const key in example) {
    const type = typeof example[key]
    if (typeof deck[key] !== type) return false
  }

  return true
}
