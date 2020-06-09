import { CardSize, Deck, Card } from './types'

export function randomId (): string {
  const now = Date.now()
  const rnd = Math.round(10000000 + Math.random() * 10000000).toString(36)

  return `${now}.${rnd}`
}

export function cardWHFromSize (size: CardSize): number[] {
  return size.split('x').map(v => parseFloat(v)).reverse()
}

export function iconPath (icon: string): string {
  return `/img/${icon}.svg`
}

export function cardSizeToStyle (size: CardSize): object {
  const [w, h] = cardWHFromSize(size)
  const ratio = w / h

  return {
    width: `calc(var(--card-height) * ${ratio})`
  }
}

export function defaultDeck (): Deck {
  return {
    id: randomId(),
    icon: 'robe',
    name: 'the nameless',
    description: '',
    color: '#3C1C00',
    cardSize: CardSize.Poker,
    cards: []
  }
}

export function defaultCard (): Card {
  return {
    id: `c${randomId()}`,
    name: 'no title yet',
    count: 1,
    tags: [],
    icon: 'robe',
    content: {
      time: Date.now(),
      blocks: [],
      version: '2.17.0'
    }
  }
}
