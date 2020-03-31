export function randomId (): string {
  const now = Date.now()
  const rnd = Math.round(10000000 + Math.random() * 10000000).toString(36)

  return `${now}.${rnd}`
}

export function cardSizeFromWH (w: number, h: number): string {
  return `${h}x${w}`
}

export function cardWHFromSize (size: string): number[] {
  return size.split('x').map(x => parseInt(x, 10)).reverse()
}

export function iconPath (icon: string): string {
  return `/img/${icon}.svg`
}

export function cardWHtoStyle (w: number, h: number): object {
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
    cardWidth: 62,
    cardHeight: 88,
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
    content: []
  }
}
