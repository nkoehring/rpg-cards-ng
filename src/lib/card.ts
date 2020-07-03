import { CardSize } from '../consts'
import { ICard } from '../types'

export function defaultCard (): ICard {
  return {
    id: 0,
    name: 'no title yet',
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
