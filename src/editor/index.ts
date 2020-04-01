export type State = KV<boolean>
export {
  movementKeys,
  controlSequenceKeys,
  elementNameToMenuState,
  marks,
  blocks
} from './constants'

function simpleAction (cmd: string, arg?: string): () => boolean {
  return () => {
    return document.execCommand(cmd, false, arg)
  }
}

function insertHorizontalRule (): () => boolean {
  return () => {
    const hr = document.execCommand('insertHorizontalRule')
    const p = document.execCommand('formatblock', false, 'P')
    return hr && p
  }
}

export const menuActionToCommand: KV<() => boolean> = {
  paragraph: simpleAction('formatblock', 'P'),
  heading1: simpleAction('formatblock', 'H1'),
  heading2: simpleAction('formatblock', 'H2'),
  heading3: simpleAction('formatblock', 'H3'),
  bulletList: simpleAction('insertUnorderedList'),
  numberedList: simpleAction('insertOrderedList'),
  separator: insertHorizontalRule(),
  bold: simpleAction('bold'),
  italic: simpleAction('italic')
}

export function getElementAndParentName (el: Node) {
  const element = el.nodeName === '#text' ? el.parentElement : el
  return [
    element?.nodeName,
    element?.parentElement?.nodeName
  ]
}
