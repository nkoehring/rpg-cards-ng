import { elementNameToMenuState, marks, blocks } from './constants'

export {
  isRootNode,
  isRootChild,
  isElementNode,
  isTextNode,
  isEmptyTextNode
} from './node'

export {
  moveCaretToBOL,
  moveCaretToEOL
} from './caret'

export type State = KV<boolean>
export {
  movementKeys,
  controlSequenceKeys,
  marks,
  blocks
} from './constants'

function simpleAction (cmd: string, arg?: string): () => boolean {
  return () => {
    return document.execCommand(cmd, false, arg)
  }
}

export const menuActionToCommand: KV<() => boolean> = {
  paragraph: simpleAction('formatblock', 'P'),
  heading1: simpleAction('formatblock', 'H1'),
  heading2: simpleAction('formatblock', 'H2'),
  heading3: simpleAction('formatblock', 'H3'),
  bulletList: simpleAction('insertUnorderedList'),
  numberedList: simpleAction('insertOrderedList'),
  separator: simpleAction('insertHorizontalRule'),
  bold: simpleAction('bold'),
  italic: simpleAction('italic')
}

export function getActiveMarksAndBlocks (el: HTMLElement): {
  marks: string[];
  block: string;
} {
  let activeBlock = 'paragraph'
  const activeMarks: string[] = []

  const focussedEl = el.nodeName === '#text' ? el.parentElement : el
  if (!focussedEl) return { marks: activeMarks, block: activeBlock }

  const focussedState = elementNameToMenuState[focussedEl.nodeName]
  if (!focussedState) return { marks: activeMarks, block: activeBlock }

  if (blocks.indexOf(focussedState) >= 0) {
    activeBlock = focussedState
    return { marks: activeMarks, block: activeBlock }
  }

  let wrappingEl = focussedEl.parentElement
  let wrappingState: string

  if (marks.indexOf(focussedState) >= 0) {
    activeMarks.push(focussedState)

    while (wrappingEl) {
      wrappingState = elementNameToMenuState[wrappingEl.nodeName]
      if (marks.indexOf(wrappingState) < 0) {
        if (blocks.indexOf(wrappingState) >= 0) activeBlock = wrappingState
        break
      }

      activeMarks.push(wrappingState)
      wrappingEl = wrappingEl.parentElement
    }
  }

  return { marks: activeMarks, block: activeBlock }
}
