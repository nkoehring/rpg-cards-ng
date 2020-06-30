import randomId from './randomId'
import { Card, CardSize } from '../types'

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

export function cardWHFromSize (size: CardSize): number[] {
  return size.split('x').map(v => parseFloat(v))
}

export function cardSizeToStyle (size: CardSize): { width: string } {
  const [w, h] = cardWHFromSize(size)
  const ratio = w / h

  return {
    width: `calc(var(--card-height) * ${ratio})`
  }
}
