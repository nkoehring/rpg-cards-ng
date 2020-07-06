import { CardSize, defaultCardSize } from '../consts'
import { KV, ICard } from '../types'
import randomId from './randomId'

export function defaultCard (icon = 'robe', name = 'no title yet'): ICard {
  return {
    id: randomId(),
    name,
    icon,
    tags: [],
    content: {
      time: Date.now(),
      blocks: [{
        type: 'heading',
        data: {
          text: 'Next Level RPG Card',
          level: 2
        }
      }, {
        type: 'delimiter',
        data: { variant: 'pointing-left' }
      }, {
        type: 'paragraph',
        data: { text: 'This card is a rich text editor so you can basically do whatever you want.' }
      }, {
        type: 'paragraph',
        data: { text: ' ' }
      }, {
        type: 'paragraph',
        data: { text: 'You see that delimiter over there? It seems to be wrong, or maybe you like it that way. In any way you can change it by clicking on it and then on the little tool button on the right.' }
      }],
      version: '2.17.0'
    }
  }
}

export function cardWHFromSize (size: CardSize): number[] {
  return size.split('x').map(v => parseFloat(v))
}

export function cardCSSVars (size?: CardSize | string, color?: string): KV<string> {
  const [w, h] = cardWHFromSize(size as CardSize || defaultCardSize)
  const ratio = w / h

  return {
    backgroundColor: color || 'transparent',
    width: `calc(var(--card-height) * ${ratio})`
  }
}
