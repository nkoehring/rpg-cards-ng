export type State = KV<boolean>

export const movementKeys = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Delete',
  'Backspace',
  'Enter'
]

export const controlSequenceKeys = ['p', 'x', 'y', 'z', 'Z']

export const elementNameToMenuState: KV<string> = {
  B: 'bold',
  STRONG: 'bold',
  I: 'italic',
  EM: 'italic',
  P: 'paragraph',
  H1: 'heading1',
  H2: 'heading2',
  H3: 'heading3',
  UL: 'bulletList',
  OL: 'numberedList',
  HR: 'separator'
}

export const marks = ['bold', 'italic']
export const blocks = [
  'paragraph',
  'heading1',
  'heading2',
  'heading3',
  'bulletList',
  'spacer',
  'separator',
  'statBlock'
]

export function getElementAndParentName (el: Node) {
  const element = el.nodeName === '#text' ? el.parentElement : el
  return [
    element?.nodeName,
    element?.parentElement?.nodeName
  ]
}
