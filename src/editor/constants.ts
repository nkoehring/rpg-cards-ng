export const movementKeys = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Delete',
  'Backspace',
  'Enter',
  'Home',
  'End',
  'PageUp',
  'PageDown'
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
